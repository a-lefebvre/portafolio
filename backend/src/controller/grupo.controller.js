const conexion = require('../conexion');
const grupoCtrl = {};

grupoCtrl.getAllGrupos = (req, res) => {
    const consulta = 'select * from materia natural join grupo order by nombre_materia';
    conexion.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
grupoCtrl.getGrupo = (req, res) => {
    const clave_profesor = req.params.clave_profesor;
    const clave_materia = req.params.clave_materia;
    const clave_grupo = req.params.clave_grupo;
    const params = [clave_profesor, clave_materia, clave_grupo];
    const consulta = 'select * from grupo natural join materia where clave_profesor = ? and clave_materia = ? and clave_grupo = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
grupoCtrl.findGrupo = (req, res) => {
    const id_grupo = req.params.id_grupo;
    const consulta = 'select * from materia natural join grupo where id_grupo = ?';
    conexion.query(consulta, [id_grupo], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
grupoCtrl.getMateriasByProfesor = (req, res) => {
    const clave_profesor = req.params.clave_profesor;
    const consulta = "select clave_materia, nombre_materia, unidades, id_grupo, " +
        "clave_grupo, clave_profesor, DATE_FORMAT(hora_inicio,'%H:%i') hora_inicio, " +
        "DATE_FORMAT(hora_final,'%H:%i') hora_final " +
        "from materia natural join grupo where clave_profesor = ? order by nombre_materia, clave_grupo";
    conexion.query(consulta, [clave_profesor], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
grupoCtrl.getGruposByMateriaByProfesor = (req, res) => {
        const clave_profesor = req.params.clave_profesor;
        const clave_materia = req.params.clave_materia;
        const params = [clave_profesor, clave_materia];
        const consulta = 'select * from grupo natural join materia where clave_profesor = ? and clave_materia = ? order by clave_grupo';
        conexion.query(consulta, params, (err, rows, fields) => {
            if (!err) {
                res.json(rows);
            } else {
                console.log('Ocurrio un error: ' + err);
            }
        });
    }
    // Estudiante
grupoCtrl.getMateriasByEstudiante = (req, res) => {
    const { num_control } = req.params;
    const params = [num_control];
    const datos = "clave_materia, nombre_materia, unidades, id_grupo, clave_grupo, num_control, DATE_FORMAT(hora_inicio,'%H:%i') hora_inicio, DATE_FORMAT(hora_final,'%H:%i') hora_final"
    const consulta = `select ${datos} from materia natural join grupo natural join detalle_grupo where num_control = ? order by nombre_materia, clave_grupo;`;
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('getGrupos:Ocurrio un error: ' + err);
        }
    });
}
grupoCtrl.createGrupo = (req, res) => {
    let aleatorio = Math.round(Math.random() * 100);
    const date = new Date();
    const id_grupo = date.getDay() + "" + aleatorio + (date.getMonth() + 1) + "" + date.getFullYear() + "" + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds() + aleatorio + date.getMilliseconds();

    const { clave_materia, clave_grupo, clave_profesor, hora_inicio, hora_final } = req.body;
    const params = [id_grupo, clave_materia, clave_grupo, clave_profesor, hora_inicio, hora_final];
    const consulta = 'insert into grupo values (?, ?, ?, ?, ?, ?)';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se creo nuevo grupo' });
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}
grupoCtrl.deleteGrupo = (req, res) => {
    const { id_grupo } = req.params;
    const params = [id_grupo];
    const consulta = 'delete from grupo where id_grupo = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se elimino correctamemte el grupo' });
        } else {
            console.log('Ocurrio un error: ' + err);
        }
    });
}

module.exports = grupoCtrl;