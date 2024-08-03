import { DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, configuracao } from "./config.js"
// const { createConnection } = require("mysql")
import * as mysql from 'mysql'

async function main() {
    await configuracao()
    const connection = mysql.createConnection({
        host: DB_HOSTNAME,
        user: DB_USERNAME,
        password: DB_PASSWORD,
        database: "barbearia"
    })
    
    connection.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err.stack);
            return;
        }
        console.log('Conexão estabelecida com sucesso como ID:', connection.threadId);
    });

}

main()