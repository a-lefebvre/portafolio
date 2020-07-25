import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Profesor } from 'src/app/models/profesor';
import { MatSnackBar } from '@angular/material';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import { AES } from 'crypto-js';
import { DataService } from 'src/app/services/data/data.service';
import { Correo } from 'src/app/models/correo';
import { EmailService } from 'src/app/services/correo/email.service';

@Component({
  selector: 'app-add-profesor',
  templateUrl: './add-profesor.component.html',
  styleUrls: ['./add-profesor.component.css']
})
export class AddProfesorComponent implements OnInit {
  hide: boolean = true;
  rfcFormControl =  new FormControl('', [
                    Validators.required, 
                    Validators.minLength(13),
                    Validators.pattern('([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z1-9]{3})')]);
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
  disableBtnRegistrar: boolean = true;
  constructor(private _snackBar: MatSnackBar,
    private profesorService: ProfesorService,
    private dataService: DataService,
    private emailService: EmailService) { }

  ngOnInit() {
  }
  validaNewProfesor(){
    this.profesorService.findProfesor(this.profesor.clave_profesor).subscribe(
      res =>{
        if (res[0] == undefined) {
          this.registrarProfesor();
        }else{
          this.openSnackBar('RFC existente.\nVerifique datos por favor.');
        }
      }
    );
  }
  registrarProfesor() {
    if (this.profesor.password == this.confirm_password) {
      let cifrado = AES.encrypt(this.profesor.password, this.key);
      this.profesor.password=cifrado.toString();
      this.newProfesor(this.profesor);
    }else{
      this.openSnackBar('Las contraseñas deben coincidir');
    }
  }
  private newProfesor(profesor: Profesor){
    this.profesorService.saveProfesor(profesor).subscribe(
      res =>{
        if (this.profesor.email != '') {
          let asunto = 'REGISTRO EXITOSO';
          let mensaje = 'SALUDOS PROFESOR\nSe ha realizado su registro en la plataforma PORTAFOLIO DIGITAL\n'+
                        'Se realizo el registro bajo la siguiente información:\nCLAVE DE USUARIO: '+
                        this.profesor.clave_profesor+ '\nCONTRASEÑA: '+this.confirm_password+'\n\n'+
                        'Utiliza estos datos para iniciar sesión en la plataforma.'
          this.crearEmail(this.profesor.email, asunto, mensaje);
        }
        this.openSnackBar('Registro exitoso');
        this.dataService.listar_profesor$.emit();
        this.resetForm();
      }
    );
  }
  validar(){
    if (this.rfcFormControl
      && this.nombreFormControl.valid
      && this.apellidoFormControl.valid
      && this.emailFormControl.valid
      && this.passFormControl.valid
      && this.confirm_passFormControl.valid) {
      this.disableBtnRegistrar = false;
    }else{
      this.disableBtnRegistrar = true;
    }
  }
  private resetForm() {
    this.rfcFormControl.reset();
    this.rfcFormControl.setErrors(null);
    this.nombreFormControl.reset();
    this.nombreFormControl.setErrors(null);
    this.apellidoFormControl.reset();
    this.apellidoFormControl.setErrors(null);
    this.emailFormControl.reset();
    this.emailFormControl.setErrors(null);
    this.passFormControl.reset();
    this.passFormControl.setErrors(null);
    this.confirm_passFormControl.reset();
    this.confirm_passFormControl.setErrors(null);
  }
  private openSnackBar(message: string) {
    let snackBarRef = this._snackBar.open(message, '', { duration: 2000, verticalPosition: 'top' });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
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
  upperCase(){
    this.profesor.clave_profesor = this.profesor.clave_profesor.toUpperCase();
  }
  toMayus(){
    if (this.profesor.nombre != '') {
      this.profesor.nombre = this.profesor.nombre.toUpperCase()
    }
    if (this.profesor.apellido != '') {
      this.profesor.apellido = this.profesor.apellido.toUpperCase()
    }
  }
  validarLetra(event) {
    if ((event.charCode >= 65 && event.charCode <= 90) || event.charCode == 32 || (event.charCode >= 97 && event.charCode <= 122)) {
      return true;
    }
    return false;
  }
  validarRFC(event){
    if ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 48 && event.charCode <= 57) || (event.charCode >= 97 && event.charCode <= 122)) {
      return true;
    }
    return false;
  }
}
