const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const server = express();
const path = require('path');
const multer = require('multer');


const { pool } = require('./conexion');

//settings
server.set('port', process.env.PORT || 3000);

//middleware
server.use(morgan('dev'));
server.use(express.json());
server.use(cors());
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
server.use(multer({ storage }).single('image'));

//routes
server.use('/api/estudiante/', require('./routes/estudiante.routes'));
server.use('/api/profesor/', require('./routes/profesor.route'));
server.use('/api/materia/', require('./routes/materia.routes'));
server.use('/api/grupo/', require('./routes/grupo.routes'));
server.use('/api/detalleGrupo/', require('./routes/detalleGrupo.routes'));
server.use('/api/criterio/', require('./routes/criterio.routes'));
server.use('/api/email', require('./routes/email.routes'));
server.use('/api/asistencia', require('./routes/asistencia.routes'));
server.use('/api/actividad', require('./routes/actividad.routes'));
server.use('/api/calificaciones', require('./routes/calificacion.routes'));
server.use('/api/administrador', require('./routes/administrador.routes'));
server.use('/api/reporte', require('./routes/reporte.routes'));
server.use('/manual', require('./routes/manual.routes'));
server.use('/backup', require('./routes/backup.routes'));

//static files
server.use(express.static(path.join(__dirname, 'public')));

//start server
server.listen(server.get('port'), () => {
    console.log('Server running ...');
});