const express = require('express');
const Router = express.Router();

const reporte = require('../controller/reportes.controller');

Router.get('/fechas/:clave_profesor/:id_grupo/:unidad', reporte.getAllFechasByGrupo);
Router.get('/asistencias/:num_control/:id_grupo/:unidad', reporte.getAllAsistenciasByAlumno);
Router.get('/criterios/:id_grupo/unidad/:unidad', reporte.getCriteriosByUnidad);
Router.get('/:clave_materia/:unidad/criterios/:clave_grupo/:num_control', reporte.getCalificacionesByCriterios)
Router.get('/:clave_materia/unidades/:clave_grupo/:num_control', reporte.getCalificacionByUnidadByEstudiante);
module.exports = Router;