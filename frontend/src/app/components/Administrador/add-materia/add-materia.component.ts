import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Materia } from 'src/app/models/materia';
import { MatSnackBar } from '@angular/material';
import { MateriaService } from 'src/app/services/materia/materia.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-add-materia',
  templateUrl: './add-materia.component.html',
  styleUrls: ['./add-materia.component.css']
})
export class AddMateriaComponent implements OnInit {
  materia: Materia = {
    clave_materia: '',
    nombre_materia: '',
    unidades: null
  };
  claveFormcontrol = new FormControl('', 
                    [Validators.required,
                    Validators.minLength(7),
                    Validators.pattern('[a-zA-Z]{3}[0-9]{4}')]);
  nombreFormcontrol = new FormControl('', 
                      [Validators.required])
  unidadFormcontrol = new FormControl('', 
                    [Validators.required,
                    Validators.min(2)]);
  materias: any;
  disableBtnSave = true;
  constructor(private _snackBar: MatSnackBar,
    private materiaService: MateriaService,
    private dataService: DataService) { }

  ngOnInit() {
    this.loadMaterias();
    this.dataService.listar_materia$.subscribe(() =>{
      this.loadMaterias();
    });
  }
  validaMateria(){
    if (this.isDuplicate(this.materia.clave_materia)) {
      this.openSnackBar('Materia duplicada, no se puede duplicar materias.');
    }else{
      this.saveMateria();
    }
  }
  private saveMateria(){
    this.materia.clave_materia.trim();
    this.materia.nombre_materia.trim();
    this.materia.clave_materia.toUpperCase();
    this.materia.nombre_materia.toUpperCase();
    this.materiaService.createMateria(this.materia).subscribe(
      res =>{
        this.openSnackBar(res['text']);
        this.dataService.listar_materia$.emit();
        this.loadMaterias();
        this.resetForm();
      }
    );
  }
  private loadMaterias(){
    this.materiaService.getMaterias().subscribe(
      res =>{
        this.materias = res;
      }
    );
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
  validar(){
    if (this.claveFormcontrol.valid &&
        this.nombreFormcontrol.valid &&
        this.unidadFormcontrol.valid) {
      this.disableBtnSave = false;
    }else{
      this.disableBtnSave = true;
    }
  }
  validarNumero(event) {
    if (event.charCode >= 48 && event.charCode <= 57) {
      return true;
    }
    return false;
  }
  validarLetra(event) {
    if ((event.charCode >= 65 && event.charCode <= 90) || event.charCode == 32 || (event.charCode >= 97 && event.charCode <= 122)) {
      return true;
    }
    return false;
  }
  toMayus(){
    if (this.materia.nombre_materia != '') {
      this.materia.nombre_materia = this.materia.nombre_materia.toUpperCase()
    }
    if (this.materia.clave_materia != '') {
      this.materia.clave_materia = this.materia.clave_materia.toUpperCase()
    }
  }
  validarClave(event){
    if ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 48 && event.charCode <= 57) || (event.charCode >= 97 && event.charCode <= 122)) {
      return true;
    }
    return false;
  }
  private openSnackBar(message: string) {
    let snackBarRef = this._snackBar.open(message, '', { duration: 2000 });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
  private resetForm(){
    this.claveFormcontrol.reset();
    this.claveFormcontrol.setErrors(null);
    this.nombreFormcontrol.reset();
    this.nombreFormcontrol.setErrors(null);
    this.unidadFormcontrol.reset();
    this.unidadFormcontrol.setErrors(null);
  }

}
