const express = require('express');
const Router = express.Router();

const backup = require('../controller/backup.controller');

Router.post('/', backup.createBackup);


module.exports = Router;