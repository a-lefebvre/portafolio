const path = require('path');
const fs = require('fs');
const actividadCtrl = {};

actividadCtrl.getManualAdmin = (req, res) => {
    let archivo = fs.readFileSync('src/public/manuales/manualAdmin.pdf');
    res.contentType("application/pdf");
    res.send(archivo);
}


module.exports = actividadCtrl;