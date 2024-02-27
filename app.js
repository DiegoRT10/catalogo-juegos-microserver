const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


require('dotenv').config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

//ROUTS
const useRouteInicio = require('./api/routes/inicio');
const useRouteCatalogo = require('./api/routes/catalogo');


app.use('/inicio',useRouteInicio);
app.use('/catalogo',useRouteCatalogo);





module.exports = app; 