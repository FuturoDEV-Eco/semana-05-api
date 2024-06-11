const express = require("express")
const {Pool} = require('pg')

const app = express()
app.use(express.json()) // Habilita o servidor a receber JSON

const conexao = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'api_pets'
})


/* VERBO HTTP, path, implementação */

app.get('/bemvindo', (request, response) => {
    response.send("Bem vindo usuario")
})

/* Cadastrar - Body (corpo) */
app.post('/pets', (request, response) => {
    const dados = request.body 
    console.log(dados)
    
    response.send("entrei aqui")
})

app.listen(3000, () => {
    console.log("Servidor Online")
})

