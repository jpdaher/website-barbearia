const express = require('express');
const session = require('express-session')
const dotenv = require('dotenv')
dotenv.config()
const database = require('../database/database')
const PORT = 8080
const app = express()
const filesDir = './src/frontend/'
app.use(express.static(filesDir))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))



// LOGIN PAGE
app.get('/', (req, res) => {
    res.sendFile('html/login.html', { root: filesDir })
})

app.get('/cliente', (req, res) => {
    if (req.session.userId) {
        res.sendFile('html/cliente.html', { root: filesDir })
    } else {
        res.redirect('/')
    }
})

app.post('/login', async (req, res) => {
    const { email, senha } = req.body
    const usuario = await database.getUsuario(email, senha)
    if (usuario) {
        req.session.userId = usuario.idclientes
        res.json({ sucesso: true, message: "Login bem sucedido!"})
    } else {
        res.json({ sucesso: false, message: "Dados incorretos ou usuário não cadastrado."})
    }
})

app.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

app.get('/barbeiros', async (req, res) => {
    if (req.session.userId) {
        const barbeiros = await database.getBarbeiros()
        res.json(barbeiros)
    } else {
        res.redirect('/')
    }
})

app.listen(PORT, () => console.log(`Server now listening on port http://localhost:${PORT}`))
