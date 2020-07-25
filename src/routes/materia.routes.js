const express = require('express');
const Router = express.Router();

const materia = require('../controller/materia.controller');

Router.get('/:clave_materia', materia.getMateria);
Router.get('/', materia.getMaterias);
Router.post('/', materia.newMateria);
Router.delete('/:clave_materia', materia.deleteMateria);

module.exports = Router;