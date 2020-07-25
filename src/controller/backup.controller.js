// const conexion = require('../conexion');
const exec = require('child_process').exec;
const backupCtrl = {};
const path = require('path');
backupCtrl.createBackup = (req, res) => {
    const { user, password } = req.body;
    let date = new Date();
    let fecha = '' + date.getDate() + (date.getMonth() + 1) + date.getFullYear();
    child = exec(`mysqldump -u ${user} -p${password} portafolio > ${fecha}portafolio.sql`, (error, stdout, stderr) => {
        console.log(stdout);
        if (error !== null) {
            console.log('exec error: ' + error);
            res.json({ text: 'Ocurrio un error' });
        }
        res.json({ text: 'Se creo respaldo exitoso' });
    })
}


module.exports = backupCtrl;