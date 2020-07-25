import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { EstudianteService } from 'src/app/services/estudiante/estudiante.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AES, enc } from 'crypto-js';
import { Estudiante } from 'src/app/models/estudiante';
import { EmailService } from 'src/app/services/correo/email.service';
import { Correo } from 'src/app/models/correo';

@Component({
  selector: 'app-est-perfil',
  templateUrl: './est-perfil.component.html',
  styleUrls: ['./est-perfil.component.css']
})
export class EstPerfilComponent implements OnInit {
  key: string = 'U2FsdGVkX1+T8PNTmMwW2lPfbagMzKp4naR5KP7bwEM=';
  hide: boolean = true;
  estudiante: any = {
    num_control: '',
    nombre_est: '',
    email_est: ''
  };
  email: Correo;
  passwordFormcontrol = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirm_passFormcontrol = new FormControl('', [Validators.required]);
  emailFormcontrol = new FormControl('', [Validators.email]);
  disableBtnGuardar: boolean = true;
  confirm_password: string = '';
  constructor(private storage: StorageMap,
    private estudianteService: EstudianteService,
    private _snackBar: MatSnackBar,
    private emailService: EmailService) { }

  ngOnInit() {
    this.getStorageData();
  }
  updateInfo(){
    let cifrado = AES.encrypt(this.estudiante.password_est, this.key);
    this.estudiante.password_est = cifrado.toString();
    let obj: Estudiante = {
      num_control: this.estudiante.num_control,
      email: this.estudiante.email_est,
      password: this.estudiante.password_est
    }
    this.estudianteService.updateEstudiante(obj).subscribe(
      res =>{
        this.openSnackBar(res['text']);
        this.estudiante.password_est = this.decifrar(this.estudiante.password_est);
        if (this.estudiante.email != '') {
          let asunto = 'ACTUALIZACIÓN DE INFORMACIÓN';
          let mensaje = 'SALUDOS\nSe ha realizado actualización de su información en la plataforma PORTAFOLIO DIGITAL\n'+
                        'Sus nuevos datos son:\nCLAVE DE USUARIO: '+
                        this.estudiante.num_control+ '\nCONTRASEÑA: '+this.confirm_password+'\n\n'+
                        'Utiliza estos datos para iniciar sesión en la plataforma.'
          this.crearEmail(this.estudiante.email_est, asunto, mensaje);
        }
        this.disableBtnGuardar = true;
      }
    );
  }
  private crearEmail(email: string, asunto: string, mensaje: string){
    this.email = {
      email: email,
      asunto: asunto,
      mensaje: mensaje
    }
    this.emailService.sendEmail(this.email).subscribe(
      res => {
        console.log(res['text']);
      }
    );
  }
  private getStorageData(){
    this.storage.get('numero_control').subscribe( num_control => {
      let control: any = num_control
      this.getEstudiante(control);
    });
  }
  validar(){
    if (this.estudiante.password_est == this.confirm_password) {
      if (this.emailFormcontrol.valid
        && this.passwordFormcontrol.valid
        && this.confirm_passFormcontrol.valid) {
        this.disableBtnGuardar = false
      }else{
        this.disableBtnGuardar = true
      }
    }else{
      this.openSnackBar('Las contraseñas no coinciden');
      this.disableBtnGuardar = true
    }
  }
  private getEstudiante(num_control: number){
    this.estudianteService.findEstudiante(num_control).subscribe(
      res =>{
        this.estudiante = res[0];
        this.estudiante.password_est = this.decifrar(this.estudiante.password_est);
        this.confirm_password = this.estudiante.password_est;
      }
    );
  }
  private decifrar(password: string){
    let decryptedData = AES.decrypt(password, this.key).toString(enc.Utf8);
    return decryptedData;
  }
  openSnackBar(message: string) {
    let snackBarRef = this._snackBar.open(message, '', { duration: 2000, verticalPosition: 'top' });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
}
