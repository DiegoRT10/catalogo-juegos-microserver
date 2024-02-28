const express = require('express');
const router = express.Router();
require('dotenv').config();


router.get('/',(reg, res) => {
    res.send('Microservicio de catalogo de juegos');
});

  

module.exports = router;