const express = require('express');
const dotenv = require('dotenv')
dotenv.config()
const database = require('../database/database')
const PORT = 8080
const app = express()
const filesDir = './src/frontend/'
app.use(express.static(filesDir))
app.use(express.urlencoded({ extended: true }))



// LOGIN PAGE
app.get('/', (req, res) => {
    res.sendFile('html/login.html', { root: filesDir })
})

app.post('/login', async (req, res) => {
    const { email, senha } = req.body
    const usuario = await database.getUsuario(email, senha)
    if (usuario) {
        res.json({ sucesso: true, message: "Login bem sucedido!"})
    } else {
        res.json({ sucesso: false, message: "Dados incorretos ou usuário não cadastrado."})
    }
})

app.get('/barbeiros', async (req, res) => {
    const barbeiros = await database.getBarbeiros()
    res.json(barbeiros)
})

app.listen(PORT, () => console.log(`Server now listening on port http://localhost:${PORT}`))
