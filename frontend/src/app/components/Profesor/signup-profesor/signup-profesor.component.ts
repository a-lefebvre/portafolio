import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profesor } from 'src/app/models/profesor';
import { FormControl, Validators } from '@angular/forms';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { AES } from 'crypto-js';
import { MatDialogRef } from '@angular/material';
import { Correo } from 'src/app/models/correo';
import { EmailService } from 'src/app/services/correo/email.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-signup-profesor',
  templateUrl: './signup-profesor.component.html',
  styleUrls: ['./signup-profesor.component.css']
})
export class SignupProfesorComponent implements OnInit {
  hide: boolean = true;
  rfcFormControl =  new FormControl('', [
                    Validators.required, 
                    Validators.minLength(13),
                    Validators.pattern('([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})')]);
  nombreFormControl = new FormControl('', [Validators.required]);
  apellidoFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirm_passFormControl = new FormControl('', [Validators.required]);
  profesor: Profesor = {
    clave_profesor: '',
    nombre: '',
    apellido: '',
    password: '',
    email:''
  }
  confirm_password: string = '';
  email: Correo;
  key: string = 'U2FsdGVkX1+T8PNTmMwW2lPfbagMzKp4naR5KP7bwEM=';
  disable: boolean = true;
  constructor(private storage: StorageMap, private router: Router,
    private _snackBar: MatSnackBar,
    private profesorService: ProfesorService,
    private emailService: EmailService,
    public dialogRef: MatDialogRef<SignupProfesorComponent>,
    private loginService: LoginService ) { }

  ngOnInit() {
  }
  validaProfesor(){
    this.profesorService.findProfesor(this.profesor.clave_profesor).subscribe(
      res =>{
        if (res[0] != undefined) {
          this.openSnackBar('RFC ya existe, revise bien sus datos');
        }else{
          this.signUp();
        }
      }
    );
  }
  signUp() {
    if (this.profesor.password == this.confirm_password) {
      let cifrado = AES.encrypt(this.profesor.password, this.key);
      // this.profesor.clave_profesor = this.generateClave(this.profesor.nombre, this.profesor.apellido);
      this.profesor.password=cifrado.toString();
      this.profesorService.saveProfesor(this.profesor).subscribe(
        res =>{
          this.onNoClick();
          if (this.profesor.email != '') {
            let asunto = 'REGISTRO EXITOSO';
            let mensaje = 'Se ha realizado tu registro exitosamente en nuestra plataforma de portafolio electronico\n'+
                          'Se realizo el registro bajo la siguiente información:\nCLAVE DE USUARIO: '+
                          this.profesor.clave_profesor+ '\nCONTRASEÑA: '+this.confirm_password+'.\n\n'+
                          'Utiliza estos datos para iniciar sesión en nuestra plataforma.'
            this.crearEmail(this.profesor.email, asunto, mensaje);
          }
          this.openSnackBar('Registro exitoso');
          this.storage.set('clave_profesor', this.profesor.clave_profesor).subscribe( () => {
            this.loginService.profesorLogueado = true;
          });
          this.router.navigate(['/profesor/dashboard']);
        },
        err =>{
          console.log( err );
        }
      );
    }else{
      this.openSnackBar('Las contraseñas deben coincidir');
    }
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
      },
      err => {
        console.log(err);
      }
    );
  }
  private openSnackBar(message: string) {
    let snackBarRef = this._snackBar.open(message, '', { duration: 2000 });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
  private generateClave(nombre: string, apellido: string) {
    let clave = '';
    while (clave.length < 4) {
      let aleatorio = Math.round(Math.random() * nombre.length);
      let random = Math.round(Math.random() * apellido.length);
      if (nombre.length > apellido.length) {
        clave += aleatorio;
      } else {
        clave += random;
      }
    }

    let pos = 0;
    if (nombre.length > apellido.length) {
      while (clave.length < 8) {
        let letra = nombre.charAt(parseInt(clave.charAt(pos)));
        if (letra != ' ') {
          clave += nombre.charAt(parseInt(clave.charAt(pos))).toUpperCase();
        } else {
          clave += 'X';
        }
        pos++;
      }
    } else {
      while (clave.length < 8) {
        let letra = apellido.charAt(parseInt(clave.charAt(pos))).toUpperCase();
        if (letra != ' ') {
          clave += apellido.charAt(parseInt(clave.charAt(pos))).toUpperCase();
        } else {
          clave += 'X';
        }
        pos++;
      }
    }
    return clave;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  private resetForm() {
    this.profesor.clave_profesor = null;
    this.profesor.nombre = null;
    this.profesor.apellido = null;
    this.profesor.email = null;
    this.profesor.password = null;
    this.confirm_password = null;
  }
  validar(){
    if (this.rfcFormControl
      && this.nombreFormControl.valid
      && this.apellidoFormControl.valid
      && this.emailFormControl.valid
      && this.passFormControl.valid
      && this.confirm_passFormControl.valid) {
      this.disable = false;
    }else{
      this.disable = true;
    }
  }
  click(){
    this.dialogRef.close();
  }
  keyPress(event){
    if (event.key == 'Escape') {
      this.dialogRef.close();
    }
  }
}
