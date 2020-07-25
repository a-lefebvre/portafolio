const conexion = require('../conexion');
const profesorCtrl = {};

profesorCtrl.getProfesor = (req, res) => {
    const clave_profesor = req.params.clave_profesor;
    const consulta = 'select * from profesor where clave_profesor = ?';
    conexion.query(consulta, [clave_profesor], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

profesorCtrl.getProfesores = (req, res) => {
    const consulta = 'select * from profesor order by nombre';
    conexion.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
profesorCtrl.getProfesoresWithGrupos = (req, res) => {
    const consulta = 'select id_grupo, clave_profesor, nombre, apellido, clave_materia, nombre_materia,  clave_grupo, hora_inicio, hora_final from profesor natural join grupo natural join materia order by nombre, apellido, clave_materia, clave_grupo'
    conexion.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

profesorCtrl.createProfesor = (req, res) => {
    const { clave_profesor, nombre, apellido, email, password } = req.body;
    const params = [clave_profesor, nombre, apellido, email, password];
    const consulta = 'insert into profesor values (?, ?, ?, ?, ?)';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se agregó nuevo profesor' });
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

profesorCtrl.updateProfesor = (req, res) => {
    const { clave_profesor, nombre, apellido, email, password } = req.body;
    const params = [nombre, apellido, email, password, clave_profesor];
    const consulta = 'update profesor set nombre = ?, apellido = ?, email = ?, password = ? where clave_profesor = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Actualización exitosa' });
        } else {
            console.log('updateProfesor: Ocurrio un error: ' + err);
        }
    });
}
profesorCtrl.deleteProfesor = (req, res) => {
    const { clave_profesor } = req.params;
    const params = [clave_profesor];
    const consulta = 'delete from profesor where clave_profesor = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Eliminacion exitosa' });
        } else {
            console.log('deleteProfesor: Ocurrio un error: ' + err);
        }
    });
}

module.exports = profesorCtrl;