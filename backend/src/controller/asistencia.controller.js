const conexion = require('../conexion');
const asistenciaCtrl = {};

asistenciaCtrl.getFecha = (req, res) => {
    const { fecha, id_grupo } = req.params;
    const params = [fecha, id_grupo];
    const consulta = 'select distinct fecha, num_unidad  from lista natural join detalle_grupo where fecha = ? and id_grupo = ?'
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.getAsistenciasByIdDetalle = (req, res) => {
    const { id_detalle } = req.params;
    const params = [id_detalle];
    const consulta = 'select fecha from lista where id_detalle = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.getAllAsistencias = (req, res) => {
    const consulta = 'select num_control, concat_ws(" ", apellido_est, nombre_est) as nombre_est, fecha, asistencia from lista natural join detalle_grupo natural join estudiante';
    conexion.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.getByGrupo = (req, res) => {
    const { id_grupo } = req.params;
    const params = [id_grupo];
    const consulta = 'select num_control, concat_ws(" ", apellido_est, nombre_est) as nombre_est, fecha, asistencia from lista natural join detalle_grupo natural join estudiante where id_grupo =  ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Asistencia: linea:' + 22 + ' Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.getByGrupoAndUnidad = (req, res) => {
    const { id_grupo, num_unidad } = req.params;
    const params = [id_grupo, num_unidad];
    const consulta = 'select num_control, concat_ws(" ", apellido_est, nombre_est) as nombre_est, fecha, asistencia from lista natural join detalle_grupo natural join estudiante where id_grupo = ? and num_unidad = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.getAllAsistieronByGrupo = (req, res) => {
    const { id_grupo } = req.params;
    const params = [id_grupo];
    const consulta = 'select num_control, concat_ws(" ", apellido_est, nombre_est) as nombre_est, fecha, asistencia from lista natural join detalle_grupo natural join estudiante where id_grupo = ? and asistencia = true';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.getAllAsistieronByGrupoByUnidad = (req, res) => {
    const { id_grupo, num_unidad } = req.params;
    const params = [id_grupo, num_unidad];
    const consulta = 'select num_control, concat_ws(" ", apellido_est, nombre_est) as nombre_est, fecha, asistencia from lista natural join detalle_grupo natural join estudiante where id_grupo = ? and asistencia = true and num_unidad = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.getAllFaltaronByGrupo = (req, res) => {
    const { id_grupo, num_unidad } = req.params;
    const params = [id_grupo, num_unidad];
    const consulta = 'select num_control, concat_ws(" ", apellido_est, nombre_est) as nombre_est, fecha, asistencia from lista natural join detalle_grupo natural join estudiante where id_grupo = ? and asistencia = false';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.getAllFaltaronByGrupoByUnidad = (req, res) => {
    const { id_grupo, num_unidad } = req.params;
    const params = [id_grupo, num_unidad];
    const consulta = 'select num_control, concat_ws(" ", apellido_est, nombre_est) as nombre_est, fecha, asistencia from lista natural join detalle_grupo natural join estudiante where id_grupo = ? and asistencia = false and num_unidad = ?';

    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.getByGrupoAndDia = (req, res) => {
    const { id_grupo, fecha, unidad } = req.params;
    const params = [id_grupo, fecha, unidad];
    const consulta = 'select num_control, id_detalle, fecha, asistencia, num_unidad, id_grupo, concat_ws(" ", apellido_est, nombre_est) as nombre_est from lista natural join detalle_grupo natural join estudiante where id_grupo = ? and fecha = ? and num_unidad = ? order by nombre_est';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.getAsistenciasByGrupoAndMateria = (req, res) => {
    const { clave_profesor, clave_grupo, clave_materia } = req.params;
    const params = [clave_profesor, clave_materia, clave_grupo];
    const consulta = 'select num_unidad, count(asistencia) as total from lista natural join detalle_grupo natural join grupo where clave_profesor = ? and clave_materia = ? and clave_grupo = ? and asistencia = true group by num_unidad order by num_unidad';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.getFaltasByGrupoAndMateria = (req, res) => {
    const { clave_profesor, clave_grupo, clave_materia } = req.params;
    const params = [clave_profesor, clave_materia, clave_grupo];
    const consulta = 'select num_unidad, count(asistencia) as total from lista natural join detalle_grupo natural join grupo where clave_profesor = ? and clave_materia = ? and clave_grupo = ? and asistencia = false group by num_unidad  order by num_unidad';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

// Estudiante
asistenciaCtrl.getAsistenciasByEstudiante = (req, res) => {
    const { num_control, id_grupo, num_unidad } = req.params;
    const params = [id_grupo, num_unidad, num_control];
    const consulta = 'select * from lista natural join detalle_grupo where id_grupo = ? and num_unidad = ? and num_control = ?'
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.createAsistencia = (req, res) => {
    const date = new Date();
    const { id_detalle, fecha, asistencia, num_unidad } = req.body;
    const params = [id_detalle, fecha, asistencia, num_unidad];
    const consulta = 'insert into lista  values (?, ?, ?, ?)';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se registro asistencia' });
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
asistenciaCtrl.updateAsistencia = (req, res) => {
    const { id_detalle, asistencia, fecha, num_unidad } = req.body;
    const params = [asistencia, id_detalle, fecha, num_unidad];
    console.log(params);
    const consulta = 'update lista set asistencia = ? where id_detalle = ? and fecha = ? and num_unidad = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se actuzalio asistencia con exito' });
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

module.exports = asistenciaCtrl;