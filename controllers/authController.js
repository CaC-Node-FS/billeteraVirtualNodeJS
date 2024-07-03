const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const config = require('../config/config');

let mysql = require('mysql2');

let connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin-cac-homebanking",
  database: "CAC_HOMEBANKING"
});

exports.register = (req, res) => {

  console.log('body ', req.body)

  let usuarioNuevo = req.body

  usuarioNuevo.dni = parseInt(usuarioNuevo.dni)

  usuarioNuevo = Object.values(usuarioNuevo)

  const {nombre, dni, usuario, email, contrasena} = req.body

  connection.connect(function (err) {

    if (err) throw err;

    console.log("conectado a base de datos")

    let sql = "INSERT INTO usuarios (nombre, dni, usuario, mail, clave) VALUES (?,?,?,?,?)"

    connection.query(sql, [nombre, dni, usuario, email, contrasena], function (err, result) {

      if (err) throw err

      console.log("registro agregado")

      res.end()

    })
    // Close the MySQL connection
    connection.end((error) => {

      if (error) {

        console.error('Error closing MySQL connection:', error)

        return

      }

      console.log('MySQL connection closed.')

    })    

  })

}