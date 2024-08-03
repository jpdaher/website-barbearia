import * as readline from 'node:readline/promises'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function perguntar(pergunta) {
  return new Promise((callback) => rl.question(pergunta, callback))
}

let DB_HOSTNAME = "localhost"
let DB_USERNAME = "root"
let DB_PASSWORD = ""

async function configuracao() {
  const resposta = await perguntar("Deseja alterar as configurações do banco de dados?\n[1]: Sim\n[2]: Não\nEscolha: ")

    if (resposta == "1") {
      const hostname = await perguntar("Qual o hostname do banco de dados? (default: localhost): ")
      DB_HOSTNAME = hostname || DB_HOSTNAME

      const username = await perguntar("Qual o username do banco de dados? (default: root): ")
      DB_USERNAME = username || DB_USERNAME

      const password = await perguntar('Qual a senha do banco de dados? (default: " "): ')
      DB_PASSWORD = password || DB_PASSWORD
    }

    console.log("Configuração concluída, iniciando tentativa de conexão")
    rl.close()
}

export { DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, configuracao }