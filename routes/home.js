var express = require('express');
var router = express.Router();

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
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

/* GET home page. */
router.get('/', function(req, res) {
  console.log('cookies ',req.cookies)
  let usuario = req.cookies.usuario
  let cuenta_usuario = req.cookies.cuenta_usuario
  let datos
  let cuenta_datos = {}
  let tarjeta_datos = {}
  let sql = "SELECT * FROM cuentas WHERE cuenta_usuario=?"
  connection.query(sql, [cuenta_usuario], function (err, result) {
    if (err) {
      throw err
    } else {
      console.log(result)
      cuenta_datos = result[0]
      sql = "SELECT * FROM tarjetas WHERE titular=?"
      datos = {}
      connection.query(sql, [usuario], async function (err, result) {
        if (err) {
          throw err
        } else {
          tarjeta_datos = result[0]
          datos = {
            titular: usuario,
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
});

module.exports = router;