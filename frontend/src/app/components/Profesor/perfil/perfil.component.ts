import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { AES, enc } from 'crypto-js';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { LoginService } from 'src/app/services/login/login.service';
import { Correo } from 'src/app/models/correo';
import { EmailService } from 'src/app/services/correo/email.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  mode = new FormControl('over');
  key: string = 'U2FsdGVkX1+T8PNTmMwW2lPfbagMzKp4naR5KP7bwEM=';
  profesor: any = {
    apellido: '',
    email: ''
  };
  hora: number;
  hide: boolean = true;
  nombreFormControl = new FormControl('', [Validators.required]);
  apellidoFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirm_passFormControl = new FormControl('', [Validators.required]);
  disable: boolean = true;
  confirm_password: string = '';
  email: Correo;
  constructor(private profesorService: ProfesorService,
    private storage: StorageMap,
    private _snackBar: MatSnackBar,
    private emailService: EmailService) { }

  ngOnInit() {
    let date = new Date();
    this.hora = date.getHours();
    this.getStorageData();
  }
  private getStorageData(){
    this.storage.get('clave_profesor').subscribe((profesor) => {
      let clave_profesor = '' + profesor;
      this.getProfesor(clave_profesor);
    });
  }
  private getProfesor(clave_profesor: string){
    this.profesorService.findProfesor(clave_profesor).subscribe(
      res => {
        this.profesor = res[0];
        this.profesor.password = this.decifrar(this.profesor.password);
        this.confirm_password = this.profesor.password;
      },
      err => console.log(err)
    );
  }
  validar(){
    if (this.profesor.password == this.confirm_password) {
      if (this.nombreFormControl.valid
        && this.apellidoFormControl.valid
        && this.emailFormControl.valid
        && this.passFormControl.valid
        && this.confirm_passFormControl) {
        this.disable = false
      }else{
        this.disable = true
      }
    }else{
      this.openSnackBar('Las contraseñas no coinciden');
      this.disable = true
    }
  }
  updateInfo(){
    let cifrado = AES.encrypt(this.profesor.password, this.key);
    this.profesor.password = cifrado.toString();
    this.profesorService.updateProfesor(this.profesor).subscribe(
      res =>{
        this.openSnackBar(res['text']);
        this.disable = true;
        this.profesor.password = this.decifrar(this.profesor.password);
        if (this.profesor.email != '') {
          let asunto = 'ACTUALIZACIÓN DE INFORMACIÓN';
          let mensaje = 'SALUDOS\nSe ha realizado actualización de su información en la plataforma PORTAFOLIO DIGITAL\n'+
                        'Sus nuevos datos son:\nCLAVE DE USUARIO: '+
                        this.profesor.clave_profesor+ '\nCONTRASEÑA: '+this.confirm_password+'\n\n'+
                        'Utiliza estos datos para iniciar sesión en la plataforma.'
          this.crearEmail(this.profesor.email, asunto, mensaje);
        }
      }
    );
  }
  decifrar(password: string){
    let decryptedData = AES.decrypt(password, this.key).toString(enc.Utf8);
    return decryptedData;
  }
  openSnackBar(message: string) {
    let snackBarRef = this._snackBar.open(message, '', { duration: 2000, verticalPosition: 'top' });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
  capitaliza(){
    this.profesor.nombre = this.profesor.nombre.toUpperCase();
    this.profesor.apellido = this.profesor.apellido.toUpperCase();
    console.log(this.profesor.nombre );
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
}
