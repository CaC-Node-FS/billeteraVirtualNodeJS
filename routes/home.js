var express = require('express')
var router = express.Router()

const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin-cac-homebanking",
  database: "CAC_HOMEBANKING"
})

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

  if (month.length < 2) 
      month = '0' + month
  if (day.length < 2) 
      day = '0' + day

  return [year, month, day].join('-')
}

/* GET home page. */
router.get('/', function(req, res) {
  let jwt = req.cookies.jwt 
  let usuario = req.cookies.usuario
  let usuario_id = req.cookies.usuario_id
  let usuario_nombre = req.cookies.usuario_nombre
  let datos
  let cuenta_datos = {}
  let tarjeta_datos = {}
  console.log(usuario, usuario_id, usuario_nombre)
  if(jwt == undefined || usuario == undefined || usuario_id == undefined || usuario_nombre == undefined) {
    res.redirect('/')
  } else {
    let sql = "SELECT * FROM cuentas WHERE cuenta_usuario=?"
    connection.query(sql, [usuario_id], function (err, result) {
      if (err) {
        throw err
      } else {
        cuenta_datos = result[0]
        sql = "SELECT * FROM tarjetas WHERE titular=?"
        datos = {}
        connection.query(sql, [usuario_nombre], function (err, result) {
          if (err) {
            throw err
          } else {
            tarjeta_datos = result[0]
            datos = {
              titular: usuario_nombre,
              cuenta: cuenta_datos.cuenta,
              CBU: cuenta_datos.cbu,
              saldo: cuenta_datos.saldo,
              fecha_vencimiento: formatDate(tarjeta_datos.fecha_vencimiento),
              tarjeta_numero: tarjeta_datos.tarjeta_numero
           }
            res.render('home', datos)
          }
        })
      }
    })
  }
})

module.exports = router