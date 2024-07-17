var express = require('express')
var router = express.Router()

const mysql = require('mysql2')

const mysqlPromise = require('mysql2/promise')

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin-cac-homebanking",
  database: "CAC_HOMEBANKING"
})

const pool = mysqlPromise.createPool({
  host: "localhost",
  user: "admin",
  password: "admin-cac-homebanking",
  database: "CAC_HOMEBANKING"
})

function formatDate(date) {
  let d
  if(date == '') {
    d = new Date()
  }else {
    d = date
  }

  let  month = '' + (d.getMonth() + 1)
  let  day = '' + d.getDate()
  let  year = d.getFullYear()

  if (month.length < 2) 
      month = '0' + month
  if (day.length < 2) 
      day = '0' + day

  return [year, month, day].join('-')
}

/* GET transferencias page. */
router.get('/', async function(req, res, next) {

  let jwt = req.cookies.jwt 
  let usuario = req.cookies.usuario
  let usuario_id = req.cookies.usuario_id
  let usuario_nombre = req.cookies.usuario_nombre
  let usuario_cuenta = req.cookies.usuario_cuenta
  let dataTransferenciasAgenda = []
  let dataTransferenciasHistorial = []

  if(jwt == undefined || usuario == undefined || usuario_id == undefined || usuario_nombre == undefined || usuario_cuenta == undefined) {
    
  } else {

    try {
      //destinatarios agendados
      sql = "SELECT cuenta_destino FROM destinatarios_agendados WHERE cuenta_origen=?"
      let rows1 = await pool.query(sql,[usuario_cuenta])
      let result1 = rows1[0]
      if(result1.length > 0) {
        result1.forEach(async (x) => {
          let nuevoDestinatario = {}
          sql = "SELECT cbu, alias, cuenta_usuario FROM cuentas WHERE cuenta=?"
          const rows2 = await pool.query(sql, [x.cuenta_destino])
          let result2 = rows2[0]
          nuevoDestinatario.agendaTransferenciasCBU = result2[0].cbu
          nuevoDestinatario.agendaTransferenciasAlias = result2[0].alias
          let cuenta_usuario_destino = result2[0].cuenta_usuario
          sql = "SELECT nombre FROM usuarios WHERE id=?"
          const rows3 = await pool.query(sql, [cuenta_usuario_destino])
          let result3 = rows3[0]
          nuevoDestinatario.agendaTransferenciasTitular = result3[0].nombre
          dataTransferenciasAgenda.push(nuevoDestinatario)
        })
      }
      //////
      //historial transferencias
      sql = "SELECT fecha,monto,descripcion FROM transacciones WHERE transaccion_cuenta=? AND transaccion_tipo=?"
      let rows4 = await pool.query(sql, [usuario_cuenta,'transferencia'])
      let result4 = rows4[0]
      if(result4.length > 0) {          
        result4.forEach(async (x) => {
          let cbuDestinatario = parseInt(x.descripcion.slice(-14))
          sql = "SELECT cuenta_usuario FROM cuentas WHERE cbu=?"
          let rows5 = await pool.query(sql, [cbuDestinatario])
          let result5 = rows5[0]
          let idDestinatario = result5[0].cuenta_usuario
          sql = "SELECT nombre FROM usuarios WHERE id=?"
          let rows6 = await pool.query(sql, [idDestinatario])
          let result6 = rows6[0]
          let titularDestinatario = result6[0].nombre
          let fecha = formatDate(x.fecha)
          let historialDestinatario = {
            agendaTransferenciasHistorialFecha: fecha,
            agendaTransferenciasHistorialTitular: titularDestinatario,
            agendaTransferenciasHistorialCUB: cbuDestinatario,
            agendaTransferenciasHistorialMonto: x.monto
          }
          dataTransferenciasHistorial.push(historialDestinatario)
        })
      }
      //////
      res.render('transferencias', {dataTransferenciasAgenda: dataTransferenciasAgenda, dataTransferenciasHistorial: dataTransferenciasHistorial})

    } catch (error) {
      console.error(error)
      res.status(500).send()
    }

  }

})

/* POST transferencias page. */
router.post('/', async function(req, res, next) {
  
  let cbuDestino = req.body.CBU
  let jwt = req.cookies.jwt 
  let usuario = req.cookies.usuario
  let usuario_id = req.cookies.usuario_id
  let usuario_nombre = req.cookies.usuario_nombre
  let usuario_cuenta = req.cookies.usuario_cuenta
  let datos = {}

  if(jwt == undefined || usuario == undefined || usuario_id == undefined || usuario_nombre == undefined) {
    res.redirect('/')
  } else {
    let sql = "SELECT saldo,cuenta FROM cuentas WHERE cuenta = ?"
    let rows1 = await pool.query(sql,[usuario_cuenta])
    let result1 = rows1[0]
    if(result1.length > 0) {
      datos.saldo = result1[0].saldo
      datos.cuenta = result1[0].cuenta
      sql = "SELECT cuenta_usuario,alias FROM cuentas WHERE (cbu=? AND cuenta_usuario <> ?)"
      let rows2 = await pool.query(sql, [cbuDestino, usuario_id])
      let result2 = rows2[0]
      if(result2.length > 0) {
        datos.cbuDestino = cbuDestino
        datos.aliasDestino = result2[0].alias
        let cuenta_usuario_destino = result2[0].cuenta_usuario
        sql = "SELECT nombre FROM usuarios WHERE id=?"
        let rows3 = await pool.query(sql, [cuenta_usuario_destino])
        let result3 = rows3[0]
        if(result3.length > 0) {
          datos.titularDestino = result3[0].nombre
          res.json(datos)
        }                     
      } else {
        res.json({})
      }
    } else {
      res.json({})
    }
  }
})

