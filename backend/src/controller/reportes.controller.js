const conexion = require('../conexion');
const reporteCtrl = {};

reporteCtrl.getAllFechasByGrupo = (req, res) => {
    const { clave_profesor, id_grupo, unidad } = req.params;
    const params = [clave_profesor, id_grupo, unidad]
    const consulta = 'select distinct fecha from lista natural join detalle_grupo natural join grupo where clave_profesor = ? and id_grupo = ? and num_unidad = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Reporte(fechas).-Ocurrio un error: ' + err);
        }
    });
}
reporteCtrl.getAllAsistenciasByAlumno = (req, res) => {
    const { num_control, id_grupo, unidad } = req.params;
    const params = [num_control, id_grupo, unidad ];
    const consulta = 'select fecha, asistencia from lista natural join detalle_grupo natural join estudiante where num_control = ? and id_grupo = ? and num_unidad = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Reporte(asist).-Ocurrio un error: ' + err);
        }
    });
}
reporteCtrl.getCalificacionByUnidadByEstudiante = (req, res) => {
    const { num_control, clave_materia, clave_grupo } = req.params;
    const params = [num_control, clave_materia, clave_grupo];
    const puntosByActividad = 'select num_control, nombre_est, num_unidad, nombre_criterio, porcentaje, nombre_actividad, (valor * calificacion)/ 100 as puntos from estudiante natural join detalle_calificaciones natural join actividad natural join criterio natural join grupo where num_control = ? and clave_materia = ? and clave_grupo = ?';
    const puntosTotalesByActividades = `select num_control, nombre_est, num_unidad, nombre_criterio, porcentaje, sum(puntos) as promedio from (${puntosByActividad}) as tabla_puntos group by num_control, num_unidad, nombre_criterio, porcentaje`;
    const promedioByCriterio = `select num_control, nombre_est, num_unidad, nombre_criterio, (porcentaje * promedio)/100 as puntos from (${puntosTotalesByActividades}) as tabla_puntos_by_criterio order by num_control, num_unidad`;
    const promedioByUnidad = `select num_control, nombre_est, num_unidad, sum(puntos) as calificacion from (${promedioByCriterio}) as tabla_promedios_by_unidad group by num_unidad, num_control order by num_control, num_unidad`;

    conexion.query(promedioByUnidad, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Calificacion: Ocurrio un error: ' + err);
        }
    });
}
reporteCtrl.getCriteriosByUnidad = (req, res) => {
    const { id_grupo, unidad } = req.params;
    const params = [id_grupo, unidad]
    const consulta = 'select nombre_criterio, porcentaje from criterio where id_grupo = ? and num_unidad = ? order by nombre_criterio';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
reporteCtrl.getCalificacionesByCriterios = (req, res) => {
    const { num_control, clave_materia, clave_grupo, unidad } = req.params;
    const params = [num_control, clave_materia, clave_grupo, unidad];
    const puntosByActividad = 'select num_control, nombre_est, num_unidad, nombre_criterio, porcentaje, nombre_actividad, (valor * calificacion)/ 100 as puntos from estudiante natural join detalle_calificaciones natural join actividad natural join criterio natural join grupo where num_control = ? and clave_materia = ? and clave_grupo = ?';
    const puntosTotalesByActividades = `select num_control, nombre_est, num_unidad, nombre_criterio, porcentaje, sum(puntos) as promedio from (${puntosByActividad}) as tabla_puntos group by num_control, num_unidad, nombre_criterio, porcentaje`;
    const promedioByCriterio = `select num_control, nombre_est, num_unidad, nombre_criterio, (porcentaje * promedio)/100 as puntos from (${puntosTotalesByActividades}) as tabla_puntos_by_criterio where num_unidad = ? order by num_control, num_unidad`;
    conexion.query(promedioByCriterio, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Calificacion: Ocurrio un error: ' + err);
        }
    });
}

module.exports = reporteCtrl;