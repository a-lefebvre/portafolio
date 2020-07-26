const conexion = require('../conexion');
const adminCtrl = {};

adminCtrl.getAdministrador = (req, res) => {
    const clave_admin = req.params.clave_admin;
    const params = [clave_admin]
    const consulta = 'select * from administrador where clave_administrador = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Admin:Ocurrio un error: ' + err);
        }
    });
}

adminCtrl.getAdministradores = (req, res) => {
    const consulta = 'select * from administrador';
    conexion.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Admin:Ocurrio un error: ' + err);
        }
    });
}

adminCtrl.newAdministrador = (req, res) => {
    const { clave_administrador, nombre, email, password } = req.body;
    const params = [clave_administrador, nombre, email, password];
    const consulta = 'insert into administrador values (?, ?, ?, ?)';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Se creo nuevo administrador' });
        } else {
            console.log('Admin:Ocurrio un error: ' + err);
        }
    });
}

adminCtrl.updateAdministrador = (req, res) => {
    const { clave_administrador, nombre, cargo, email, password } = req.body;
    const params = [nombre, email, cargo, password, clave_administrador];
    const consulta = 'update administrador set nombre = ?, email = ?, cargo = ?, password = ? where clave_administrador = ?';
    conexion.query(consulta, params, (err, rows, fields) => {
        if (!err) {
            res.json({ text: 'Actualización exitosa' });
        } else {
            console.log('Admin: Ocurrio un error: ' + err);
        }
    });
}
adminCtrl.config_encabezado_file = (req, res) => {
    let imgPath = '';
    const id_config = 'setting'
    if (req.file != undefined) {
        imgPath = '/uploads/' + req.file.filename;
        const params = [id_config, imgPath]
        const consulta = 'insert into configuracion_archivo (id_config, encabezado) values (?, ?)'
        conexion.query(consulta, params, (err, rows, fields) => {
            if (!err) {
                res.json({ 'text': 'Encabezado Exitoso' });
            } else {
                const params = [imgPath, id_config]
                const consulta = 'update configuracion_archivo set encabezado = ? where id_config = ?'
                conexion.query(consulta, params, (err, rows, fields) => {
                    if (!err) {
                        res.json({ 'text': 'Encabezado Exitoso' });
                    } else {
                        console.log('Admin: Ocurrio un error: ' + err);
                    }
                });
            }
        });
    } else {
        res.json({ 'text': 'Error: No hay imagen' });
    }
}
adminCtrl.config_marca_file = (req, res) => {
    let imgPath = '';
    const id_config = 'setting'
    if (req.file != undefined) {
        imgPath = '/uploads/' + req.file.filename;
        const params = [imgPath, id_config]
        const consulta = 'update configuracion_archivo set marca = ? where id_config = ?'
        conexion.query(consulta, params, (err, rows, fields) => {
            if (!err) {
                res.json({ 'text': 'MArca de agua Exitoso' });
            } else {
                console.log('Admin: Ocurrio un error: ' + err);
            }
        });
    } else {
        res.json({ 'text': 'Error: No hay imagen' });
    }
}
adminCtrl.config_pie_file = (req, res) => {
    let imgPath = '';
    const id_config = 'setting'
    if (req.file != undefined) {
        imgPath = '/uploads/' + req.file.filename;
        const params = [imgPath, id_config]
        const consulta = 'update configuracion_archivo set pie = ? where id_config = ?'
        conexion.query(consulta, params, (err, rows, fields) => {
            if (!err) {
                res.json({ 'text': 'Pie de pagina Exitoso' });
            } else {
                console.log('Admin: Ocurrio un error: ' + err);
            }
        });
    } else {
        res.json({ 'text': 'Error: No hay imagen' });
    }
}
adminCtrl.getImagesFiles = (req, res) => {
    const consulta = 'select * from configuracion_archivo';
    conexion.query(consulta, (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('Admin:Ocurrio un error: ' + err);
        }
    });
}
module.exports = adminCtrl;