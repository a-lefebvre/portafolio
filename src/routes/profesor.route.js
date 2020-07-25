const express = require('express');
const Router = express.Router();

const profesor = require('../controller/profesor.controller');

Router.get('/grupos', profesor.getProfesoresWithGrupos);
Router.get('/:clave_profesor', profesor.getProfesor);
Router.get('/', profesor.getProfesores);
Router.post('/', profesor.createProfesor);
Router.put('/', profesor.updateProfesor);
Router.delete('/:clave_profesor', profesor.deleteProfesor);

module.exports = Router;