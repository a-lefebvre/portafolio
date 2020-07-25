import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../../../services/materia/materia.service';
import { Grupo } from 'src/app/models/grupo';
import { GrupoService } from 'src/app/services/grupo/grupo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Materia } from 'src/app/models/materia';

import { FormControl, Validators } from '@angular/forms';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-grupo',
  templateUrl: './add-grupo.component.html',
  styleUrls: ['./add-grupo.component.css']
})
export class AddGrupoComponent implements OnInit {
  mode = new FormControl('over');

  claveFormcontrol = new FormControl('', [Validators.required]);
  grupoFormcontrol = new FormControl('', [Validators.required]);

  horaInicio: string;
  horaFinal: string;
  inicioControl = new FormControl('', [Validators.required]);
  finalControl = new FormControl('', [Validators.required]);
  private completo: string[] = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  hora_inicio: string[] = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  hora_final: string[] = [];
  materias: any = [];
  materia: Materia = {
    clave_materia: '',
    nombre_materia: '',
    unidades: null
  };
  grupo: Grupo = {
    clave_materia: '',
    clave_grupo: '',
    clave_profesor: '',
    hora_inicio: this.horaInicio,
    hora_final: this.horaFinal
  }
  clave_profesor: any;
  disableBtnGuardar = true;
  constructor(private materiaService: MateriaService,
    private grupoService: GrupoService,
    private _snackBar: MatSnackBar,
    private storage: StorageMap, private router: Router, ) {
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
      this.grupo.clave_profesor = this.clave_profesor;
    });
  }

  ngOnInit() {
    this.materiaService.getMaterias().subscribe(
      res => {
        this.materias = res;
      },
      err => console.log(err)
    );
  }
  saveGrupo() {
    this.grupo.hora_inicio = this.horaInicio;
    this.grupo.hora_final = this.horaFinal;
    this.grupoService.saveGrupo(this.grupo).subscribe(
      res => {
        this.openSnackBar(res['text']);
        this.resetForm();
      },
      err => console.log(err)
    );
  }
  setValue() {
    this.grupo.clave_grupo = null;
    if (this.grupo.clave_materia != '') {
      this.materiaService.getMateria(this.grupo.clave_materia).subscribe(
        res => {
          if (res[0] != undefined) {
            this.materia = res[0];
          } else {
            this.resetMateria();
            this.openSnackBar('Clave de materia incorrecta');
          }
        }
      );
    } else {
      this.resetMateria();
    }
  }
  verificarGrupoDuplicado() {
    if (this.grupo.clave_materia != null && this.grupo.clave_materia != '') {
      this.grupoService.findUniqueGrupo(this.clave_profesor, this.grupo.clave_materia, this.grupo.clave_grupo).subscribe(
        res => {
          if (res[0] != undefined) {
            this.openSnackBar(`El grupo ${this.grupo.clave_grupo} ya existe.`);
            this.grupo.clave_grupo = null;
          } else {
            this.grupo.clave_grupo = this.grupo.clave_grupo.toUpperCase();
            this.eliminarHorasDuplicadas();
          }
        }
      );
    }
  }
  private eliminarHorasDuplicadas() {
    this.grupoService.getMaterias(this.clave_profesor).subscribe(
      res => {
        let array: any;
        array = res;
        let cont = 0;
        array.forEach(element => {
          cont ++;
          this.deleteOfArray(this.hora_inicio, element.hora_inicio);
          if (cont == array.length) {
            this.setHorario();
          }
        });
      }
    );
  }
  private setHorario() {
    this.horaInicio = this.hora_inicio[0];
    this.setFinal();
  }
  setFinal() {
    let pos = this.completo.indexOf(this.horaInicio) + 1;
    this.hora_final.splice(0, this.hora_inicio.length);
    if (pos == 13) {
      this.horaFinal = '20:00';
      this.hora_final.push('20:00');
    } else {
      let cont = 0;
      this.horaFinal = this.completo[pos];
      for (let index = pos; index < this.completo.length; index++) {
        this.hora_final[cont] = this.completo[index];
        cont++;
        if (index == 12) {
          this.hora_final[cont] = '20:00';
        }
      }
    }
  }
  private resetForm() {
    this.grupo.clave_materia = null;
    this.grupo.clave_grupo = null;
    this.materia.clave_materia = null;
    this.materia.nombre_materia = null;
    this.materia.unidades = null;
    this.horaInicio = null;
    this.horaFinal = null;

    this.claveFormcontrol.reset();
    this.claveFormcontrol.setErrors(null);
    this.grupoFormcontrol.reset();
    this.grupoFormcontrol.setErrors(null);
    this.inicioControl.reset();
    this.inicioControl.setErrors(null);
    this.finalControl.reset();
    this.finalControl.setErrors(null);
  }
  private resetMateria() {
    this.materia.clave_materia = null;
    this.materia.nombre_materia = null;
    this.materia.unidades = null;
    this.grupo.clave_grupo = null;
  }
  // private logOut() {
  //   this.storage.delete('clave_profesor').subscribe(() => {
  //     this.router.navigate(['/'])
  //   });
  // }
  private deleteOfArray(arr, item) {
    var i = arr.indexOf(item);
    if (i !== -1) {
      arr.splice(i, 1);
    }
  }
  private openSnackBar(message: string) {
    let snackBarRef = this._snackBar.open(message, '', { duration: 2000 });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
  validar(){
    if (this.claveFormcontrol.valid &&
        this.grupoFormcontrol.valid) {
      this.disableBtnGuardar = false;
    }else{
      this.disableBtnGuardar = true
    }
  }
}
