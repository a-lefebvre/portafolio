import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { DetalleGrupoService } from 'src/app/services/detalle-grupo/detalle-grupo.service';
import { DataService } from 'src/app/services/data/data.service';
import { MatTableDataSource, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MateriaService } from 'src/app/services/materia/materia.service';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { AsistenciaService } from 'src/app/services/asistencia/asistencia.service';
import { CalificacionService } from 'src/app/services/calificacion/calificacion.service';

@Component({
  selector: 'app-lista-asistencia',
  templateUrl: './lista-asistencia.component.html',
  styleUrls: ['./lista-asistencia.component.css']
})
export class ListaAsistenciaComponent implements OnInit {
  displayedColumns: string[] = ['delete', 'num_control', 'nombre_est', 'select'];
  meses: string[] = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  selection = new SelectionModel<any>(true, []);
  dataSource: any = new MatTableDataSource();
  id_grupo: any;
  clave_profesor: any;
  alumnos: any = [];
  unidad: number = 1;
  unidades: number[] = [];
  data: any[] = [];
  columnas: any[] = [];
  fecha: string = '';
  fechaLetra: string = '';
  lista: any;
  visibilityBtn = false;
  existente: any;
  day: number;
  num_control: string = '';
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private storage: StorageMap,
    private detalleGrupoService: DetalleGrupoService,
    private dataService: DataService,
    private materiaService: MateriaService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private asistenciaService: AsistenciaService,
    private calificacionService: CalificacionService) { }

  ngOnInit() {
    this.getDataStorage();
    this.dataService.listar$.subscribe(() => {
      this.getAlumnos();
    });
    let date = new Date();
    this.fechaLetra += date.getDate()+"-"+this.meses[date.getMonth()]+"-"+date.getFullYear();
    this.fecha += date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    this.existeRegistro(this.fecha, this.id_grupo);
  }
  private getDataStorage(){
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
    });
    this.storage.get('id_grupo').subscribe((id_grupo) => {
      this.id_grupo = id_grupo;
      this.getLista();
    });
    this.storage.get('clave_materia').subscribe((materia) => {
      this.getUnidades(''+materia);
    });
  }
  deleteEstudiante(){
    if (this.num_control != '') {
      this.hasASistencias(this.num_control, this.id_grupo);
    }else{
      this.openSnackBar('Seleccione al menos un alumno', 2000);
    }
  }
  desMarck(){
    this.selection.clear();
  }
  saveAsistencia(){
    this.lista = [];
    let cont = 0;
    if (this.existente != undefined) {
      this.openSnackBar(`Ya tienes registradas asistencias en la unidad ${this.existente.num_unidad}`, 3000);
    }else{
      if (this.selection.selected.length == 0) {
        this.openAlert('¿Esta seguro que desea guardar su lista con todos sus registros en falta?', 'save');
      }else{
        this.alumnos.forEach(element => {
          if (this.existInArray(this.selection.selected, element.id_detalle)) {
            this.createLista(element.id_detalle, this.fecha, true, this.unidad);
          }else{
            this.createLista(element.id_detalle, this.fecha, false, this.unidad);
          }
          cont++;
        })
        if (cont == this.alumnos.length) {
          this.registrarAsistencia(this.lista);
          this.openSnackBar('Se registro asistencia con exito.', 2000);
          this.visibilityBtn = false;
        }
      }
    }
  }
  existeRegistro(fecha: string, id_grupo: string){
    this.asistenciaService.getFecha(fecha, id_grupo).subscribe(
      res =>{
        this.existente = res[0];
      }
    );
  }
  updateAsistencia(){
    this.lista = [];
    let cont =0;
    if (this.selection.selected.length == 0) {
      this.openAlert('¿Esta seguro que desea actualizar su lista con todos sus registros en falta?', 'update');
    }else{
      this.alumnos.forEach(element => {
        if (this.existInArray(this.selection.selected, element.id_detalle)) {
          this.createLista(element.id_detalle, this.fecha, true, this.unidad);
        }else{
          this.createLista(element.id_detalle, this.fecha, false, this.unidad);
        }
        cont++;
      })
      if (cont == this.alumnos.length) {
        this.actualizarAistencia(this.lista);
        this.openSnackBar('Se actualizo lista de asistencia con exito.', 2000);
      }
    }
  }
  getLista(){
    this.existeRegistro(this.fecha, this.id_grupo);
    this.selection = new SelectionModel<any>(true, []);
    this.asistenciaService.getListaActual(this.id_grupo, this.fecha, this.unidad).subscribe(
      res => {
        this.lista= res;
        this.dataSource = new MatTableDataSource(this.lista);
        this.dataSource.sort = this.sort;
        if (this.lista.length == 0) {
          this.visibilityBtn = true;
          this.getAlumnos();
        }else{
          this.lista.forEach(element => {
            if (element.asistencia) {
              this.selection.toggle(element);
            }
          });
          this.visibilityBtn = false;
          this.getAlumnosOp();
        }
      },
      err =>{
        console.log(err);
      }
  );
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  validaDay(opcion: string){
    let f = this.fecha.split('-');
    let date = f[1] + ' ' + f[0] + ', ' + f[2] + ' GMT-6';
    let day = new Date(date);
    this.day = day.getUTCDay();
    if (this.day == 0 || this.day == 6) {
      this.validateDay('Realmente desea registra asistencia de fin de semana?', opcion);
    }else{
      this.saveAsistencia();
    }
  }
  private hasASistencias(alumno: any, id_grupo: string){
    this.getAsistencias(alumno, id_grupo);
  }
  private registrarAsistencia(lista: any){
    lista.forEach(element => {
      this.asistenciaService.createAsistencia(element).subscribe();
    });
  }
  private actualizarAistencia(lista: any){
    lista.forEach(element => {
      this.asistenciaService.updateAsistencia(element).subscribe();
    }); 
  }
  private getAlumnosOp(){
    this.detalleGrupoService.getEstudiantes(this.clave_profesor, this.id_grupo, '0').subscribe(
      res => {
        this.alumnos = res;
      }
    );
  }
  private getAlumnos() {
    this.detalleGrupoService.getEstudiantes(this.clave_profesor, this.id_grupo, '0').subscribe(
      res => {
        this.alumnos = res;
        this.dataSource = new MatTableDataSource(this.alumnos);
        this.dataSource.sort = this.sort;
      }
    );
  }
  private createLista(id_detalle: string, fecha: string, asistencia: boolean, unidad: number){
    let registro = {
      id_detalle: id_detalle,
      fecha: fecha,
      asistencia: asistencia,
      num_unidad: unidad
    }
    this.lista.push(registro);
  }
  private getUnidades(materia){
    this.materiaService.getMateria(materia).subscribe(
      res => {
        let materia = res[0];
        for (let index = 0; index < materia.unidades; index++) {
          this.unidades.push(index + 1);
        }
      }
    );
  }
  private openAlert(mensaje: string, opcion: string) {
    this.dialog.open(DialogConfirmComponent, { 
      width: '400px',
      data: mensaje }
      )
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          let cont = 0;
          this.alumnos.forEach(element => {
            this.createLista(element.id_detalle, this.fecha, false, this.unidad);
            cont++
          });
          if (cont == this.alumnos.length && opcion == 'save') {
            this.registrarAsistencia(this.lista);
            this.openSnackBar('Se registro asistencia con exito.', 2000);
          }
          if (cont == this.alumnos.length && opcion == 'update') {
            this.actualizarAistencia(this.lista);
            this.openSnackBar('Se actualizo lista de asistencia con exito.', 2000);
          }
        }
      });
  }
  private existInArray(arr, item) {
    let flag = false;
    arr.forEach(element => {
      if (element.id_detalle == item) {
        flag = true;
      }
    });
    return flag;
  }
  private openSnackBar(message: string, duration: number) {
    let snackBarRef = this._snackBar.open(message, '', { duration: duration });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
  private validateDay(mensaje: string, opcion: string){
    this.dialog.open(DialogConfirmComponent, { 
      width: '400px',
      data: mensaje }
      )
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          if (opcion == 'save') {
            this.saveAsistencia();
          }
          if (opcion == 'update') {
            this.updateAsistencia();
          }
        }
      });
  }
  private getAsistencias(alumno: any, id_grupo: string){
    this.asistenciaService.getAsistenciasByIdDetalle(alumno.id_detalle).subscribe(
      res =>{
        let asistencias: any = res;
        if (asistencias.length != 0) {
          this.openSnackBar('No se puede eliminar porque ya tiene asistencias previas registradas', 4000);
        }else{
          this.getCalificaciones(alumno, id_grupo);
        }
      }
    );
  }
  private getCalificaciones(alumno: any, id_grupo: string){
    this.calificacionService.getCalificacionesByNumControl(alumno.num_control, id_grupo).subscribe(
      res =>{
        let calif: any = res;
        if (calif.length != 0) {
          this.openSnackBar('No se puede eliminar porque ya tiene calificaciones previas registradas', 4000);
        }else{
          this.detalleGrupoService.getEstudiante(this.id_grupo, alumno.num_control).subscribe(
            res =>{
              let est = res[0];
              console.log(est);
              this.detalleGrupoService.deleteEstudiante(est.id_detalle).subscribe(
                res =>{
                  this.openSnackBar(res['text'], 2000);
                  this.dataService.listar$.emit();
                }
              );
            }
          );
        }
      }
    );
  }
}
