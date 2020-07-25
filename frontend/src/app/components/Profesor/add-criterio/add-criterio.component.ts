import { Component, OnInit } from '@angular/core';
import { Criterio } from 'src/app/models/criterio';
import { StorageMap } from '@ngx-pwa/local-storage';
import { DataService } from 'src/app/services/data/data.service';
import { CriterioService } from 'src/app/services/criterio/criterio.service';
import { Correo } from 'src/app/models/correo';
import { EmailService } from 'src/app/services/correo/email.service';
import { GrupoService } from 'src/app/services/grupo/grupo.service';
import { DetalleGrupoService } from 'src/app/services/detalle-grupo/detalle-grupo.service';
import { MateriaService } from 'src/app/services/materia/materia.service';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { FormControl, Validators } from '@angular/forms';
import { ActividadService } from 'src/app/services/actividad/actividad.service';
import { Actividad } from 'src/app/models/actividad';

@Component({
  selector: 'app-add-criterio',
  templateUrl: './add-criterio.component.html',
  styleUrls: ['./add-criterio.component.css']
})
export class AddCriterioComponent implements OnInit {
  id_grupo: any;
  clave_profesor: any;
  criterio: Criterio = {
    numero: null,
    unidad: null,
    nombre: '',
    porcentaje: null,
    id_grupo: this.id_grupo
  };
  nombreFormcontrol = new FormControl('', [Validators.required, Validators.minLength(3)]);
  porcentajeFormcontrol = new FormControl({
                          value: this.criterio.porcentaje,
                          disabled: true}, 
                          [Validators.required, 
                          Validators.minLength(1), 
                          Validators.maxLength(3),
                          Validators.pattern('[1-9]+[0-9]*'),
                          Validators.max(100),
                          Validators.min(5)]);
  unidad: number = 1;
  unidades: number[] = [];
  criterios: any;
  porcentaje_total: number = 0;
  email: Correo;
  grupo: any;
  correos: any = []; 
  disableBtn = true;
  constructor(private storage: StorageMap,
    private dataService: DataService,
    private criterioService: CriterioService,
    private emailService: EmailService,
    private grupoService: GrupoService,
    private detalleGrupoService: DetalleGrupoService,
    private materiaService: MateriaService,
    private dialog: MatDialog,
    private actividadService: ActividadService) {  }

  ngOnInit() {
    this.getStorageData();
    this.dataService.unidad$.subscribe(unidad => {
      this.unidad = unidad;
      this.resetForm();
      this.loadCriterios();
    });
    this.loadCriterios();
  }
  getStorageData(){
    this.storage.get('id_grupo').subscribe((id_grupo) => {
      this.id_grupo = id_grupo;
      this.getGrupo();
    });
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
      this.getCorreos();
    });
    this.storage.get('clave_materia').subscribe((materia) => {
      this.getUnidades('' + materia);
    });
  }
  private getGrupo() {
    this.grupoService.findGrupo(this.id_grupo).subscribe(
      res => {
        this.grupo = res[0];
      }
    );
  }
  private loadCriterios() {
    this.storage.get('id_grupo').subscribe((id_grupo) => {
      id_grupo = id_grupo;
      this.criterioService.getCriteriosByUnidad('' + id_grupo, this.unidad).subscribe(
        res => {
          this.criterios = res;
          this.porcentaje_total = this.getTotalPorcentaje();
        },
        err => {
          console.log(err);
        }
      );
    });
  }
  selectUnidad(event) {
    this.unidad = event.value;
    this.dataService.unidad$.emit(this.unidad);
  }
  saveCriterio() {
    this.criterio.unidad = this.unidad;
    this.criterio.id_grupo = this.id_grupo;
    this.validaPorcentaje();
  }
  capitaliza(){
    if (this.criterio.nombre != null && this.criterio.nombre != '' ) {
      this.criterio.nombre=this.capitalizar(this.criterio.nombre);
    }
  }
  private capitalizar(cadena: string){
    return cadena.charAt(0).toUpperCase() + cadena.slice(1).toLowerCase();
  }
  private validaPorcentaje(){
    let suma = this.porcentaje_total + parseInt(this.criterio.porcentaje.toString());
    if (suma > 100) {
      this.openAlert(`Se está rebasando el porcentaje de 100% en ${suma-100}%, realmente deseas agregar este criterio?`);
    } else {
      this.crearCriterio();
    }
  }
  private crearCriterio() {
    this.criterioService.newCriterio(this.criterio).subscribe(
      res => {
        this.dataService.criterios$.emit();
        this.disableBtn = true;
        this.correos.forEach(element => {
          if (element.email_est != null) {
            this.crearEmail(element.email_est);
            this.emailService.sendEmail(this.email).subscribe(
              res => {
                console.log(res);
              }
            );
          }
        });
        let actividad: Actividad = {
          nombre_actividad: this.criterio.nombre,
          valor: 100,
          descripcion: this.criterio.nombre,
          id_criterio: res['id_criterio']
        }
        this.actividadService.newActividad(actividad).subscribe(
          res =>{
            this.resetForm();
            this.loadCriterios();
          }
        );
      }
    );
  }
  private crearEmail(email: string) {
    this.email = {
      email: email,
      asunto: "Nuevo criterio",
      mensaje: `Se ha agregado nuevo criterio a la unidad ${this.unidad} de la materia ${this.grupo.nombre_materia} del grupo ${this.grupo.clave_grupo}`
    }
  }
  private getCorreos() {
    this.detalleGrupoService.getEstudiantes(this.clave_profesor, this.id_grupo, "0").subscribe(
      res => {
        this.correos = res;
      },
      err => {
        console.log();
      }
    );
  }
  private resetForm() {
    this.nombreFormcontrol.reset();
    this.nombreFormcontrol.setErrors(null);
    this.porcentajeFormcontrol.reset();
    this.porcentajeFormcontrol.setErrors(null);
  }
  private getUnidades(materia) {
    this.materiaService.getMateria(materia).subscribe(
      res => {
        let materia = res[0];
        for (let index = 0; index < materia.unidades; index++) {
          this.unidades.push(index + 1);
        }
      },
      err => {
        console.log(err);
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
          this.crearCriterio();
        }
      });
  }
  private getTotalPorcentaje() {
    return this.criterios.map(t => t.porcentaje).reduce((acc, value) => acc + value, 0);
  }
  validar(){
    if (this.nombreFormcontrol.valid) {
      this.porcentajeFormcontrol.enable()
    }else{
      this.porcentajeFormcontrol.disable()
    }
    if (this.nombreFormcontrol.valid && this.porcentajeFormcontrol.valid) {
      this.disableBtn = false;
    }else{
      this.disableBtn = true;
    }
  }
  validarNumero(event) {
    if (event.charCode >= 48 && event.charCode <= 57) {
      return true;
    }
    return false;
  }
}
