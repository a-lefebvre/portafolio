const nodemailer = require('nodemailer');

class Correo {
    constructor(correo, password) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: correo,
                pass: password
            }
        });
    }
    enviarCorreo(mailOptions) {
        this.transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log("ERROR!!!!!!", error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

module.exports = Correo;