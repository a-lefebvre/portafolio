import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Administrador } from 'src/app/models/administrador';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MatSnackBar } from '@angular/material';
import { AdministradorService } from 'src/app/services/administrador/administrador.service';
import { AES, enc } from 'crypto-js';
import { Correo } from 'src/app/models/correo';
import { EmailService } from 'src/app/services/correo/email.service';

@Component({
  selector: 'app-admin-perfil',
  templateUrl: './admin-perfil.component.html',
  styleUrls: ['./admin-perfil.component.css']
})
export class AdminPerfilComponent implements OnInit {
  mode = new FormControl('over');
  key: string = 'U2FsdGVkX1+T8PNTmMwW2lPfbagMzKp4naR5KP7bwEM=';
  admin: Administrador = {
    nombre: '',
    email: ''
  };
  hide: boolean = true;
  nombreFormControl = new FormControl('', [Validators.required]);
  cargoFormControl = new FormControl('', []);
  emailFormControl = new FormControl('', [Validators.email]);
  passFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirm_passFormControl = new FormControl('', [Validators.required]);
  disableBtnGuardar: boolean = true;
  confirm_password: string = '';
  email: Correo;
  constructor(private storage: StorageMap,
    private _snackBar: MatSnackBar,
    private adminService: AdministradorService,
    private emailService: EmailService) { }

  ngOnInit() {
    this.getStorageData();
  }
  updateInfo(){
    let cifrado = AES.encrypt(this.admin.password, this.key);
    this.admin.password = cifrado.toString();
    this.adminService.updateAdministrador(this.admin).subscribe(
      res =>{
        this.openSnackBar(res['text']);
        this.admin.password = this.decifrar(this.admin.password);
        if (this.admin.email != '') {
          let asunto = 'ACTUALIZACIÓN DE INFORMACIÓN';
          let mensaje = 'SALUDOS\nSe ha realizado Actualización de su información en la plataforma PORTAFOLIO DIGITAL\n'+
                        'Sus nuevos datos son:\nCLAVE DE USUARIO: '+
                        this.admin.clave_administrador+ '\nCONTRASEÑA: '+this.confirm_password+'\n\n'+
                        'Utiliza estos datos para iniciar sesión en la plataforma.'
          this.crearEmail(this.admin.email, asunto, mensaje);
        }
      }
    );
  }
  private getStorageData(){
    this.storage.get('clave_administrador').subscribe( clave_administrador =>{
      let clave_admin ='' + clave_administrador;
      this.getAdmin(clave_admin);
    });
  }
  private getAdmin(clave_admin: string){
    this.adminService.findAdministrador(clave_admin).subscribe(
      res =>{
        this.admin = res[0];
        this.admin.password = this.decifrar(this.admin.password);
        this.confirm_password = this.admin.password;
      }
    );
  }
  validar(){
    if (this.admin.password == this.confirm_password) {
      if (this.nombreFormControl.valid
        && this.emailFormControl.valid
        && this.passFormControl.valid
        && this.confirm_passFormControl) {
        this.disableBtnGuardar = false
      }else{
        this.disableBtnGuardar = true
      }
    }else{
      this.openSnackBar('Las contraseñas no coinciden');
      this.disableBtnGuardar = true
    }
  }
  capitaliza(){
    this.admin.nombre = this.admin.nombre.toUpperCase();
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
}
