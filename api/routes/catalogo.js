const express = require('express');
const router = express.Router();
const mysqlConection = require('../connection/connection');
const jwt = require('jsonwebtoken');
const key = process.env.secret_key;
const Token = require('../tools/verifyToken');

router.get('/game',(req, res) => {
    console.log('holaaa');
    mysqlConection.query('select * from catalogo_juego;',(err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});



module.exports = router;