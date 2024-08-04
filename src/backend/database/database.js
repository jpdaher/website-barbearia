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


async function getBarbeiros(){
    const conexao = await criarConexao()
    const [results] = await conexao.query("SELECT * FROM barbeiros")
    return results
}

module.exports = {
    getBarbeiros,
}