const express = require('express');
const router = express.Router();
const mysqlConection = require('../connection/connection');
const jwt = require('jsonwebtoken');
const key = process.env.secret_key;
const Token = require('../tools/verifyToken');

router.get('/games',Token.Verify,(req, res) => {
    console.log('holaaa');
    mysqlConection.query('select * from catalgo_juego;',(err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.post('/singin', (req, res) => {
    const {email, password} = req.body
    mysqlConection.query('select nombre, rol from usuario where email = ? and password = ?;', 
    [email, password],
    (err, rows) => {
        if(!err){
            if(rows.length > 0){
                let data = JSON.stringify(rows[0]);
                const token = jwt.sign(data, key);
                res.json({token});
            }else{
                res.json({
                    message: 'Error: usuario y contraseña invalidos'
                });
            }
        }else{
            res.json({
                message: err
            });
            console.log(err);
        }
    });
});




module.exports = router;