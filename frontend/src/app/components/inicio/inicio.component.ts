import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginProfesorComponent } from '../Profesor/login-profesor/login-profesor.component';
import { LoginAdminComponent } from '../Administrador/login-admin/login-admin.component';
import { LoginEstudianteComponent } from '../Estudiante/login-estudiante/login-estudiante.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as JSZip from 'jszip';
import FileSaver from 'file-saver';

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
  test() {
    let Zip = new JSZip();
    for (let index = 0; index < 5; index++) {
      let profesor = Zip.folder("Profesor"+(index+1));
      let periodo = profesor.folder("Periodo ago-dic 2020");
      let materias= periodo.folder("Web");
      let grupos = materias.folder("ISA");
      let califFinales = grupos.file("calif finales.pdf", "aca van los datos");
      let unidad = grupos.folder("unidad 1");
      let califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      let asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 2");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 3");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 4");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 5");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      grupos = materias.folder("ISU");
      califFinales = grupos.file("calif finales.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 1");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 2");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 3");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 4");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 5");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      materias = periodo.folder("Ciencia de los datos");
      grupos = materias.folder("ISB");
      califFinales = grupos.file("calif finales.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 1");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 2");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 3");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 4");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 5");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      materias = periodo.folder("Calculo");
      grupos = materias.folder("ISC");
      califFinales = grupos.file("calif finales.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 1");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 2");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 3");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 4");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 5");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      grupos = materias.folder("ISU");
      califFinales = grupos.file("calif finales.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 1");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 2");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 3");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 4");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      unidad = grupos.folder("unidad 5");
      califParciales = unidad.file("calif parciales.pdf", "aca van los datos");
      asistencia = unidad.file("asistencia.pdf", "aca van los datos");
      Zip.generateAsync({ type: "blob" }).then(function (content) {
        FileSaver.saveAs(content, "download.zip");
      });
    }
  }
}
