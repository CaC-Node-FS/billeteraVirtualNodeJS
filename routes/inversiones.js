var express = require('express')
var router = express.Router()

/* GET inversiones page. */
router.get('/', function(req, res, next) {
  let jwt = req.cookies.jwt 
  let usuario = req.cookies.usuario
  let usuario_id = req.cookies.usuario_id
  let usuario_nombre = req.cookies.usuario_nombre
  if(jwt == undefined || usuario == undefined || usuario_id == undefined || usuario_nombre == undefined) {
    res.redirect('/')
  } else {
    res.render('inversiones')
  }
})

module.exports = router