import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ViewNewGruposComponent } from '../view-new-grupos/view-new-grupos.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { GrupoService } from 'src/app/services/grupo/grupo.service';
import { Grupo } from 'src/app/models/grupo';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { DataService } from 'src/app/services/data/data.service';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';

@Component({
  selector: 'app-add-grupos',
  templateUrl: './add-grupos.component.html',
  styleUrls: ['./add-grupos.component.css']
})
export class AddGruposComponent implements OnInit {
  nameArchivo: string = 'Selecciona tu archivo';
  // nameArchivo = 'Selecciona un archivo';
  lista_grupos: any;
  disableOptions = true;
  grupos: any;
  duplicados: any;
  constructor(private dialog: MatDialog,
    private grupoService: GrupoService,
    private _snackBar: MatSnackBar,
    private dataService: DataService,
    private profesorService: ProfesorService) { }

  ngOnInit() {
    this.loadGrupos();
    this.dataService.listar_grupos$.subscribe( ()=>{
      this.loadGrupos();
    });
  }
  onChange(event) {
    this.loadGrupos();
    let files = event.target.files;
    if (files.length != 0) {
      this.lista_grupos = [];
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
          let row = element;
          let cont = 0;
          if (row.rfc != undefined &&
              row.clave_materia != undefined &&
              row.grupo != undefined) {
            cont ++;
            this.lista_grupos.push(row);
            this.disableOptions = false;
          } 
          if (cont == 0) {
            this.disableOptions = true;
            this.openSnackBar('Formato incorrecto, descargue un formato válido !!!', 2500);
          }
        });
      }
      reader.readAsBinaryString(file);
    }
  }
  viewGrupos() {
    const dialogRef = this.dialog.open(ViewNewGruposComponent, {
      height: 'auto',
      width: '600px',
      data: this.lista_grupos,
      panelClass: 'dialog-custom'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (this.lista_grupos.length == 0) {
        this.openSnackBar('Formato incorrecto, descargue un formato válido !!!', 2500);
      }
      console.log('The dialog was closed');
    });
  }
  validarGrupos() {
    this.duplicados = [];
    this.lista_grupos.forEach(element => {
      let grupo: Grupo = {
        clave_materia: element.clave_materia.toUpperCase(),
        clave_grupo: element.grupo.toUpperCase(),
        clave_profesor: element.rfc.toUpperCase()
      }
      if (this.exist(this.grupos, grupo)) {
        this.duplicados.push(element);
      }
    });
    if (this.duplicados.length != 0) {
      if (this.duplicados.length == this.lista_grupos.length) {
        this.openSnackBar('Todos los registros ya existen, elija otro archivo.', 2500);
      }else{
        this.openAlert(`Hay ${this.duplicados.length} ${this.duplicados.length <= 1? 'duplicado': 'duplicados'}, no se guardaran, SI para continúar`);
      }
    } else {
      // this.saveGrupo();
      this.validateProfesores();
    }
  }
  validateProfesores(){
    let notExistentes: number = 0;
    this.eliminarDuplicados(this.lista_grupos, this.duplicados);
    let cont  = 0;
    this.lista_grupos.forEach(element => {
      let rfc = element.rfc.toUpperCase();
      this.profesorService.findProfesor(rfc).subscribe(
        res =>{
          cont ++;
          let array: any = res;
          if (array.length == 0) {
            notExistentes++;
          }
          if (cont == this.lista_grupos.length) {
            if (notExistentes > 0) {
              this.openSnackBar(`Hay ${notExistentes} RFC de ${notExistentes <= 1? 'profesor que aun no esta registrado': 'profesores que aun no estan registrados'}, verifique su archivo por favor.`, 5000);
            }else{
              this.saveGrupo();
            }
          }
        }
      );
    });
  }
  private saveGrupo() {
    // this.eliminarDuplicados(this.lista_grupos, this.duplicados);
    let cont = 1;
    this.lista_grupos.forEach(element => {
      let grupo: Grupo = {
        clave_materia: element.clave_materia.trim(),
        clave_grupo: element.grupo.trim(),
        clave_profesor: element.rfc.trim(),
        hora_inicio: element.hora_inicio + ':00',
        hora_final: element.hora_final + ':00'
      }
      grupo.clave_materia.toUpperCase();
      grupo.clave_grupo.toUpperCase();
      grupo.clave_profesor.toUpperCase();
      this.grupoService.saveGrupo(grupo).subscribe()
      if (cont == this.lista_grupos.length) {
        this.openSnackBar(`Se registro ${cont} ${cont <= 1? 'grupo': 'grupos'} `, 2000);
        this.dataService.listar_grupos$.emit();
        this.loadGrupos();
      }
      cont++;
    });
  }
  private openAlert(mensaje: string) {
    this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: mensaje
    }
    )
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          // this.saveGrupo();
          this.validateProfesores();
        }
      });
  }
  private eliminarDuplicados(original, duplicados) {
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
  private loadGrupos() {
    this.grupoService.getAllGrupos().subscribe(
      res => {
        this.grupos = res;
      }
    );
  }
  private compareObj(a, b) {
    if (a.clave_materia == b.clave_materia && 
        a.clave_grupo == b.clave_grupo && 
        a.clave_profesor == b.clave_profesor) {
      return true;
    }
    return false;
  }
  private exist(array: Grupo[], obj) {
    let flag = false;
    array.forEach(element => {
      let grupo: Grupo = {
        clave_materia: element.clave_materia,
        clave_grupo: element.clave_grupo,
        clave_profesor: element.clave_profesor
      }
      if (this.compareObj(grupo, obj)) {
        flag = true;
        return true;
      }
    });
    return flag;
  }
  private setFileName(files: any[]) {
    let file = files[0];
    if (file != undefined) {
      let name = file.name;
      if (name.length > 20) {
        this.nameArchivo = '';
        for (let index = 0; index < 17; index++) {
          this.nameArchivo += name.charAt(index);
        }
        this.nameArchivo += '...'
      } else {
        this.nameArchivo = file.name;
      }
    } else {
      this.nameArchivo = 'Selecciona tu archivo';
    }
  }
  private openSnackBar(message: string, duration: number) {
    let snackBarRef = this._snackBar.open(message, '', { duration: duration, verticalPosition: 'top' });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
}
