const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'portafolio',
    user: 'usuario',
    password: 'wNJSGq9h'
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado a la BD');
});

module.exports = conexion;