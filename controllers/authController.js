const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config/config')
const mysql = require('mysql2')

let aliasLista = ["CASA","AVION","NUBE","SOL","AUTO","MESA","FLOR","MAR","TREN","SILLA","LUZ","CIELO","TIERRA","LUNA","PIEDRA","TAZA","LIBRO","CAJA","PUENTE","ARBOL"]

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin-cac-homebanking",
  database: "CAC_HOMEBANKING"
})

function nuevaCuenta() {
  let cuenta
  let cuentaExiste
  let cuentaOk = false    
  let sql = "SELECT * FROM cuentas"
  cuenta = Math.floor(Math.random() * (9999999999 - 1) + 1)
  connection.query(sql, function (err, lista) {
    if (err) {
      throw err
    } else {
      cuentaExiste = lista.find((u) => u.cuenta == cuenta)
    }
  })
  if(!cuentaExiste === undefined) {
    nuevaCuenta()
  } else {
    return cuenta
  }  
}

function nuevoAlias() {
  let listaRandom = []
  let alias = ""
  while(listaRandom.length < 3) {
    let ind = Math.floor(Math.random()*10)
    if(!listaRandom.includes(aliasLista[ind])) { 
        listaRandom.push(aliasLista[ind])
        alias = alias + aliasLista[ind]
        if(listaRandom.length < 3) {
            alias = alias + "."
        }
    }
  }
  return alias
}

function nuevoNtarjeta () {
  let ntarjeta = ''
  let num = Math.floor(Math.random() * (9999 - 1000) + 1000)
  ntarjeta = ntarjeta + num.toString() + ' '
  num = Math.floor(Math.random() * (9999 - 1000) + 1000)
  ntarjeta = ntarjeta + num.toString() + ' '
  num = Math.floor(Math.random() * (9999 - 1000) + 1000)
  ntarjeta = ntarjeta + num.toString() + ' '
  num = Math.floor(Math.random() * (9999 - 1000) + 1000)
  ntarjeta = ntarjeta + num.toString() + ' '
  return ntarjeta
}

function nuevoCVV () {
  let cvv = Math.floor(Math.random() * (999 - 100) + 100)
  return cvv
}

connection.connect()

exports.register = (req, res) => {  
  
  let {nombre, dni, usuario, email, direccion, telefono, contrasena} = req.body

  dni = parseInt(dni) 

  let sql = "SELECT * FROM usuarios"

  connection.query(sql, function (err, lista) {
    if (err) {
        throw err
    } else {
      let dniExiste = lista.find((u) => u.dni == dni)
      let usuarioExiste = lista.find((u) => u.usuario == usuario)
      if(dniExiste === undefined && usuarioExiste === undefined)  {
        const hashedPassword = bcrypt.hashSync(contrasena,8)
        const token = jwt.sign({id: contrasena}, config.secretKey, {expiresIn: config.tokenExpiresIn})
        sql = "INSERT INTO usuarios (nombre, dni, usuario, mail,direccion, telefono, clave) VALUES (?,?,?,?,?,?,?)"
        connection.query(sql, [nombre, dni, usuario, email, direccion, telefono, hashedPassword], function (err, result) {
          if (err) {
            throw err
          } else {
            sql = "SELECT id FROM usuarios WHERE dni=?"
            connection.query(sql, [dni], function (err, result) {
              if (err) {
                throw err
              } else {
                let cuenta_usuario = result[0].id
                let cuenta = nuevaCuenta()
                let cbu = cuenta*10 + 10000000000001
                let saldo = 10000000.00
                let alias = nuevoAlias()
                sql = "INSERT INTO cuentas (cbu, cuenta, alias, saldo, cuenta_usuario) VALUES (?,?,?,?,?)"
                connection.query(sql, [cbu, cuenta, alias, saldo, cuenta_usuario], function (err, result) {
                  if (err) {
                    throw err
                  } else {
                    let titular = nombre
                    let fecha = new Date()
                    fecha.setFullYear(fecha.getFullYear() + 2)
                    let fecha_vencimiento = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate()
                    tarjeta_numero = nuevoNtarjeta()
                    let cvv = nuevoCVV()
                    let tarjeta_cuenta = cuenta
                    sql = "INSERT INTO tarjetas (titular, fecha_vencimiento, tarjeta_numero, cvv, tarjeta_cuenta) VALUES (?,?,?,?,?)"
                    connection.query(sql, [titular, fecha_vencimiento, tarjeta_numero, cvv, tarjeta_cuenta], function (err, result) {
                      if (err) throw err
                    })
                  }
                })
              }
            })
          }
        })              
        res.status(201).send({auth: true, token})        
      } else {
        res.status(200).send({auth: false})
      }
    }

  })

}

exports.login = (req, res) => {
  let {usuario, clave} = req.body
  let usuarioExiste
  let cuenta = {}
  let tarjeta = {}
  let sql = "SELECT * FROM usuarios"
  connection.query(sql, function (err, lista) {
    if (err) {
      throw err
    } else {
      usuarioExiste = lista.find((u) => u.usuario == usuario)
      if(usuarioExiste === undefined)  {
        res.status(404).json({auth: false, error: 'usuario inexistente'})
      } else {
        sql = "SELECT * FROM usuarios WHERE usuario=?"
        connection.query(sql, [usuarioExiste.usuario], function (err, result) {
          if (err) {
            throw err
          } else {
            let claveOk = bcrypt.compareSync(clave, result[0].clave)
            if(!claveOk) {
              res.status(401).json({auth: false, token: null})
            } else {
              sql = "SELECT saldo,cuenta FROM cuentas WHERE cuenta_usuario=?"
              connection.query(sql, [usuarioExiste.id], function (err, result) {
                if (err) {
                  throw err
                } else {
                  let timeExpire = 100*60*1000
                  const token = jwt.sign({id: clave}, config.secretKey, {expiresIn: config.tokenExpiresIn})
                  res.cookie('jwt', token, {httpOnly: true, maxAge: timeExpire})
                  res.cookie('usuario', usuarioExiste.usuario, {httpOnly: true, maxAge: timeExpire})
                  res.cookie('usuario_id', usuarioExiste.id, {httpOnly: true, maxAge: timeExpire})
                  res.cookie('usuario_nombre', usuarioExiste.nombre, {httpOnly: true, maxAge: timeExpire})
                  res.cookie('usuario_cuenta', result[0].cuenta, {httpOnly: true, maxAge: timeExpire})
                  res.status(200).json({usuario: usuarioExiste.nombre})
                }
              })
            }
          }
        })
      }
    }
  })
}