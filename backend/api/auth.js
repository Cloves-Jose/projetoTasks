const { authScret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const signin = async (req, res) => {
        //Checa se as informações foram preenchidas no login
        if(!req.body.email || !req.body.password) {
            return res.status(400).send('Dados incompletos')
        }

        //Realiza a consulta a partir dos dados recebidos 
        const user = await app.db('users').
            where({ email: req.body.email })
            .first()

        //Checa se o usuário existe ou não
        if(user) {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if(err || !isMatch) {
                    return res.status(401).send()
                }

                const payload = { id: user.id }
                res.json({
                    name: user.name,
                    email: user.email,
                    token: jwt.encode(payload, authScret)
                })
            })
        } else {
            res.status(400).send(`Usuário não cadastrado`)
        }
    }

    return { signin }
}