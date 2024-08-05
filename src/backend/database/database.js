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
async function getBarbeiros(){
    const conexao = await criarConexao()
    const [results] = await conexao.query("SELECT * FROM barbeiros")
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

module.exports = {
    getBarbeiros,
    getUsuario,
}