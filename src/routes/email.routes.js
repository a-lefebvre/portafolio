const express = require('express');
const Router = express.Router();

const email = require('../controller/email.controller');

Router.post('/', email.sendEmail)

module.exports = Router;