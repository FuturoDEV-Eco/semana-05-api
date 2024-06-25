const { Router } = require('express') // class Router é especifica para criar rotas
const ServicoController = require('../controllers/ServicoController')

const servicosRoutes = new Router()

servicosRoutes.post("/", ServicoController.criar)

module.exports = servicosRoutes

