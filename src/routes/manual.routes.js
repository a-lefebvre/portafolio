const express = require('express');
const Router = express.Router();

const manual = require('../controller/manual.controller');

Router.get('/admin', manual.getManualAdmin);

module.exports = Router;