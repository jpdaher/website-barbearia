# Website para uma barbearia
Um projeto fullstack para o funcionamento do website de uma barbearia que atende aos seguintes requisitos:
- Cadastro de barbeiros e suas especialidades
- Cadastro e login de usuarios
- Criar e visualizar agendamentos com barbeiros

## Estrutura do projeto
Aqui vai uma breve descrição da organização de diretórios do projeto:

<pre>
|—— node_modules/ (pacotes necessários para funcionamento, ignorar)
|—— src/
|————|—— backend/
|————|————|—— database/ (contém a lógica e arquivo de criação do banco de dados)
|————|————|—— server/ (contém a lógica do servidor, ponto de entrada do projeto)
|————|—— frontend/ (contém o html, css e javascript do frontend)
|—— .env (variáveis de ambiente da configuração de conexão com o banco de dados)
|—— README.md (é o arquivo que você está lendo)
|—— package-lock.json (↓)
|—— package.json (arquivos que mantém registro das dependências do projeto)

</pre>

## Instruções de instalação 
1. Instale o [MySQL](https://dev.mysql.com/downloads/installer/)
2. Instale o [Node.js](https://nodejs.org/en/download/package-manager)
3. Verifique instalação do node com os comandos `node -v` e `npm -v`
4. Baixe e extraia o arquivo ZIP do repositório ou clone com git
5. Rode o script sql de geração do banco de dados em src/backend/database
6. Altere o arquivo .env (se necessário)
7. Abra o CMD na pasta principal do projeto (barbearia)
8. Rode os comandos `npm install` e `npm run test`
9. Um link aparecerá no CMD, acessando esse link no browser você será redirecionado para a página de login do site
