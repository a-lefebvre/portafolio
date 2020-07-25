const conexion = require('../conexion');
const materiaCtrl = {};

materiaCtrl.getMateria = (req, res) => {
    const clave_materia = req.params.clave_materia;
    const consulta = 'select * from materia where clave_materia = ?';
    conexion.query(consulta, [clave_materia], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

materiaCtrl.getMaterias = (req, res) => {
    const consulta = 'select * from materia';
    conexion.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
materiaCtrl.newMateria = (req, res) => {
    const { clave_materia, nombre_materia, unidades } = req.body;
    const params = [clave_materia, nombre_materia, unidades];
    const consulta = 'insert into materia values (?, ?, ?)';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: "Registro exitoso" });
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
materiaCtrl.deleteMateria = (req, res) => {
    const { clave_materia } = req.params;
    const params = [clave_materia];
    const consulta = 'delete from materia where clave_materia = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: "Borrado exitoso" });
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

module.exports = materiaCtrl;