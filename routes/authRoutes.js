const express = require('express')

const authController = require('../controllers/authController')

const authMiddleware = require('../controllers/authMiddleware')

const router = express.Router()

router.post('/authRegister', authController.register)

router.post('/authLogin', authController.login)

router.get('/home', authMiddleware)

router.get('/inversiones', authMiddleware)

router.get('/pagos', authMiddleware)

router.get('/perfil', authMiddleware)

router.get('/transferencias', authMiddleware)

module.exports = router