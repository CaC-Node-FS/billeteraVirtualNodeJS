const express = require('express')

const authController = require('../controllers/authController')

const authMiddleware = require('../controllers/authMiddleware')

const router = express.Router()

router.post('/authRegister', authController.register)

router.post('/authLogin', authController.login)

router.get('/home', authMiddleware, (req, res) => {
    //res.status(200).send("Hola usuario " + req.userId)
    next()
})

module.exports = router