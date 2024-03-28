// src/app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require("./router");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));
dotenv.config({ path: "./env/.env" })

app.use("/",router);

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
