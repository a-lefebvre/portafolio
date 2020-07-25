import { Component, OnInit } from '@angular/core';
import { Administrador } from 'src/app/models/administrador';
import { FormControl, Validators } from '@angular/forms';
import { AdministradorService } from 'src/app/services/administrador/administrador.service';
import { AES, enc } from 'crypto-js';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  keys: string = 'U2FsdGVkX1+T8PNTmMwW2lPfbagMzKp4naR5KP7bwEM=';
  hide:boolean=true;
  admin: Administrador = {
    clave_administrador: '',
    password: ''
  }
  userFormcontrol = new FormControl('', [Validators.required]);
  passwordFormcontrol = new FormControl({
                      value: this.admin.password,
                      disabled: true
                      }, [Validators.required]);
  disableBtnEntrar: boolean = true;

  constructor(private storage: StorageMap, private router: Router,
    private adminService: AdministradorService,
    public dialogRef: MatDialogRef<LoginAdminComponent>,
    private _snackBar: MatSnackBar,
    private cookieService: CookieService) { }

  ngOnInit() {
  }
  loginAdmin(){
    if (this.userFormcontrol.valid) {
      this.adminService.findAdministrador(this.admin.clave_administrador).subscribe(
        res => {
          const admin = res[0];
          if (admin !== undefined) {
            let decryptedData = AES.decrypt(admin.password, this.keys).toString(enc.Utf8);
            if (decryptedData == this.admin.password) {
              this.storage.set('clave_administrador', this.admin.clave_administrador).subscribe( () => {});
              this.cookieService.set('admin_logueado', 'true', 1, '/');
              this.router.navigate(['/admin/dashboard'])
              this.dialogRef.close();
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
    }else{
      this.openSnackBar('Ingresa con un usuario válido', 2000);
      this.passwordFormcontrol.disable();
    }
  }
  validar(){
    if (this.userFormcontrol.valid) {
      this.passwordFormcontrol.enable();
    }else{
      this.passwordFormcontrol.disable();
    }
    if (this.userFormcontrol.valid 
      && this.passwordFormcontrol.valid) {
      this.disableBtnEntrar = false;
    }else{
      this.disableBtnEntrar = true;
    }
  }
  private openSnackBar(message: string, duration: number) {
    let snackBarRef = this._snackBar.open(message, '', { duration: duration, verticalPosition: 'top' });
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
}
