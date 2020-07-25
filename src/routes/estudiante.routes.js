const express = require('express');
const Router = express.Router();

const estudiante = require('../controller/estudiante.controller');

Router.get('/:num_control', estudiante.getEstudiante);
Router.get('/', estudiante.getEstudiantes);
Router.post('/', estudiante.createEstudiante);
Router.put('/', estudiante.updateEstudiante);

module.exports = Router;