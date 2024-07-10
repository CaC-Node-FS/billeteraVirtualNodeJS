var express = require('express')
var router = express.Router()

const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin-cac-homebanking",
  database: "CAC_HOMEBANKING"
})

/* GET perfil page. */
router.get('/', function(req, res, next) {
  let jwt = req.cookies.jwt
  let usuario = req.cookies.usuario
  let usuario_id = req.cookies.usuario_id
  let datos = {}
  let usuario_datos = {}
  let cuenta_datos = {}
  if(jwt == undefined || usuario == undefined || usuario_id == undefined) {
    res.render('index')
  } else {  
    let sql = "SELECT * FROM usuarios WHERE usuario=?"
    connection.query(sql, [usuario], function (err, result) {
      if (err) {
        throw err
      } else {
        usuario_datos = result[0]
        sql = "SELECT * FROM cuentas WHERE cuenta_usuario=?"
        connection.query(sql, [usuario_id], function (err, result) {
          if (err) {
            throw err
          } else {
            cuenta_datos = result[0]
            datos = {
              titular: usuario_datos.nombre,
              mail: usuario_datos.mail,
              telefono: usuario_datos.telefono,
              domicilio: usuario_datos.direccion,
              alias : cuenta_datos.alias,
              CBU: cuenta_datos.cbu,
              cuenta: cuenta_datos.cuenta            
          }
          res.render('perfil', datos)
          }
        })
      }
    }) 
  }
})

module.exports = router