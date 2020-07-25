const express = require('express');
const Router = express.Router();

const calificacion = require('../controller/calificacion.controller');
Router.get('/aprobados/:clave_profesor/:clave_materia/:clave_grupo', calificacion.getAprobadosByUnidad);
Router.get('/reprobados/:clave_profesor/:clave_materia/:clave_grupo', calificacion.getReprobadosByUnidad);
Router.get('/aprobados/materia/:clave_profesor/:clave_materia/:clave_grupo', calificacion.getAprobadosByMateria);
Router.get('/reprobados/materia/:clave_profesor/:clave_materia/:clave_grupo', calificacion.getReprobadosByMateria);
Router.get('/', calificacion.getAllCalificaciones);
Router.get('/control/:num_control/:id_grupo', calificacion.getCalificacionesByNumControl);
Router.get('/grupo/:id_grupo/:unidad/:num_control', calificacion.getCalificacionesByEstudianteByUnidad);
Router.get('/grupo/:id_grupo/:unidad/:num_control/:id_criterio', calificacion.getCalificacionesByEstudianteBycriterio);
Router.get('/actividad/:id_actividad', calificacion.getAllCalificacionesByActividad);
Router.get('/all/:clave_profesor/:clave_materia/:clave_grupo', calificacion.getAllCalificacionesByProfesorAndMateriaAndGrupo)
Router.post('/', calificacion.newCalificacion);
Router.put('/', calificacion.updateCalificacion)

module.exports = Router;