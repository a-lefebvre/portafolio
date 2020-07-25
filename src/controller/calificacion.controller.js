const conexion = require('../conexion');
const calificacionCtrl = {};

calificacionCtrl.getAllCalificaciones = (req, res) => {
    const consulta = 'select * from detalle_calificaciones;';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Calificacion: Ocurrio un error: ' + err);
        }
    });
}
calificacionCtrl.getAllCalificacionesByProfesorAndMateriaAndGrupo = (req, res) => {
    const { clave_profesor, clave_materia, clave_grupo } = req.params;
    const params = [clave_profesor, clave_materia, clave_grupo];
    const consulta = 'select num_control, num_unidad, nombre_criterio, porcentaje, nombre_actividad, valor, calificacion from detalle_calificaciones natural join actividad natural join criterio natural join grupo where clave_profesor = ? and clave_materia = ? and clave_grupo = ? order by num_control, num_unidad, nombre_criterio, nombre_actividad;';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Calificacion: Ocurrio un error: ' + err);
        }
    });
}
calificacionCtrl.getAllCalificacionesByActividad = (req, res) => {
    const { id_actividad } = req.params;
    const params = [id_actividad];
    const consulta = 'select num_control, id_actividad, calificacion, concat_ws(" ", apellido_est, nombre_est) as nombre_est, password_est, email_est from detalle_calificaciones natural join estudiante where id_actividad = ? order by nombre_est';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Calificacion: Ocurrio un error: ' + err);
        }
    });
}

calificacionCtrl.getAprobadosByUnidad = (req, res) => {
    const { clave_profesor, clave_materia, clave_grupo } = req.params;
    const params = [clave_profesor, clave_materia, clave_grupo];
    const consulta1 = 'select num_control, num_unidad, nombre_criterio, porcentaje, nombre_actividad, (valor * calificacion)/ 100 as puntos from detalle_calificaciones natural join actividad natural join criterio natural join grupo where clave_profesor = ? and clave_materia = ? and clave_grupo = ?';
    const consulta2 = `select num_control, num_unidad, nombre_criterio, porcentaje, sum(puntos) as promedio from (${consulta1}) as tabla_puntos group by num_control, num_unidad, nombre_criterio, porcentaje`;
    const consulta3 = `select num_control, num_unidad, nombre_criterio, (porcentaje * promedio)/100 as puntos from (${consulta2}) as tabla_puntos_by_criterio`;
    const consulta4 = `select num_control, num_unidad, sum(puntos) as calificacion from (${consulta3}) as tabla_promedios_by_unidad group by num_unidad, num_control order by num_control, num_unidad`;
    const consulta5 = `select num_unidad, count(*) as total from (${consulta4}) as tabla_promedios where calificacion >= 70 group by num_unidad order by num_unidad`;

    conexion.query(consulta5, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Calificacion: Ocurrio un error: ' + err);
        }
    });
}
calificacionCtrl.getReprobadosByUnidad = (req, res) => {
    const { clave_profesor, clave_materia, clave_grupo } = req.params;
    const params = [clave_profesor, clave_materia, clave_grupo];
    const consulta1 = 'select num_control, num_unidad, nombre_criterio, porcentaje, nombre_actividad, (valor * calificacion)/ 100 as puntos from detalle_calificaciones natural join actividad natural join criterio natural join grupo where clave_profesor = ? and clave_materia = ? and clave_grupo = ?';
    const consulta2 = `select num_control, num_unidad, nombre_criterio, porcentaje, sum(puntos) as promedio from (${consulta1}) as tabla_puntos group by num_control, num_unidad, nombre_criterio, porcentaje`;
    const consulta3 = `select num_control, num_unidad, nombre_criterio, (porcentaje * promedio)/100 as puntos from (${consulta2}) as tabla_puntos_by_criterio`;
    const consulta4 = `select num_control, num_unidad, sum(puntos) as calificacion from (${consulta3}) as tabla_promedios_by_unidad group by num_unidad, num_control order by num_control, num_unidad`;
    const consulta5 = `select num_unidad, count(*) as total from (${consulta4}) as tabla_promedios where calificacion < 70 group by num_unidad order by num_unidad`;

    conexion.query(consulta5, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Calificacion: Ocurrio un error: ' + err);
        }
    });
}
calificacionCtrl.getAprobadosByMateria = (req, res) => {
    const { clave_profesor, clave_materia, clave_grupo } = req.params;
    const params = [clave_profesor, clave_materia, clave_grupo];
    const tabla_puntos = 'select num_control, num_unidad, nombre_criterio, porcentaje, nombre_actividad, (valor * calificacion)/ 100 as puntos from detalle_calificaciones natural join actividad natural join criterio natural join grupo where clave_profesor = ? and clave_materia = ? and clave_grupo = ?';
    const califActividades = `select num_control, num_unidad, nombre_criterio, porcentaje, sum(puntos) as promedio from (${tabla_puntos}) as tabla_puntos group by num_control, num_unidad, nombre_criterio, porcentaje`;
    const promCriterio = `select num_control, num_unidad, nombre_criterio, (porcentaje * promedio)/100 as puntos from (${califActividades}) as tabla_puntos_by_criterio`;
    const califUnidad = `select num_control, num_unidad, sum(puntos) as calificacion from (${promCriterio}) as tabla_promedios_by_unidad group by num_unidad, num_control order by num_control, num_unidad`;
    const promFinal = `select num_control, avg(calificacion) as promedio_final from (${califUnidad}) as tabla_promedios_final group by num_control order by num_control`;
    const aprobados = `select count(*) as total from (${promFinal}) as final where promedio_final >= 70 order by num_control`;

    conexion.query(promCriterio, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Calificacion: Ocurrio un error: ' + err);
        }
    });
}
calificacionCtrl.getReprobadosByMateria = (req, res) => {
    const { clave_profesor, clave_materia, clave_grupo } = req.params;
    const params = [clave_profesor, clave_materia, clave_grupo];
    const tabla_puntos = 'select num_control, num_unidad, nombre_criterio, porcentaje, nombre_actividad, (valor * calificacion)/ 100 as puntos from detalle_calificaciones natural join actividad natural join criterio natural join grupo where clave_profesor = ? and clave_materia = ? and clave_grupo = ?';
    const califActividades = `select num_control, num_unidad, nombre_criterio, porcentaje, sum(puntos) as promedio from (${tabla_puntos}) as tabla_puntos group by num_control, num_unidad, nombre_criterio, porcentaje`;
    const promCriterio = `select num_control, num_unidad, nombre_criterio, (porcentaje * promedio)/100 as puntos from (${califActividades}) as tabla_puntos_by_criterio`;
    const califUnidad = `select num_control, num_unidad, sum(puntos) as calificacion from (${promCriterio}) as tabla_promedios_by_unidad group by num_unidad, num_control order by num_control, num_unidad`;
    const promFinal = `select num_control, avg(calificacion) as promedio_final from (${califUnidad}) as tabla_promedios_final group by num_control order by num_control`;
    const reprobados = `select count(*) as total from (${promFinal}) as final where promedio_final < 70 order by num_control`;

    conexion.query(reprobados, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Calificacion: Ocurrio un error: ' + err);
        }
    });
}

