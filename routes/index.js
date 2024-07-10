var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.clearCookie("jwt")
  res.clearCookie("usuario")
  res.clearCookie("usuario_id")
  res.clearCookie("usuario_nombre")  
  res.render('index')
})

module.exports = router
