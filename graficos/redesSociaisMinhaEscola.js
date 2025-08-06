import { criarGrafico, getCSS, incluirTexto, mostrarCarregamento, removerCarregamento, mostrarErro } from "./common.js"

async function redesSociaisFavoritasMinhaEscola() {
    const loading = mostrarCarregamento()
    
    try {
        const dadosLocaisString = localStorage.getItem('respostaRedesSociais')
        if (dadosLocaisString) {
            const dadosLocais = JSON.parse(dadosLocaisString)
            processarDados(dadosLocais)
            removerCarregamento(loading)
        } else {
            const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=rSe23zaQC7gOvWgFJbdtPaqh7ewsO5hQmusYOeqdorTRN8C25vVV3BicsPoS6HS3jnJY9NHhy_pNZj6prQdxDH3305Mro8vNm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPvESZ9fvnAeFWqfIvIacdoRZcVMZ-nDSydw9_0gseo2TN3y60rOTtwDBCYnKQf6yIqgf8yOzNfccjP633C9VnHmUmPZvRBJY9z9Jw9Md8uu&lib=MCARBaBtNBMHKiEwMeRap3j6V_G7SlGWF'
            
            const res = await fetch(url)
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`)
            }
            
            const dados = await res.json()
            localStorage.setItem('respostaRedesSociais', JSON.stringify(dados))
            processarDados(dados)
            removerCarregamento(loading)
        }
    } catch (error) {
        console.error('Erro ao carregar dados da escola:', error)
        removerCarregamento(loading)
        mostrarErro('Não foi possível carregar os dados da escola.')
    }
}

function processarDados(dados) {
    try {
        const redesSociais = dados.slice(1).map(redes => redes[1])
        const contagemRedesSociais = redesSociais.reduce((acc, redesSociais) => {
            acc[redesSociais] = (acc[redesSociais] || 0) + 1
            return acc
        }, {})
        const valores = Object.values(contagemRedesSociais)
        const labels = Object.keys(contagemRedesSociais)

        const data = [
            {
                values: valores,
                labels: labels,
                type: 'pie',
                textinfo: 'label+percent',
                hovertemplate: '<b>%{label}</b><br>Respostas: %{value}<br>Percentual: %{percent}<extra></extra>',
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
            height: 700,
            title: {
                text: 'Redes sociais que as pessoas da minha escola mais gostam',
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
                }
            },
            hoverlabel: {
                bgcolor: getCSS('--extra-color'),
                bordercolor: getCSS('--secondary-color'),
                font: { color: getCSS('--primary-color') }
            }
        }

        criarGrafico(data, layout)
        incluirTexto(`Como no mundo, a amostra de pessoas entrevistadas demonstra um apreço pelo <span>Instagram</span> em relação a outras redes.`)
        
    } catch (error) {
        console.error('Erro ao processar dados:', error)
        mostrarErro('Erro ao processar os dados da escola.')
    }
}

redesSociaisFavoritasMinhaEscola()