router.post('/destinatarioAgendado', async function(req, res, next) {
  
  let datosDestino = req.body
  let jwt = req.cookies.jwt 
  let usuario = req.cookies.usuario
  let usuario_id = req.cookies.usuario_id
  let usuario_nombre = req.cookies.usuario_nombre
  let usuario_cuenta = req.cookies.usuario_cuenta
  let datos = {}

  if(jwt == undefined || usuario == undefined || usuario_id == undefined || usuario_nombre == undefined) {
    res.redirect('/')
  } else {
    let sql = "SELECT saldo,cuenta FROM cuentas WHERE cuenta = ?"
    let rows1 = await pool.query(sql,[usuario_cuenta])
    let result1 = rows1[0]
    if(result1.length > 0) {
      datos.saldo = result1[0].saldo
      datos.cuenta = result1[0].cuenta
      res.json(datos)
    } else {
      res.json({})
    }
  }

})
/* POST transferencia confirmada page. */
router.post('/transferir', async function(req, res, next) {

  let datos = req.body
  let jwt = req.cookies.jwt 
  let usuario = req.cookies.usuario
  let usuario_id = req.cookies.usuario_id
  let usuario_nombre = req.cookies.usuario_nombre

  if(Object.keys(datos).length > 0) {
    if(jwt == undefined || usuario == undefined || usuario_id == undefined || usuario_nombre == undefined) {
      res.redirect('/')
    } else { 
      let sql = "SELECT saldo,cuenta FROM cuentas WHERE cbu=?"
      let rows1 = await pool.query(sql, [datos.cbuDestino])
      let result1 = rows1[0]
      if(result1.length > 0) {
        datos.cuentaDestino = result1[0].cuenta
        let nuevoSaldoDestino = parseFloat(result1[0].saldo) + datos.monto
        sql = "UPDATE cuentas SET saldo=? WHERE cbu=?"
        await pool.query(sql, [nuevoSaldoDestino, datos.cbuDestino])
        sql = "SELECT saldo FROM cuentas WHERE cuenta=?"
        let rows2 = await pool.query(sql, [datos.cuenta])
        let result2 = rows2[0]
        if(result2.length > 0) {
          let nuevoSaldoOrigen = result2[0].saldo - datos.monto
          sql = "UPDATE cuentas SET saldo=? WHERE cuenta=?"
          await pool.query(sql, [nuevoSaldoOrigen, datos.cuenta])
          let fecha = new Date()
          datos.fecha = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`
          let transaccion_tipo = 'transferencia'
          let descripcion = 'transferencia interbancaria a destino CBU ' + datos.cbuDestino
          sql = "INSERT INTO transacciones (transaccion_cuenta, monto, fecha, transaccion_tipo, descripcion) VALUES (?,?,?,?,?)"
          await pool.query(sql, [datos.cuenta, datos.monto, datos.fecha, transaccion_tipo, descripcion])
          sql = "SELECT * FROM destinatarios_agendados WHERE cuenta_destino=?"
          let rows3 = await pool.query(sql, [datos.cuentaDestino])
          let result3 = rows3[0]
          if(!result3.length > 0) {
            sql = "INSERT INTO destinatarios_agendados (cuenta_origen, cuenta_destino) VALUES (?,?)"
            await pool.query(sql, [datos.cuenta, datos.cuentaDestino])
            res.status(200).end()
          }
        }
      }
    }
  } else {
     res.status(400).end()
  }
})

/* POST eliminar contacto de agenda de transferencias. */
router.post('/eliminarAgendado', function(req, res, next) {
  let datos = req.body
  let jwt = req.cookies.jwt 
  let usuario = req.cookies.usuario
  let usuario_id = req.cookies.usuario_id
  let usuario_nombre = req.cookies.usuario_nombre
  if(Object.keys(datos).length > 0) {
    if(jwt == undefined || usuario == undefined || usuario_id == undefined || usuario_nombre == undefined) {
      res.redirect('/')
    } else {
      let sql = "DELETE FROM destinatarios_agendados WHERE cuenta_destino=?"
      pool.query(sql, [datos.cuenta_destino], function (err, result) {
        if (err) {
          throw err
        } else {
          res.status(200).end()          
        }  
      })      
    }
  } else {
    res.status(400).end()
  }
})

module.exports = router