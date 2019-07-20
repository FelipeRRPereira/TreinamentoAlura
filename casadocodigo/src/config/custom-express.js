require('marko/node-require').install();
require('marko/express');

const express = require('express');
const app = express();

const rotas = require('../app/routes/rotas');
rotas(app);

module.exports = app;