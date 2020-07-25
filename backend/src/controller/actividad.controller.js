const conexion = require('../conexion');
const actividadCtrl = {};

actividadCtrl.findActividad = (req, res) => {
    const { id_actividad } = req.params;
    const params = [id_actividad];
    const consulta = 'select * from actividad where id_actividad = ? order by nombre_actividad';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Actividad: Ocurrio un error: ' + err);
        }
    });
}
actividadCtrl.getAllActividades = (req, res) => {
    const consulta = 'select * from actividad order by nombre_actividad';
    conexion.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Actividad: Ocurrio un error: ' + err);
        }
    });
}
actividadCtrl.getAllActividadesByCriterio = (req, res) => {
    const { id_criterio } = req.params;
    const params = [id_criterio];
    const consulta = 'select * from actividad where id_criterio = ? order by nombre_actividad';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Actividad: Ocurrio un error: ' + err);
        }
    });
}
actividadCtrl.getActividadesByGrupo = (req, res) => {
    const { id_grupo, num_unidad, id_criterio } = req.params;
    const params = [id_grupo, num_unidad, id_criterio];
    const consulta = 'select * from criterio natural join actividad where id_grupo = ? and num_unidad = ? and id_criterio = ? order by nombre_actividad';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Actividad: Ocurrio un error: ' + err);
        }
    });

}
actividadCtrl.getAllActividadesByUnidad = (req, res) => {
    const { num_unidad } = req.params;
    const params = [num_unidad];
    const consulta = 'select * from criterio natural join actividad where num_unidad = ? order by nombre_actividad';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Actividad: Ocurrio un error: ' + err);
        }
    });
}
actividadCtrl.createActividad = (req, res) => {
    const date = new Date();
    const id_actividad = date.getMilliseconds() + "" + date.getDate() + "" + (date.getMonth() + 1) + "" + date.getFullYear() + "" + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds();
    const { nombre_actividad, valor, descripcion, id_criterio } = req.body;
    const params = [id_actividad, nombre_actividad, valor, descripcion, id_criterio];
    const consulta = 'insert into actividad  values (?, ?, ?, ?, ?)';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se registro nueva actividad' });
        } else {
            console.log('Actividad: Ocurrio un error: ' + err);
        }
    });
}
actividadCtrl.updateActividad = (req, res) => {
    const { id_actividad, valor } = req.body;
    const params = [valor, id_actividad];
    const consulta = 'update actividad set valor = ? where id_actividad = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se actualizo valor con exito' });
        } else {
            console.log('Actividad: Ocurrio un error: ' + err);
        }
    });
}
actividadCtrl.deleteActividad = (req, res) => {
    const { id_actividad } = req.params;
    const params = [id_actividad];
    const consulta = 'delete from actividad where id_actividad = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se elimino actividad con exito' });
        } else {
            console.log('Actividad: Ocurrio un error: ' + err);
        }
    });
}

module.exports = actividadCtrl;