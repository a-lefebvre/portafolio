import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import { SignupProfesorComponent } from '../signup-profesor/signup-profesor.component';
import { AES, enc } from 'crypto-js';
import { DataService } from 'src/app/services/data/data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-profesor',
  templateUrl: './login-profesor.component.html',
  styleUrls: ['./login-profesor.component.css']
})
export class LoginProfesorComponent implements OnInit {
  passFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  keys: string = 'U2FsdGVkX1+T8PNTmMwW2lPfbagMzKp4naR5KP7bwEM=';
  hide:boolean=true;
  clave_profesor: string = '';
  password:string;
  constructor(private storage: StorageMap, private router: Router,
    public dialogRef: MatDialogRef<LoginProfesorComponent>,
    private profesorService: ProfesorService,
    private _snackBar: MatSnackBar, private dialog: MatDialog,
    private cookieService: CookieService,
    private dataService: DataService) { 
  }

  ngOnInit() {
  }
  loginProfesor(){
    this.profesorService.findProfesor(this.clave_profesor).subscribe(
      res => {
        const profesor = res[0];
        if (profesor !== undefined) {
          let decryptedData = AES.decrypt(profesor.password, this.keys).toString(enc.Utf8);
          if (decryptedData == this.password) {
            this.dialogRef.close();
            this.storage.set('clave_profesor', this.clave_profesor).subscribe( () => {});
            this.dataService.clave_profesor$.emit(this.clave_profesor);
            this.cookieService.set('profe_logueado', 'true', 1, '/');
            this.router.navigate(['/profesor/dashboard'])
          }else{
            this.openSnackBar('Contraseña incorrecta', 2000);
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
  signUp(){
    const dialogRef = this.dialog.open(SignupProfesorComponent, {
      height: '660px',
      width: '400px',
      panelClass: 'dialog-custom'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.onNoClick();
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
  capitaliza(){
    this.clave_profesor = this.clave_profesor.toLocaleUpperCase();
  }
}
