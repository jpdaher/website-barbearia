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

app.get('/cliente/agendamentos', async (req, res) => {
    const agendamentos = await database.getAgendamentosUsuario(req.session.userId)
    res.json(agendamentos)
})

app.delete('/cliente/agendamentos/:id', async (req, res) => {
    const id = req.params.id
    await database.deletarAgendamento(id)
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

app.get('/barbeiros/especialidade/:id', async (req, res) => {
    const id = req.params.id
    const barbeiros = await database.getBarbeirosEspecialidade(id)
    res.json(barbeiros)
})

app.get('/barbeiros/disponibilidade', async (req, res) => {
    const { idbarbeiro, data, horario } = req.query
    const disponibilidade = await database.verificarDisponibilidade(idbarbeiro, data, horario)

    if (disponibilidade) {
        res.json({ disponivel: true, idcliente:req.session.userId })
    } else {
        res.json({ disponivel: false })
    }
})

app.post('/barbeiros/agendar', async (req, res) => {
    const { idcliente, idbarbeiro, especialidade, data, horario } = req.query
    await database.agendar(idcliente, idbarbeiro, especialidade, data, horario )
})

app.listen(PORT, () => console.log(`Server now listening on port http://localhost:${PORT}`))
