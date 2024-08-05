document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const response = await fetch('/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ nome, email, senha })
    })
    window.alert("Usuário cadastrado!")
})