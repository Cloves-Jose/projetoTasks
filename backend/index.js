const app = require('express')()
const db = require('./config/db')
const consign = require('consign')

const PORT = 3000

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)


//Sempre que eu digitar app.db eu terei acesso ao knex
//e poderei fazer operações no banco de dados
app.db = db

app.listen(PORT, () => {
    console.log(`Servidor na porta ${PORT}`)
})
