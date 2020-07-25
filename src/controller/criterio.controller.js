const conexion = require('../conexion');
const criterioCtrl = {};

criterioCtrl.getCriterio = (req, res) => {
    const { id_criterio } = req.params;
    const params = [id_criterio]
    const consulta = 'select * from criterio where id_criterio = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
criterioCtrl.getCriterios = (req, res) => {
    const { id_grupo } = req.params;
    const params = [id_grupo]
    const consulta = 'select * from criterio where id_grupo = ? order by num_unidad, nombre_criterio';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
criterioCtrl.getCriteriosByUnidad = (req, res) => {
    const { id_grupo, unidad } = req.params;
    const params = [id_grupo, unidad]
    const consulta = 'select * from criterio where id_grupo = ? and num_unidad = ? order by num_unidad, nombre_criterio';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
criterioCtrl.createCriterio = (req, res) => {
    const date = new Date();
    const id_criterio = date.getMilliseconds() + "" + date.getDate() + "" + (date.getMonth() + 1) + "" + date.getFullYear() + "" + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds();
    const { nombre, porcentaje, unidad, id_grupo } = req.body;
    const params = [id_criterio, nombre, porcentaje, unidad, id_grupo];
    const consulta = 'insert into criterio  values (?, ?, ?, ?, ?)';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se agregó nuevo criterio', id_criterio: id_criterio });
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
criterioCtrl.deleteCriterio = (req, res) => {
    const { id_criterio } = req.params;
    const params = [id_criterio];
    const consulta = 'delete from criterio  where id_criterio = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se elimino criterio' });
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

module.exports = criterioCtrl;