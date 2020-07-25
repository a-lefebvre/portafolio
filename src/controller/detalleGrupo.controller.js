const conexion = require('../conexion');
const detalleGrupoCtrl = {};

detalleGrupoCtrl.getGrupos = (req, res) => {
    const consulta = 'select * from materia natural join grupo natural join detalle_grupo';
    conexion.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
detalleGrupoCtrl.getGrupo = (req, res) => {
    const { id_grupo } = req.params;
    const params = [id_grupo];
    const consulta = 'select * from materia natural join grupo natural join detalle_grupo where id_grupo = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
detalleGrupoCtrl.findEstudiante = (req, res) => {
    const { id_grupo, num_control } = req.params;
    const params = [id_grupo, num_control];
    const consulta = 'select id_detalle, num_control, concat_ws(" ", apellido_est, nombre_est) as nombre_est, password_est from estudiante natural join detalle_grupo natural join grupo where id_grupo = ? and num_control = ? order by num_control';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
detalleGrupoCtrl.getEstudiante = (req, res) => {
    const { clave_profesor, num_control } = req.params;
    const params = [clave_profesor, num_control];
    const consulta = 'select id_detalle, num_control, concat_ws(" ", apellido_est, nombre_est) as nombre_est, password_est from estudiante natural join detalle_grupo natural join grupo where clave_profesor= ? and num_control = ? order by num_control';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
detalleGrupoCtrl.getEstudiantes = (req, res) => {
    const { clave_profesor, id_grupo, clave_materia } = req.params;
    const params = [clave_profesor, id_grupo, clave_materia];
    const consulta = 'select id_detalle, num_control, concat_ws(" ", apellido_est, nombre_est) as nombre_est, email_est from estudiante natural join detalle_grupo natural join grupo where clave_profesor= ? and id_grupo = ? order by nombre_est';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('DG.getEstudiantes: Ocurrio un error: ' + err);
        }
    });
}
detalleGrupoCtrl.addEstudiante = (req, res) => {
    let aleatorio = Math.round(Math.random() * 100);
    const date = new Date();
    const id_detalle = date.getDay() + "" + (date.getMonth() + 1) + "" + date.getFullYear() + "" + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds() + aleatorio + date.getMilliseconds();
    const { id_grupo, num_control } = req.body;
    const params = [id_detalle, id_grupo, num_control];
    const consulta = 'insert into detalle_grupo (id_detalle, id_grupo, num_control) values (?, ?, ?)';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se agregó nuevo estudiante al grupo exitosamente' });
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
detalleGrupoCtrl.updateStatus = (req, res) => {
    const { id_grupo, num_control, estado } = req.body;
    const params = [estado, id_grupo, num_control];
    const consulta = 'update detalle_grupo set estado = ? where id_grupo = ? and num_control = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se actuzalio estatus con exito' });
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
detalleGrupoCtrl.deleteEstudiante = (req, res) => {
    const { id_detalle } = req.params;
    const params = [id_detalle];
    const consulta = 'delete from detalle_grupo where id_detalle = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se elimino estudiante con exito' });
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
module.exports = detalleGrupoCtrl;