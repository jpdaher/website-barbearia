const mysql = require('mysql2/promise')
const dotenv = require('dotenv')
dotenv.config()

async function criarConexao(){
    const conexao = await mysql.createConnection({
        host: process.env.DB_HOSTNAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
    return conexao
}


// FUNÇÕES PARA O FUNCIONAMENTO DO SITE
async function getBarbeirosEspecialidade(id){
    const conexao = await criarConexao()
    const [results] = await conexao.query("SELECT idbarbeiros, nome FROM barbeiros JOIN barbeiros_especialidades e USING(idbarbeiros) WHERE e.idespecialidades = ?", [id])
    return results
}

async function getUsuario(username, password){
    const conexao = await criarConexao()
    const [results] = await conexao.query("SELECT * FROM clientes WHERE email = ? AND senha = ?", [username, password])
    if (results[0] == undefined) {
        return false
    }
    return results[0]
}

async function getAgendamentosUsuario(id){
    const conexao = await criarConexao()
    const [results] = await conexao.query("SELECT a.idagendamentos AS id, DATE_FORMAT(a.data, '%d/%m/%Y') as data, DATE_FORMAT(a.horario, '%H:%i') as horario, b.nome as barbeiro, e.nome as especialidade FROM agendamentos a INNER JOIN especialidades e ON a.idespecialidades = e.idespecialidades INNER JOIN barbeiros b ON a.idbarbeiros = b.idbarbeiros WHERE a.idclientes = ?", [id])
    if (results[0] == undefined) {
        return false
    }
    return results
}

async function deletarAgendamento(id){
    const conexao = await criarConexao()
    await conexao.query("DELETE FROM agendamentos WHERE idagendamentos = ?", [id])
}

async function verificarDisponibilidade(idbarbeiro, data, horario){
    const conexao = await criarConexao()
    const [results] = await conexao.query("SELECT * FROM agendamentos WHERE idbarbeiros = ? AND data = ? AND horario = ?", [idbarbeiro, data, horario])
    return results.length == 0
}

async function agendar(idclientes, idbarbeiros, especialidade, data, horario){
    const conexao = await criarConexao()
    await conexao.query("INSERT INTO agendamentos(idclientes, idbarbeiros, idespecialidades, data, horario) VALUES (?, ?, ?, ?, ?)", [idclientes, idbarbeiros, especialidade, data, horario])
}

async function cadastrar(nome, email, senha){
    const conexao = await criarConexao()
    await conexao.query("INSERT INTO clientes(nome, email, senha) VALUES (?, ?, ?)", [nome, email, senha])
}

module.exports = {
    getBarbeirosEspecialidade,
    getUsuario,
    getAgendamentosUsuario,
    deletarAgendamento,
    verificarDisponibilidade,
    agendar,
    cadastrar,
}