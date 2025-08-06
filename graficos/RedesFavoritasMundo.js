import { getCSS, criarGrafico, incluirTexto, mostrarCarregamento, removerCarregamento, mostrarErro } from "./common.js"

async function redesFavoritasMundo() {
    const loading = mostrarCarregamento()
    
    try {
        const url = 'https://raw.githubusercontent.com/IzaacCoding36/api/main/redes-favoritas.json'
        const res = await fetch(url)
        
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        }
        
        const dados = await res.json()
        const redes = Object.keys(dados)
        const valores = Object.values(dados)

        const data = [
            {
                values: valores,
                labels: redes,
                type: 'pie',
                textinfo: 'label+percent',
                hovertemplate: '<b>%{label}</b><br>Votos: %{value}<br>Percentual: %{percent}<extra></extra>',
                marker: {
                    line: {
                        color: getCSS('--primary-color'),
                        width: 2
                    }
                }
            }
        ]

        const layout = {
            plot_bgcolor: getCSS('--bg-color'),
            paper_bgcolor: getCSS('--bg-color'),
            autosize: true,
            title: {
                text: 'Redes sociais que os usuários mais gostam',
                x: 0,
                font: {
                    color: getCSS('--primary-color'),
                    family: getCSS('--font'),
                    size: 30
                }
            },
            legend: {
                font: {
                    color: getCSS('--primary-color'),
                    size: 16
                },
                orientation: 'h',
                x: 0.5,
                xanchor: 'center',
                y: -0.1
            },
            margin: {
                l: 40,
                r: 40,
                t: 80,
                b: 80
            },
            hoverlabel: {
                bgcolor: getCSS('--extra-color'),
                bordercolor: getCSS('--secondary-color'),
                font: { color: getCSS('--primary-color') }
            }
        }

        criarGrafico(data, layout)
        incluirTexto(`Embora o <span>Instagram</span> ocupe a quarta posição em termos de número total de usuários entre as redes sociais, destaca-se como a <span>preferida pelos usuários</span>. Supera até mesmo o <span>Facebook</span>, a plataforma com mais usuários, sendo a terceira opção mais apreciada pelos usuários. <br>Essa preferência evidencia a forte conexão e apreço que as pessoas têm pelo Instagram em comparação com outras redes sociais`)
        
        removerCarregamento(loading)
        
    } catch (error) {
        console.error('Erro ao carregar redes favoritas:', error)
        removerCarregamento(loading)
        mostrarErro('Não foi possível carregar os dados das redes favoritas.')
    }
}

redesFavoritasMundo()