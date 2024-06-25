
/*
const criar = () => {

}

module.exports = {criar}
*/

/*
module.exports = {
    criar: async () => {
    }
}
*/


const { Pool } = require('pg')

const conexao = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'api_pets'
})

class ServicoController {

    async listarTodos(request, response) {
        const query = request.query

        if (query.filtro) {
            const servicos = await conexao.query(`
                    select * from servicos
                    where nome ilike $1
                    or descricao ilike $1
                    or cast(preco as varchar) ilike $1
                `, [`%${query.filtro}%`])
            response.json(servicos.rows)
        } else {
            const servicos = await conexao.query("select * from servicos")
            response.json(servicos.rows)
        }

    }

    async criar(request, response) {

        try {
            const dados = request.body

            if (!dados.nome || !dados.preco && dados.preco !== 0) {
                return response.status(400).json({
                    mensagem: 'Nome e preço são obrigatórios'
                })
            }

            const servico = await conexao.query(`
                INSERT into servicos
                    (nome, descricao,preco)
                    values
                    ($1, $2, $3)
                    returning *
                `, [dados.nome, dados.descricao, dados.preco])


            response.status(201).json(servico.rows[0])
        } catch (error) {
            response.status(500).json({ mensagem: 'Não possivel cadastrar o serviço' })
        }
    }


}

module.exports = new ServicoController()