const express = require("express")

const petRoutes = require('./routes/pets.routes')
const vacinasRoutes = require("./routes/vacinas.routes")
const servicosRoutes = require("./routes/servicos.routes")

const app = express()
app.use(express.json()) // Habilita o servidor a receber JSON

app.use('/pets', petRoutes)
app.use('/vacinas', vacinasRoutes)
app.use('/servicos', servicosRoutes)

app.listen(3000, () => {
    console.log("Servidor Online")
})

