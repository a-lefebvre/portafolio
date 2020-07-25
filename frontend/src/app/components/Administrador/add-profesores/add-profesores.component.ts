import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import * as XLSX from 'xlsx';
import { ViewNewProfesoresComponent } from '../view-new-profesores/view-new-profesores.component';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { Profesor } from 'src/app/models/profesor';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import { AES } from 'crypto-js';
import { DataService } from 'src/app/services/data/data.service';
import { Correo } from 'src/app/models/correo';
import { EmailService } from 'src/app/services/correo/email.service';

@Component({
  selector: 'app-add-profesores',
  templateUrl: './add-profesores.component.html',
  styleUrls: ['./add-profesores.component.css']
})
export class AddProfesoresComponent implements OnInit {
  key = 'U2FsdGVkX1+T8PNTmMwW2lPfbagMzKp4naR5KP7bwEM=';
  nameArchivo = 'Selecciona un archivo';
  duplicados: any[];
  profesores: any;
  newProfesores: any;
  email: Correo;
  disableBtn = true;
  format: boolean = false;
  constructor(private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private profesorService: ProfesorService,
    private dataService: DataService,
    private emailService: EmailService) { }

  ngOnInit() {
    this.loadProfesores();
    this.dataService.listar_profesor$.subscribe( ()=>{
      this.loadProfesores();
    });
  }
  onChange(event) {
    let files = event.target.files;
    if (files.length != 0) {
      this.newProfesores = [];
      let workBook = null;
      let jsonData = null;
      const reader = new FileReader();
      this.setFileName(files);
      const file = files[0];
      reader.onload = (ev) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        let hoja = workBook.SheetNames[0];
        jsonData[hoja].forEach(element => {
          let cont = 0;
          let profesor = element;
          if (profesor.rfc != undefined &&
              profesor.nombre != undefined &&
              profesor.apellido != undefined &&
              profesor.email != undefined) {
            cont ++;
            this.newProfesores.push(profesor);
          }
          if (cont == 0) {
            this.disableBtn = true;
            this.openSnackBar('Formato incorrecto !!! Descargue formato de ejemplo.', 2500);
            this.format = true;
          }else{
            this.format = false;
          }
        });
      }
      reader.readAsBinaryString(file);
    }
  }
  validaProfesores(){
    this.validateProfesor(this.newProfesores);
  }
  viewNewProfesores(){
    const dialogRef = this.dialog.open(ViewNewProfesoresComponent, {
      height: '500px',
      width: '800px',
      data: this.newProfesores,
      panelClass: 'dialog-custom'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  private saveProfesores(){
    this.eliminarDuplicados(this.newProfesores, this.duplicados);
    let cont = 1;
    this.newProfesores.forEach(element => {
      let clave_profesor = element.rfc;
      let profesor: Profesor = {
        clave_profesor: clave_profesor,
        nombre: element.nombre.trim(),
        apellido: element.apellido.trim(),
        email: element.email == undefined? '': element.email,
        password: this.getPassCifrada(clave_profesor).trim()
      }
      this.profesorService.saveProfesor(profesor).subscribe(
        res =>{
        if (profesor.email != '') {
          let asunto = 'REGISTRO EXITOSO';
          let mensaje = 'SALUDOS PROFESOR\nSe ha realizado su registro en la plataforma PORTAFOLIO DIGITAL\n'+
                        'Se realizo el registro bajo la siguiente información:\nCLAVE DE USUARIO: '+
                        profesor.clave_profesor+ '\nCONTRASEÑA: '+profesor.clave_profesor+'\n\n'+
                        'Utiliza estos datos para iniciar sesión en la plataforma.\nConsidera en cambiar tu contraseña una vez que inicies sesión.'
          this.crearEmail(profesor.email, asunto, mensaje);
        }
        }
      );
      if (cont == this.newProfesores.length) {
        this.dataService.listar_profesor$.emit();
        this.openSnackBar(`Se ${cont <=1 ? 'registro': 'registraron'} ${cont} ${cont <=1 ? 'profesor': 'profesores'}`, 2000);
      }
      cont++;
    });
  }
  private validateProfesor(array: any){
    this.duplicados = [];
    let cont = 0;
    array.forEach(element => {
      this.profesorService.findProfesor(element.rfc).subscribe(
        res =>{
          cont ++;
          if (res[0] != undefined) {
            this.duplicados.push(element);
          }
          if (cont == array.length) {
            if (this.duplicados.length == array.length) {
              this.openSnackBar(`Todos los registros ya existen, seleccione otro archivo`, 2500);
            }else{
              if (this.duplicados.length == 0) {
                this.saveProfesores();
              }else{
                this.openAlert(`Se encontraron ${this.duplicados.length} registros duplicados, no se agregarán, o seleccione un nuevo archivo\nPresione SI para continúar`);
              }
            }
          }
        }
      );
    });
  }
  private openAlert(mensaje: string) {
    this.dialog.open(DialogConfirmComponent, { 
      width: '400px',
      data: mensaje }
      )
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.saveProfesores();
        }
      });
  }
  private loadProfesores(){
    this.profesorService.getProfesores().subscribe(
      res =>{
        this.profesores = res;
      }
    );
  }
  private openSnackBar(message: string, duration: number) {
    let snackBarRef = this._snackBar.open(message, '', { duration: duration });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
  private setFileName(files: any[]){
    let file = files[0];
    if (file != undefined) {
      this.disableBtn = false;
      let name = file.name;
      if (name.length > 35) {
        this.nameArchivo = '';
        for (let index = 0; index < 32; index++) {
          this.nameArchivo += name.charAt(index);
        }
        this.nameArchivo += '...'
      } else {
        this.nameArchivo = file.name;
      }
    } else {
      this.nameArchivo = 'Selecciona tu archivo';
      this.disableBtn = true;
    }
    // if ( file != undefined) {
    //   this.nameArchivo = file.name;
    //   this.disableBtn = false;
    // }else{
    //   this.nameArchivo = 'Selecciona un archivo';
    //   this.disableBtn = true;
    // }
  }  
  private eliminarDuplicados(original, duplicados){
    duplicados.forEach(element => {
      this.deleteOfArray(original, element);
    });
  }
  private deleteOfArray(arr, item) {
    var i = arr.indexOf(item);
    if (i !== -1) {
      arr.splice(i, 1);
    }
  }
  private getPassCifrada(password: string){
    let cifrado = AES.encrypt(password, this.key);
    return cifrado.toString();
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
