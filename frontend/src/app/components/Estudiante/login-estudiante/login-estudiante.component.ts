import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { EstudianteService } from 'src/app/services/estudiante/estudiante.service';
import { AES, enc } from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-estudiante',
  templateUrl: './login-estudiante.component.html',
  styleUrls: ['./login-estudiante.component.css']
})
export class LoginEstudianteComponent implements OnInit {
  keys: string = 'U2FsdGVkX1+T8PNTmMwW2lPfbagMzKp4naR5KP7bwEM=';
  numero_control: number;
  password: string;
  passFormControl = new FormControl('', [Validators.required]);
  hide:boolean=true;

   
  constructor(private storage: StorageMap, private router: Router,
    public dialogRef: MatDialogRef<LoginEstudianteComponent>,
    private estudianteService: EstudianteService,
    private _snackBar: MatSnackBar,
    private cookieService: CookieService) { }

  ngOnInit() {
  }
  loginEstudiante(){
    this.estudianteService.findEstudiante(this.numero_control).subscribe(
      res =>{
        const estudiante = res[0];
        if (estudiante !== undefined) {
          let decryptedData = AES.decrypt(estudiante.password_est, this.keys).toString(enc.Utf8);
          if (this.password == decryptedData) {
            this.dialogRef.close();
            this.storage.set('numero_control', this.numero_control).subscribe( () => {});
            this.cookieService.set('est_logueado', 'true', 1, '/');
            this.router.navigate(['/estudiante/dashboard'])
          }else{
            this.openSnackBar('Contraseña incorrecta', 2000);
            this.resetPassword();
          }
        }else{
          this.openSnackBar('Usuario Inválido', 2000);
        }
      },
      err => {
        console.log(err)
        this.openSnackBar('Fallo al cargar el recurso: Error en el servidor', 3000);
      }
    );
  }
  resetForm(){
    this.numero_control=null;
    this.password='';
  }
  resetPassword(){
    this.password='';
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  openSnackBar(message: string, duration: number) {
    let snackBarRef = this._snackBar.open(message, '', { duration: duration });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
  click(){
    this.dialogRef.close();
  }
  key(event){
    if (event.key == 'Escape') {
      this.dialogRef.close();
    }
  }
  validarNumero(event) {
    if (event.charCode >= 48 && event.charCode <= 57) {
      return true;
    }
    return false;
  }
}
