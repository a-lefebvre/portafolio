const express = require('express');
const Router = express.Router();

const administrador = require('../controller/administrador.controller');

Router.get('/config_files', administrador.getImagesFiles);
Router.get('/:clave_admin', administrador.getAdministrador);
Router.get('/', administrador.getAdministradores);
Router.post('/', administrador.newAdministrador);
Router.put('/', administrador.updateAdministrador);
Router.post('/config_header', administrador.config_encabezado_file);
Router.post('/config_watermark', administrador.config_marca_file);
Router.post('/config_footer', administrador.config_pie_file);

module.exports = Router;