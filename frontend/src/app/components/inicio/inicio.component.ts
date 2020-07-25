import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginProfesorComponent } from '../Profesor/login-profesor/login-profesor.component';
import { LoginAdminComponent } from '../Administrador/login-admin/login-admin.component';
import { LoginEstudianteComponent } from '../Estudiante/login-estudiante/login-estudiante.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  faqs: any = [];
  constructor(public dialog: MatDialog,
    private cookieService: CookieService, 
    private router: Router) { }

  ngOnInit() {
    if(this.verifyCookieAdmin()){
      this.router.navigate(['/admin/dashboard'])
    }
    if(this.verifyCookieProfe()){
      this.router.navigate(['/profesor/dashboard'])
    }
    if(this.verifyCookieEst()){
      this.router.navigate(['/estudiante/dashboard'])
    }
  }
  private verifyCookieAdmin(){
    return this.cookieService.check('admin_logueado');
  }
  private verifyCookieProfe(){
    return this.cookieService.check('profe_logueado');
  }
  private verifyCookieEst(){
    return this.cookieService.check('est_logueado');
  }

  openDialogProfe(): void {
    const dialogRef = this.dialog.open(LoginProfesorComponent, {
      height: '450px',
      width: '300px',
      panelClass: 'dialog-custom'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialogEst(): void {
    const dialogRef = this.dialog.open(LoginEstudianteComponent, {
      height: '450px',
      width: '300px',
      panelClass: 'dialog-custom'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialogAdmin(): void{
    const dialogRef = this.dialog.open(LoginAdminComponent, {
      height: '450px',
      width: '300px',
      panelClass: 'dialog-custom'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
