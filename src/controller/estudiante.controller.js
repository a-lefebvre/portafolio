const conexion = require('../conexion');
const estudianteCtrl = {};
const key = 'wNJSGq9h'
estudianteCtrl.getEstudiante = (req, res) => {
    const { num_control } = req.params;
    const params = [num_control]
    const consulta = 'select num_control, concat_ws(" ", apellido_est, nombre_est) as nombre_est, password_est, email_est from estudiante where num_control = ?';
    // if (apikey == key) {

    // } else {
    //     res.send('404 NOT FOUND')
    // }
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

estudianteCtrl.getEstudiantes = (req, res) => {
    const consulta = 'select num_control, concat_ws(" ", apellido_est, nombre_est) as nombre_est, password_est, email_est from estudiante order by nombre_est';
    conexion.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Estudiantes: Ocurrio un error: ' + err);
        }
    });
}

estudianteCtrl.createEstudiante = (req, res) => {
    const { num_control, nombre, apellido, password } = req.body;
    const params = [num_control, nombre, apellido, password];
    const consulta = 'insert into estudiante (num_control, nombre_est, apellido_est, password_est) values (?, ?, ?, ?)';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se agregó nuevo estudiante' });
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
estudianteCtrl.updateEstudiante = (req, res) => {
    const { num_control, password, email } = req.body;

    const params = [password, email, num_control];
    const consulta = 'update estudiante set password_est = ?, email_est = ? where num_control = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Actualización exitosa' });
        } else {
            console.log('updateEst: Ocurrio un error: ' + err);
        }
    });
}

module.exports = estudianteCtrl;