// Estudiante
calificacionCtrl.getCalificacionesByNumControl = (req, res) => {
    const { num_control, id_grupo } = req.params;
    const params = [num_control, id_grupo];
    const consulta = 'select * from detalle_calificaciones natural join actividad natural join criterio where num_control = ? and id_grupo = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Calificacion: Ocurrio un error: ' + err);
        }
    });
}
calificacionCtrl.getCalificacionesByEstudianteByUnidad = (req, res) => {
    const { num_control, id_grupo, unidad } = req.params;
    const params = [num_control, id_grupo, unidad];
    const puntos_actividades = 'select id_grupo, num_unidad, id_criterio, num_control, nombre_criterio,porcentaje, nombre_actividad, (valor * calificacion)/ 100 as puntos from detalle_calificaciones natural join actividad natural join criterio  where num_control = ? and id_grupo = ? and num_unidad = ?';
    const promCriterio = `select id_grupo, id_criterio, num_control, num_unidad, nombre_criterio, porcentaje, sum(puntos) as promedio from (${puntos_actividades}) as puntos_actividades group by id_criterio, num_control, num_unidad, nombre_criterio, porcentaje`;
    const porcentCriterio = `select id_grupo, num_unidad, id_criterio, num_control, nombre_criterio, porcentaje, promedio, round((porcentaje * promedio)/100, 1) as porcentaje_obtenido from (${promCriterio}) as prom_criterio order by nombre_criterio`;
    conexion.query(porcentCriterio, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Calificacion: Ocurrio un error: ' + err);
        }
    });
}
calificacionCtrl.getCalificacionesByEstudianteBycriterio = (req, res) => {
    const { num_control, id_grupo, unidad, id_criterio } = req.params;
    const params = [num_control, id_grupo, unidad, id_criterio];
    // const puntos_actividades = 'select num_control, nombre_actividad, valor, calificacion, (valor * calificacion)/ 100 as puntos_obtenidos from detalle_calificaciones natural join actividad natural join criterio  where num_control = ? and id_grupo = ? and num_unidad = ? and id_criterio = ? order by nombre_criterio, nombre_actividad';
    const puntos_actividades = 'select num_control, nombre_actividad, valor, calificacion, (((valor * calificacion)/ 100)*porcentaje)/100 as puntos_obtenidos  from detalle_calificaciones natural join actividad natural join criterio  where num_control = ? and id_grupo = ? and num_unidad = ? and id_criterio = ? order by nombre_criterio, nombre_actividad';
    conexion.query(puntos_actividades, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Calificacion: Ocurrio un error: ' + err);
        }
    });
}
calificacionCtrl.newCalificacion = (req, res) => {
    const { num_control, id_actividad, calificacion } = req.body;
    const params = [num_control, id_actividad, calificacion];
    const consulta = 'insert into detalle_calificaciones  values (?, ?, ?)';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Registro de calificacion exitoso' });
        } else {
            console.log('Calificacion: Ocurrio un error: ' + err);
        }
    });
}
calificacionCtrl.updateCalificacion = (req, res) => {
    const { num_control, id_actividad, calificacion } = req.body;
    const params = [calificacion, num_control, id_actividad];
    const consulta = 'update detalle_calificaciones set calificacion = ? where num_control = ? and id_actividad = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Actualización exitosa' });
        } else {
            console.log('Calificacion: Ocurrio un error: ' + err);
        }
    });
}

module.exports = calificacionCtrl;