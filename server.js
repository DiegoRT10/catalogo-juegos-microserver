const https = require('https');
const app = require('./app');
const fs = require('fs');
require('dotenv').config();

const puerto = process.env.PROD_PORT;

const server =  app.listen(puerto, ()=>{
    console.log('Servidor disponible en https://localhost:'+puerto)
});

module.exports = app; 