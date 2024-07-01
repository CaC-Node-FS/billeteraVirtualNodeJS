const jwt = require('jsonwebtoken')

const config = require('../config/config')

module.exports = (req, res, next) => {

    const authHeader = req.headers['authorization']

    if(!authHeader) return res.status(403).send({auth: false, message: 'No se proveyó un token'})

    jwt.verify(token, config.secretKey, (err, decoded) => {
        
        if(err) return res.status(500).send({auth: false, message: 'Failes to authenticate token'})

        req.userId = decoded.id
        
        next()
    })    
}