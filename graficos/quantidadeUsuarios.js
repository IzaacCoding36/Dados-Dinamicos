import { getCSS, tickConfig, criarGrafico, mostrarCarregamento, removerCarregamento, mostrarErro } from "./common.js"

async function quantidadeUsuariosPorRede() {
    const loading = mostrarCarregamento()
    
    try {
        const url = 'https://raw.githubusercontent.com/IzaacCoding36/api/main/numero-usuarios.json'
        const res = await fetch(url)
        
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        }
        
        const dados = await res.json()
        const nomeDasRedes = Object.keys(dados)
        const quantidadeDeUsuarios = Object.values(dados)

        const data = [
            {
                x: nomeDasRedes, 
                y: quantidadeDeUsuarios, 
                type: 'bar',
                marker: {
                    color: getCSS('--extra-color-2'),
                    line: {
                        color: getCSS('--secondary-color'),
                        width: 1
                    }
                },
                hovertemplate: '<b>%{x}</b><br>Usuários: %{y} bilhões<extra></extra>'
            }
        ]

        const layout = {
            plot_bgcolor: getCSS('--bg-color'),
            paper_bgcolor: getCSS('--bg-color'),
            autosize: true,
            title: {
                text: 'Redes sociais com mais usuários no mundo',
                x: 0,
                font: {
                    color: getCSS('--primary-color'),
                    family: getCSS('--font'),
                    size: 30
                }
            },
            xaxis: {
                tickfont: tickConfig,
                title: {
                    text: 'Nome das redes sociais',
                    font: {
                        color: getCSS('--secondary-color')
                    }
                },
                gridcolor: 'rgba(99, 240, 84, 0.1)',
                tickangle: -45
            },
            yaxis: {
                tickfont: tickConfig,
                title: {
                    text: 'Bilhões de usuários ativos',
                    font: {
                        color: getCSS('--secondary-color')
                    }
                },
                gridcolor: 'rgba(99, 240, 84, 0.1)'
            },
            margin: {
                l: 60,
                r: 40,
                t: 80,
                b: 100
            },
            hoverlabel: {
                bgcolor: getCSS('--extra-color'),
                bordercolor: getCSS('--secondary-color'),
                font: { color: getCSS('--primary-color') }
            }
        }

        criarGrafico(data, layout)
        removerCarregamento(loading)
        
    } catch (error) {
        console.error('Erro ao carregar dados de usuários:', error)
        removerCarregamento(loading)
        mostrarErro('Não foi possível carregar os dados de usuários por rede social.')
    }
}

quantidadeUsuariosPorRede()