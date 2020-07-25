const express = require('express');
const Router = express.Router();

const asistencia = require('../controller/asistencia.controller');

Router.get('/', asistencia.getAllAsistencias);
Router.get('/:id_grupo', asistencia.getByGrupo);
Router.get('/:id_grupo/asistieron', asistencia.getAllAsistieronByGrupo);
Router.get('/:id_grupo/faltaron', asistencia.getAllFaltaronByGrupo);
Router.get('/detalle/:id_detalle', asistencia.getAsistenciasByIdDetalle);
Router.get('/fecha/:fecha/:id_grupo', asistencia.getFecha);
Router.get('/:id_grupo/asistieron/:num_unidad', asistencia.getAllAsistieronByGrupoByUnidad);
Router.get('/:id_grupo/faltaron/:num_unidad', asistencia.getAllFaltaronByGrupoByUnidad);
Router.get('/:id_grupo/dia/:fecha/:unidad', asistencia.getByGrupoAndDia)
Router.get('/:id_grupo/:num_unidad', asistencia.getByGrupoAndUnidad);
Router.get('/:id_grupo/:num_unidad/asistencias/:num_control', asistencia.getAsistenciasByEstudiante);
Router.get('/:clave_profesor/asistencias/:clave_materia/:clave_grupo', asistencia.getAsistenciasByGrupoAndMateria);
Router.get('/:clave_profesor/faltas/:clave_materia/:clave_grupo', asistencia.getFaltasByGrupoAndMateria)
Router.post('/', asistencia.createAsistencia);
Router.put('/', asistencia.updateAsistencia)

module.exports = Router;