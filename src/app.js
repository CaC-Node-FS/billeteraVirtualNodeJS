// src/app.js
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const router = require('./router')
const dotenv = require('dotenv')
const cors = require('cors')
const { nextTick } = require('process')
const app = express()

app.use(cors())

// app.use(cors({
//   origin: 'http://127.0.0.1:5500'
// }))

const PORT = process.env.PORT || 3000

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(express.static(path.join(__dirname, '../public')));
// dotenv.config({ path: './env/.env' })

// app.use('/',router);


app.get('/login', function (req, res) {
  console.log(req.body)
  console.log('llego')
  res.redirect("https://www.google.com")
})


app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`)
})
