import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MateriaService } from 'src/app/services/materia/materia.service';
import { CriterioService } from 'src/app/services/criterio/criterio.service';
import { ActividadService } from 'src/app/services/actividad/actividad.service';
import { DataService } from 'src/app/services/data/data.service';
import { DetalleGrupoService } from 'src/app/services/detalle-grupo/detalle-grupo.service';
import { MatTableDataSource, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Actividad } from 'src/app/models/actividad';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { Calificacion } from 'src/app/models/calificacion';
import { CalificacionService } from 'src/app/services/calificacion/calificacion.service';
import { Correo } from 'src/app/models/correo';
import { GrupoService } from 'src/app/services/grupo/grupo.service';
import { EmailService } from 'src/app/services/correo/email.service';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnInit {
  selectActividadControl = new FormControl('', [Validators.required]);
  selectCriterioControl = new FormControl('', [Validators.required]);
  clave_profesor: any;
  alumnos: any;
  displayedColumns: string[] = ['num_control', 'nombre_est', 'calificacion'];
  dataSource: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  unidad: number = 1;
  unidades: number[] = [];
  criterio: string = '';
  criterios: any = [];
  actividades: any = [];
  actividad: Actividad = {
    descripcion: null,
    valor: null
  }
  calificaciones: any = [];
  listaCalif: any;
  id_grupo: any;
  grupo: any;
  id_actividad: string = '0';
  disableBtn = true;
  disableInput = true;
  disableEdit = true;
  data: any[] = [];
  visibility = true;
  email: Correo;
  correos: any = [];
  final: boolean = false;
  constructor(private storage: StorageMap,
    private materiaService: MateriaService,
    private criterioService: CriterioService,
    private actividadService: ActividadService,
    private dataService: DataService,
    private detalleGrupoService: DetalleGrupoService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private calificacionService: CalificacionService,
    private grupoService: GrupoService,
    private emailService: EmailService) { }

  ngOnInit() {
    this.getStorage();
    this.dataService.listar$.subscribe(() => {
      this.getAlumnos();
    });
    this.dataService.criterios$.subscribe( ()=>{
      this.selectUnidad(1);
    });
  }
  private getStorage(){
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
    });
    this.storage.get('clave_materia').subscribe(materia => {
      this.getUnidades('' + materia);
    });
    this.storage.get('id_grupo').subscribe(id_grupo => {
      this.id_grupo = id_grupo;
      this.getCriterios('' + id_grupo, this.unidad);
      this.getLista();
      this.findGrupo(''+id_grupo);
      this.getCorreos();
    });
  }
  selectUnidad(value) {
    this.disableInput = true;
    this.disableBtn = true;
    this.visibility = true;
    this.unidad = value;
    this.criterio = '';
    this.id_actividad = '0';
    this.actividades = [];
    this.resetActividad();
    this.getLista();
    this.getCriterios(this.id_grupo, this.unidad);
  }
  selectCriterio(event) {
    this.disableInput = true;
    this.visibility = true;
    this.disableBtn = true
    this.criterio = event.value;
    this.id_actividad = '0';
    this.resetActividad();
    this.getLista();
    this.getActividades(this.id_grupo, this.unidad, this.criterio);
  }
  showDescripcion(event) {
    this.disableInput = false;
    this.disableBtn = false;
    this.id_actividad = event.value;
    this.actividad = this.findActivity(this.id_actividad);
    this.getLista();
  }
  registrarCalificaciones(opcion){
    this.visibility = false;
    this.calificaciones = [];
    this.createCalificacion(this.data, this.id_actividad, opcion);
  }
  validateCalificaciones(opcion) {
    this.calificaciones = [];
    this.final = true;
    let total = this.recorrerCalif(this.data);
    if (total == 0) {
      this.visibility = false;
      this.createCalificacion(this.data, this.id_actividad, opcion);
    }else{
      if (total == this.data.length) {
        this.openAlert('Todos los registros se guardarán con calificación de cero, ¿Desea continúar?', opcion);
      }else{
        this.openAlert(`Hay ${total} de estudiantes con calificación de cero, ¿Desea continúar?`, opcion);
      }
    }
  }
  private getCorreos() {
    this.correos = [];
    this.detalleGrupoService.getEstudiantes(this.clave_profesor, this.id_grupo, "0").subscribe(
      res => {
        this.correos = res;
      }
    );
  }
  private findGrupo(id_grupo: string){
    this.grupoService.findGrupo(id_grupo).subscribe(
      res =>{
        this.grupo = res[0];
      }
    );
  }
  private crearEmail(email: string) {
    this.email = {
      email: email,
      asunto: "Actualización de calificaciones",
      mensaje: `Se han actualizado calificaciones del grupo ${this.grupo.clave_grupo} de la materia ${this.grupo.nombre_materia} en la unidad ${this.unidad}`
    }
  }
  private getLista(){
    this.calificacionService.getCalificacionesByActividad(this.id_actividad).subscribe(
      res =>{
        this.calificaciones = res
        if (this.calificaciones.length != 0) {
          this.generateData(this.calificaciones);
          this.visibility = false;
        }else{ 
          this.getAlumnos();
          this.visibility = true;
        }
      }
    );
  }
  private recorrerCalif(calificaciones: any[]){
    let cont = 0;
    calificaciones.forEach(element => {
      let calif = this.convertCalificacion(element);
      if (calif == 0) {
        cont ++;
      }
    });
    return cont;
  }
  private createCalificacion(data: any, id_actividad: string, opcion: string){
    let cont = 0;
    data.forEach(element => {
      let calif = this.convertCalificacion(element);
      let calificacion = {
        num_control: element.num_control,
        id_actividad: id_actividad,
        calificacion: calif
      }
      this.calificaciones.push(calificacion);
      cont ++;
    });
    if (cont == this.calificaciones.length && opcion == 'save') {
      this.saveCalificaciones(this.calificaciones);
    }
    if (cont == this.calificaciones.length && opcion == 'update') {
      this.updateCalificaciones(this.calificaciones);
    }
  }
  private saveCalificaciones(calificaciones: Calificacion[]){
    let cont = 0;
    calificaciones.forEach(element => {
      this.calificacionService.createCalificacion(element).subscribe(
        res =>{
          cont++;
          if (cont == calificaciones.length) {
            this.openSnackBar('Registro exitoso');
          }
        }
      );
    });
  }
  private updateCalificaciones(calificaciones: Calificacion[]){
    let cont = 0;
    calificaciones.forEach(element => {
      this.calificacionService.updateCalificacion(element).subscribe(
        res =>{
          cont++;
          if (cont == calificaciones.length) {
            this.openSnackBar('Actualización exitosa');
            if (this.final) {
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
            }
          }
        }
      );
    });
  }
  private findActivity(id_actividad: string){
    let obj = null;
    this.actividades.forEach(element => {
      if (element.id_actividad == id_actividad) {
        obj = element;
      }
    });
    return obj;
  }
  private getActividades(id_grupo: string, unidad: number, id_criterio: string) {
    this.actividadService.getActividadesByGrupo(id_grupo, unidad, id_criterio).subscribe(
      res => {
        this.actividades = res;
      }
    );
  }
  private getCriterios(id_grupo: string, unidad: number) {
    this.criterioService.getCriteriosByUnidad(id_grupo, unidad).subscribe(
      res => {
        this.criterios = res;
      }
    );
  }
  private getUnidades(materia: string) {
    this.materiaService.getMateria(materia).subscribe(
      res => {
        let materia = res[0];
        for (let index = 0; index < materia.unidades; index++) {
          this.unidades.push(index + 1);
        }
      }
    );
  }
  private getAlumnos() {
    this.detalleGrupoService.getEstudiantes(this.clave_profesor, this.id_grupo, '0').subscribe(
      res => {
        this.alumnos = res;
        this.generateData(this.alumnos);
      }
    );
  }
  private generateData(array: any) {
    this.data = [];
    array.forEach(element => {
      let obj = {
        num_control: element.num_control,
        nombre_est: element.nombre_est,
        calificacion: element.calificacion
      }
      this.data.push(obj);
    });
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
  }
  private resetActividad(){
    this.actividad= {
      descripcion: null,
      id_criterio: null,
      nombre_actividad: null,
      valor: null
    }
  }
  private openSnackBar(message: string) {
    let snackBarRef = this._snackBar.open(message, '', { duration: 2000, verticalPosition: 'top' });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
  private openAlert(mensaje: string, opcion: string) {
    this.dialog.open(DialogConfirmComponent, { 
      width: '400px',
      data: mensaje }
      )
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.visibility = false;
          this.createCalificacion(this.data, this.id_actividad, opcion);
        }
      });
  }
  private convertCalificacion(element: any){
    let calif = 0;
    if (element.calificacion != null && element.calificacion != '') {
      calif = parseInt(element.calificacion);
      calif = calif > 100? 100: calif; 
    }
    return calif;
  }
  validar() {
    if (this.selectActividadControl.valid 
      && this.selectCriterioControl.valid) {
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
  validaCantidad(event){
    let valor = parseInt(event.value)
    if (valor > 100) {
      event.value = 100;
    }
  }
}
