import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { Materia } from 'src/app/models/materia';
import { MateriaService } from 'src/app/services/materia/materia.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-add-materias',
  templateUrl: './add-materias.component.html',
  styleUrls: ['./add-materias.component.css']
})
export class AddMateriasComponent implements OnInit {
  disableBtn = true;
  newMaterias: any = [];
  duplicados: any[];
  materias: any;
  nameArchivo: string = 'Selecciona un archivo'
  format: boolean = false;
  constructor(private materiaService: MateriaService,
    private dialog: MatDialog,
    private dataService: DataService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadMaterias()
    this.dataService.listar_materia$.subscribe( () =>{
      this.loadMaterias()
    });
  }
  onChange(event) {
    let files = event.target.files;
    if (files.length != 0) {
      this.newMaterias = [];
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
          let materia = element;
          if (materia.clave_materia != undefined &&
              materia.nombre != undefined &&
              materia.unidades != undefined) {
            cont ++;
            this.newMaterias.push(materia);
          } 
          if (cont == 0) {
            this.disableBtn = true;
            this.openSnackBar('Formato incorrecto, descargue ejemplo de formato válido !!!', 3000);
            this.format= true;
          }else{
            this.format = false;
          }
        });
      }
      reader.readAsBinaryString(file);
    }
  }
  validaMaterias(){
    this.validate(this.newMaterias);
  }
  saveMateria(){
    this.eliminarDuplicados(this.newMaterias, this.duplicados);
    let cont = 0;
    this.newMaterias.forEach(element => {
      let materia: Materia = {
        clave_materia: element.clave_materia.trim(),
        nombre_materia: element.nombre.trim(),
        unidades: element.unidades
      }
      cont++;
      this.materiaService.createMateria(materia). subscribe();
      if (cont == this.newMaterias.length) {
        this.dataService.listar_materia$.emit();
        this.openSnackBar(`Se registraron ${cont} materias`, 2000);
      }
    });
  }
  private validate(array: any){
    this.duplicados = [];
    array.forEach(element => {
      if (this.isDuplicate(element.clave_materia)) {
        this.duplicados.push(element);
      }
    });
    if (this.duplicados.length != 0) {
      if (this.duplicados.length == array.length) {
        this.openSnackBar('Todos los registros ya existen, seleccione otro archivo', 2000);
      }else{
        this.openAlert(`Se ${this.duplicados.length >= 1? 'encontro': 'encontraron'} ${this.duplicados.length} ${this.duplicados.length >= 1? 'registro duplicado': 'registros duplicados'}, no se agregarán, o seleccione un nuevo archivo\nPresione SI para continúar`);
      }
    }else{
      this.saveMateria();
    }
  }
  private isDuplicate(clave_materia: string) {
    let exist = false;
    this.materias.forEach(element => {
      if(element.clave_materia == clave_materia){
        exist = true;
      }
    });
    return exist;
  }
  private loadMaterias(){
    this.materiaService.getMaterias().subscribe(
      res =>{
        this.materias = res;
      }
    );
  }
  private openAlert(mensaje: string) {
    this.dialog.open(DialogConfirmComponent, { 
      width: '400px',
      data: mensaje }
      )
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.saveMateria()
        }
      });
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
  private setFileName(files: any[]){
    let file = files[0];
    if (file != undefined) {
      let name = file.name;
      this.disableBtn = false;
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
  private openSnackBar(message: string, duration: number) {
    let snackBarRef = this._snackBar.open(message, '', { duration: duration });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
}
