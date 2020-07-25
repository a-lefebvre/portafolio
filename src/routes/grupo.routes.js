const express = require('express');
const Router = express.Router();

const grupo = require('../controller/grupo.controller');

Router.get('/', grupo.getAllGrupos);
Router.get('/estudiante/:num_control', grupo.getMateriasByEstudiante);
Router.get('/:clave_profesor', grupo.getMateriasByProfesor);
Router.get('/findGrupo/:id_grupo', grupo.findGrupo);
Router.get('/:clave_profesor/:clave_materia', grupo.getGruposByMateriaByProfesor);
Router.get('/:clave_profesor/:clave_materia/:clave_grupo', grupo.getGrupo);
Router.post('/', grupo.createGrupo);
Router.delete('/:id_grupo', grupo.deleteGrupo);

module.exports = Router;