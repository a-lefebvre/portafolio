import { Component, OnInit } from '@angular/core';
import { EstudianteService } from 'src/app/services/estudiante/estudiante.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DetalleGrupoService } from 'src/app/services/detalle-grupo/detalle-grupo.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Estudiante } from 'src/app/models/estudiante';
import { AES } from 'crypto-js';
import * as XLSX from 'xlsx';
import { Detalle_grupo } from 'src/app/models/detalle-grupo';
import { DataService } from 'src/app/services/data/data.service';
import { ViewNewEstudiantesComponent } from '../view-new-estudiantes/view-new-estudiantes.component';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-add-estudiantes',
  templateUrl: './add-estudiantes.component.html',
  styleUrls: ['./add-estudiantes.component.css']
})
export class AddEstudiantesComponent implements OnInit {
  key = 'U2FsdGVkX1+T8PNTmMwW2lPfbagMzKp4naR5KP7bwEM=';
  nameArchivo = 'Selecciona un archivo';
  duplicados: any= [];
  clave_profesor: any;
  id_grupo: any;
  estudiantes: any;
  newEstudiantes: any;
  estudiante: Estudiante = {
    num_control: 0,
    nombre: ''
  }
  clase: Detalle_grupo = {
    id_grupo: 0,
    num_control: 0
  }
  disableBtn = true;
  format: boolean = false;
  constructor(private estudianteService: EstudianteService,
    private _snackBar: MatSnackBar,
    private detalleGrupoService: DetalleGrupoService,
    private storage: StorageMap, public dialog: MatDialog,
    private dataService: DataService) { }

  ngOnInit() {
    this.getStorage();
  }
  getStorage(){
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
    });
    this.storage.get('id_grupo').subscribe((id_grupo) => {
      this.id_grupo = id_grupo;
      this.clase.id_grupo = this.id_grupo;
      this.loadEstudiantes(this.clave_profesor, this.id_grupo);
    });
  }
  onChange(event) {
    let files = event.target.files;
    if (files.length != 0) {
      this.newEstudiantes = [];
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
          let estudiante = element;
          if (estudiante.num_control != undefined &&
              estudiante.nombre != undefined &&
              estudiante.apellido != undefined) {
            cont ++;
            this.newEstudiantes.push(estudiante);
            this.disableBtn = false;
          }
          if (cont == 0) {
            this.disableBtn = true;
            this.openSnackBar('Formato incorrecto, descargue el formato de ejemplo valido !!!', 3500);
            this.format = true;
          }else{
            this.format = false;
          }
        });
      }
      reader.readAsBinaryString(file);
    }
  }
  validaEstudiantes() {
    this.validateEstudiantes(this.newEstudiantes);
  }
  private saveEstudiantes(){
    this.eliminarDuplicados(this.newEstudiantes, this.duplicados);
    let cont = 1;
    this.newEstudiantes.forEach(element => {
      this.estudianteService.findEstudiante(element.num_control).subscribe(
        res => {
          if (res[0] != undefined) {
            this.addEstudiante(element.num_control);
          } else {
            let estudiante = this.toMayus(element);
            this.newEstudiante(estudiante);
          }
          if (cont == this.newEstudiantes.length) {
            this.openSnackBar(`Se agregaron ${cont} estudiantes al grupo`, 3000);
          }
          cont++;
        }
      );
    });
  }
  viewEstudiantes() {
    const dialogRef = this.dialog.open(ViewNewEstudiantesComponent, {
      height: '500px',
      width: '800px',
      data: this.newEstudiantes,
      panelClass: 'dialog-custom'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  } 
  private validateEstudiantes(array: any){
    this.duplicados = [];
    array.forEach(element => {
      if (this.isDuplicate(element.num_control)) {
        this.duplicados.push(element);
      }
    });
    if (this.duplicados.length != 0) {
      if (this.duplicados.length == array.length) {
        this.openSnackBar(`Todos los registros ya existen, seleccione otro archivo`, 5000);
      }else{
        this.openAlert(`Se encontraron ${this.duplicados.length} registros duplicados, no se agregarán, o seleccione un nuevo archivo\nPresione SI para continúar`);
      }
    }else{
      this.saveEstudiantes();
    }
  }
  private isDuplicate(num_control: number) {
    let exist = false;
    this.estudiantes.forEach(element => {
      if(element.num_control == num_control){
        exist = true;
      }
    });
    return exist;
  }
  private addEstudiante(num_control: number) {
    this.clase.num_control = num_control;
    this.detalleGrupoService.addEstudiante(this.clase).subscribe(
      res => {
        this.dataService.listar$.emit();
      },
      err => console.log(err)
    );
  }
  private newEstudiante(estudiante: Estudiante) {
    let cifrado = AES.encrypt('' + estudiante.num_control, this.key);
    estudiante.password = cifrado.toString();
    this.estudianteService.saveEstudiante(estudiante).subscribe(
      res => {
        this.addEstudiante(estudiante.num_control);
      }
    );
  }
  private loadEstudiantes(clave_profesor: string, id_grupo: string){
    this.estudiantes = [];
    this.detalleGrupoService.getEstudiantes(clave_profesor, id_grupo, '0').subscribe(
      res=>{
        this.estudiantes = res;
      },
      err =>{
        console.log(err);
      }
    );
  }
  private openSnackBar(message: string, duracion: number) {
    let snackBarRef = this._snackBar.open(message, '', { duration: duracion });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
  private eliminarDuplicados(original, duplicados){
    duplicados.forEach(element => {
      this.deleteOfArray(original, element);
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
          this.saveEstudiantes();
        }
      });
  }
  private deleteOfArray(arr, item) {
    var i = arr.indexOf(item);
    if (i !== -1) {
      arr.splice(i, 1);
    }
  }
  private setFileName(files){
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
  private toMayus(estudiante: Estudiante){
    estudiante.nombre = estudiante.nombre.trim();
    estudiante.apellido = estudiante.apellido.trim();
    estudiante.nombre = estudiante.nombre.toUpperCase();
    estudiante.apellido = estudiante.apellido.toUpperCase();
    return estudiante;
  }
}
