import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';
import { StorageMap } from '@ngx-pwa/local-storage';
import { DetalleGrupoService } from 'src/app/services/detalle-grupo/detalle-grupo.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DataService } from 'src/app/services/data/data.service';
import { AsistenciaService } from 'src/app/services/asistencia/asistencia.service';

@Component({
  selector: 'app-delete-estudiante',
  templateUrl: './delete-estudiante.component.html',
  styleUrls: ['./delete-estudiante.component.css']
})
export class DeleteEstudianteComponent implements OnInit {
  displayedColumns: string[] = ['select', 'num_control', 'nombre_est'];
  selection = new SelectionModel<any>(true, []);
  clave_profesor: any;
  id_grupo: any;
  alumnos: any = [];
  dataSource: any;
  withAsistencias: any = [];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private storage: StorageMap,
    private detalleGrupoService: DetalleGrupoService,
    private dataService: DataService,
    private asistenciaService: AsistenciaService) { }

  ngOnInit(): void {
    this.getDataStorage();
    this.dataService.listar$.subscribe(() => {
      this.getAlumnos();
    });
  }
  private getDataStorage(){
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
    });
    this.storage.get('id_grupo').subscribe((id_grupo) => {
      this.id_grupo = id_grupo;
      this.getAlumnos();
    });
    this.storage.get('clave_materia').subscribe((materia) => {
    });
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
  deleteEstudiante(){
    let toDelete = this.selection.selected;
    console.log(toDelete);
    this.validateAsistencias(toDelete);
  }
  validateAsistencias(array: any){
    this.withAsistencias = [];
    let cont = 0;
    array.forEach(element => {
      this.hasAsistencia(element);
      cont ++;
      if (cont == array.length) {
        console.log(this.withAsistencias);
      }
    });
  }
  private hasAsistencia(element: any){
    this.asistenciaService.getAsistenciasByIdDetalle(element.id_detalle).subscribe(
      res =>{
        let array: any = res;
        if (array.length != 0) {
          this.withAsistencias.push(element);
        }
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
}
