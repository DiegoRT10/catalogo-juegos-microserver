const mysql = require('mysql2');
require('dotenv').config();

const dbConfig = {
  connectionLimit: 10, // Número máximo de conexiones en el pool
  host: process.env.PROD_HOST,
  user: process.env.PROD_USER,
  password: process.env.PROD_PASSWORD,
  database: process.env.PROD_DATABASE
};

let pool;

function crearPool() {
  pool = mysql.createPool(dbConfig);

  pool.on('connection', (connection) => {
    console.log('Nueva conexión establecida en el pool de conexiones.');
  });

  pool.on('error', (error) => {
    console.error('Error de conexión en el pool:', error);
    cerrarPool();
    crearPool(); // Vuelve a crear el pool en caso de error
  });

  console.log('Pool de conexiones creado exitosamente.');
}

function cerrarPool() {
  if (pool) {
    pool.end((error) => {
      if (error) {
        console.error('Error al cerrar el pool de conexiones:', error);
      } else {
        console.log('Pool de conexiones cerrado exitosamente.');
      }
    });
  }
}

crearPool();

module.exports = pool;