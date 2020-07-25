const express = require('express');
const Router = express.Router();

const actividad = require('../controller/actividad.controller');

Router.get('/', actividad.getAllActividades);
Router.get('/:id_actividad', actividad.findActividad);
Router.get('/unidad/:num_unidad', actividad.getAllActividadesByUnidad);
Router.get('/criterio/:id_criterio', actividad.getAllActividadesByCriterio);
Router.get('/:id_grupo/:num_unidad/:id_criterio', actividad.getActividadesByGrupo);
Router.post('/', actividad.createActividad);
Router.put('/', actividad.updateActividad);
Router.delete('/:id_actividad', actividad.deleteActividad);

module.exports = Router;