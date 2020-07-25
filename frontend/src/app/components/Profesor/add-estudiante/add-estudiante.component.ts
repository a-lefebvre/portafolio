import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { Detalle_grupo } from 'src/app/models/detalle-grupo';
import { EstudianteService } from 'src/app/services/estudiante/estudiante.service';
import { MatSnackBar } from '@angular/material';
import { DetalleGrupoService } from 'src/app/services/detalle-grupo/detalle-grupo.service';
import { AES } from 'crypto-js';
import { StorageMap } from '@ngx-pwa/local-storage';
import { DataService } from 'src/app/services/data/data.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-estudiante',
  templateUrl: './add-estudiante.component.html',
  styleUrls: ['./add-estudiante.component.css']
})
export class AddEstudianteComponent implements OnInit {
  key = 'U2FsdGVkX1+T8PNTmMwW2lPfbagMzKp4naR5KP7bwEM=';
  estudiante: Estudiante = {
    num_control: null,
    nombre: ''
  }
  controlFormcontrol = new FormControl('',
    [Validators.required,
    Validators.minLength(8),
    Validators.maxLength(8),
    Validators.pattern('[1-9]+[0-9]+')]);
  nombreFormcontrol = new FormControl({
    value: this.estudiante.nombre,
    disabled: true
  },
    [Validators.required,
    Validators.minLength(5)]);
  apellidoFormcontrol = new FormControl({
    value: this.estudiante.apellido,
    disabled: true
  },
    [Validators.required,
    Validators.minLength(4)]);
  clave_profesor: any;
  id_grupo: any;
  estudiantes: any;
  clase: Detalle_grupo = {
    id_grupo: 0,
    num_control: 0
  }
  disableBtn: boolean = true;
  constructor(private estudianteService: EstudianteService,
    private _snackBar: MatSnackBar,
    private detalleGrupoService: DetalleGrupoService,
    private storage: StorageMap,
    private dataService: DataService) {
  }

  ngOnInit() {
    this.getStorageData();
  }
  getStorageData() {
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
    });
    this.storage.get('id_grupo').subscribe((id_grupo) => {
      this.id_grupo = id_grupo;
      this.clase.id_grupo = this.id_grupo;
      this.loadEstudiantes(this.clave_profesor, this.id_grupo);
    });
  }
  validateEstudiante() {
    if (this.isNumber(this.estudiante.num_control)) {
      this.clase.num_control = this.estudiante.num_control;
      if (this.isDuplicate(this.estudiante.num_control)) {
        this.nombreFormcontrol.disable();
        this.apellidoFormcontrol.disable();
        this.estudiante.nombre = null;
        this.estudiante.apellido = null;
        this.disableBtn = true;
        this.openSnackBar('Ya existe un alumno con este numero de control, escriba uno diferente', 3500);
      } else {
        this.nombreFormcontrol.enable();
        this.apellidoFormcontrol.enable();
        this.findEstudiante(this.estudiante.num_control);
      }
    } else {
      this.openSnackBar('Numero de control inválido', 2000);
    }
  }
  private isDuplicate(num_control: number) {
    let exist = false;
    this.estudiantes.forEach(element => {
      if (element.num_control == num_control) {
        exist = true;
      }
    });
    return exist;
  }
  private findEstudiante(num_control: number) {
    this.detalleGrupoService.getEstudiante(this.id_grupo, num_control).subscribe(
      res => {
        if (res[0] != undefined) {
          this.estudiante.num_control = res[0].num_control;
        } else {
          this.estudiante.nombre = '';
          this.estudiante.apellido = '';
        }
      }
    );
  }
  saveEstudiante() {
    this.estudianteService.findEstudiante(this.estudiante.num_control).subscribe(
      res => {
        if (res[0] != undefined) {
          this.addEstudiante(this.estudiante.num_control);
        } else {
          this.newEstudiante(this.estudiante);
        }
      }
    );
  }
  private addEstudiante(num_control: number) {
    this.clase.num_control = num_control;
    this.detalleGrupoService.addEstudiante(this.clase).subscribe(
      res => {
        this.dataService.listar$.emit();
        this.resetForm();
        this.openSnackBar(res['text'], 2000);
        this.loadEstudiantes(this.clave_profesor, this.id_grupo);
      }
    );
  }
  private newEstudiante(estudiante: Estudiante) {
    let cifrado = AES.encrypt('' + estudiante.num_control, this.key);
    estudiante.password = cifrado.toString();
    this.estudianteService.saveEstudiante(estudiante).subscribe(
      res => {
        this.addEstudiante(this.estudiante.num_control);
        this.resetForm();
        this.loadEstudiantes(this.clave_profesor, this.id_grupo);
      }
    );
  }
  private loadEstudiantes(clave_profesor: string, id_grupo: string) {
    this.detalleGrupoService.getEstudiantes(clave_profesor, id_grupo, '0').subscribe(
      res => {
        this.estudiantes = res;
      }
    );
  }
  private openSnackBar(message: string, duration: number) {
    let snackBarRef = this._snackBar.open(message, '', { duration: duration, verticalPosition: 'top' });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
  private resetForm() {
    this.controlFormcontrol.reset();
    this.controlFormcontrol.setErrors(null);
    this.nombreFormcontrol.reset();
    this.nombreFormcontrol.setErrors(null);
    this.apellidoFormcontrol.reset();
    this.apellidoFormcontrol.setErrors(null);
  }
  private isNumber(control: number) {
    if (!isNaN(control)) {
      return true;
    }
    return false;
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
  validar() {
    if (this.controlFormcontrol.valid &&
      this.nombreFormcontrol.valid &&
      this.apellidoFormcontrol.valid) {
      this.disableBtn = false;
    } else {
      this.disableBtn = true;
    }
  }
  toMayus() {
    if (this.estudiante.nombre != '') {
      this.estudiante.nombre = this.estudiante.nombre.toUpperCase();
    }
    if (this.estudiante.apellido != '') {
      this.estudiante.apellido = this.estudiante.apellido.toUpperCase();
    }
  }
}
