const getCSS = (variavel) => {
    return getComputedStyle(document.body).getPropertyValue(variavel)
}

const tickConfig = {
    color: getCSS('--primary-color'),
    size: 16,
    family: getCSS('--font')
}

function criarGrafico(data, layout) {
    const grafico = document.createElement('div')
    grafico.className = 'grafico'
    grafico.setAttribute('aria-label', 'Gráfico interativo')
    grafico.setAttribute('role', 'img')
    document.getElementById('graficos-container').appendChild(grafico)
    
    const config = {
        responsive: true,
        displayModeBar: false,
        locale: 'pt-br',
        modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
        displaylogo: false,
        autosizable: true
    }
    
    // Ensure responsive layout
    const enhancedLayout = {
        ...layout,
        autosize: true,
        responsive: true
    }
    
    Plotly.newPlot(grafico, data, enhancedLayout, config)
    
    // Add resize listener for better responsiveness
    window.addEventListener('resize', () => {
        Plotly.Plots.resize(grafico)
    })
}

function incluirTexto(texto) {
    const container = document.getElementById('graficos-container')
    const paragrafo = document.createElement('p')
    paragrafo.classList.add('graficos-container__texto')
    paragrafo.innerHTML = texto
    paragrafo.setAttribute('role', 'article')
    container.appendChild(paragrafo)
}

function mostrarCarregamento() {
    const container = document.getElementById('graficos-container')
    const loading = document.createElement('div')
    loading.className = 'loading-container'
    loading.innerHTML = '<div class="loading"></div><p>Carregando dados...</p>'
    loading.style.textAlign = 'center'
    loading.style.padding = '2rem'
    container.appendChild(loading)
    return loading
}

function removerCarregamento(elemento) {
    if (elemento && elemento.parentNode) {
        elemento.parentNode.removeChild(elemento)
    }
}

function mostrarErro(mensagem) {
    const container = document.getElementById('graficos-container')
    const erro = document.createElement('div')
    erro.className = 'erro-container'
    erro.innerHTML = `
        <p style="color: #ff6b6b; text-align: center; padding: 2rem; background: rgba(255, 107, 107, 0.1); border-radius: 8px; margin: 2rem 0;">
            ❌ Erro ao carregar dados: ${mensagem}
        </p>
    `
    container.appendChild(erro)
}

export { getCSS, tickConfig, criarGrafico, incluirTexto, mostrarCarregamento, removerCarregamento, mostrarErro }