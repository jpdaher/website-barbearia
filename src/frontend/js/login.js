document.querySelector("form").addEventListener('submit', async (e) => {
    e.preventDefault()
    const dados = new FormData(e.target)
    const response = await fetch('/login', {
        method: 'POST',
        body: new URLSearchParams(dados)
    })
    const resultado = await response.json()
    if (resultado.sucesso) {
        window.alert(resultado.message)
    } else {
        window.alert(resultado.message)
    }
})