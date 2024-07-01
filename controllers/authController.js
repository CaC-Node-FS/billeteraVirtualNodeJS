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

  console.log('body ',req.body)

  // connection.connect(function(err) {
  
  //   if (err) throw err;
  
  //   console.log("Connected!")
        
  //   let sql = "INSERT INTO usuarios (id, nombre, usuario, clave, dni, mail) VALUES (1, 'a', 'a', 'a', 1, 'a@a')"
      
  //   connection.query(sql, function (err, result) {
    
  //     if (err) throw err
    
  //     console.log("records inserted")
    
  //   })
  //   // Close the MySQL connection
  //   connection.end((error) => {
    
  //     if (error) {
    
  //       console.error('Error closing MySQL connection:', error)
    
  //       return
    
  //     }
    
  //     console.log('MySQL connection closed.')
    
  //   })
      
  // })


  //const hashedPassword = bcrypt.hashSync(password,8)

  //const token = jwt.sign({id: newUser.id}, config.secretKey, {expiresIn: config.tokenExpiresIn})

}