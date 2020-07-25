import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { GrupoService } from 'src/app/services/grupo/grupo.service';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { DetalleGrupoService } from 'src/app/services/detalle-grupo/detalle-grupo.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-listar-grupos',
  templateUrl: './listar-grupos.component.html',
  styleUrls: ['./listar-grupos.component.css']
})
export class ListarGruposComponent implements OnInit {
  displayedColumns: string[] = ['select','clave_profesor', 'profesor', 'nombre_materia', 'clave_grupo'];
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  grupos: any = new MatTableDataSource();
  id_grupo: string = '';
  constructor(private profesorService: ProfesorService,
    private _snackBar: MatSnackBar,
    private grupoService: GrupoService,
    private dialog: MatDialog,
    private detalleGrupoService: DetalleGrupoService,
    private dataService: DataService) { }

  ngOnInit() {
    this.loadGrupos();
    this.dataService.listar_grupos$.subscribe( ()=>{
      this.loadGrupos();
    });
  }
  deleteGrupo(){
    console.log(this.id_grupo);
    // let toDelete = this.selection.selected;
    let toDelete = this.id_grupo != '' ? [this.id_grupo]: [];
    if (toDelete.length != 0) {
      if (toDelete.length == 1) {
        this.openAlert(`¿Esta seguro que desea dar de baja ${toDelete.length} grupo?`, toDelete);
      }else{
        this.openAlert(`¿Esta seguro que desea dar de baja ${toDelete.length} grupos?`, toDelete);
      }
    }else{
      this.openSnackBar('Seleccione al menos un grupo.');
    }
  }
  private loadGrupos(){
    this.profesorService.getProfesoresWithGrupos().subscribe(
      res =>{
        this.grupos = res;
        this.grupos = new MatTableDataSource(this.grupos);
        this.grupos.sort = this.sort;
        this.selection = new SelectionModel<any>(true, []);
      }
    );
  }
  private openAlert(mensaje: string, toDelete: any) {
    this.dialog.open(DialogConfirmComponent, { 
      width: '400px',
      data: mensaje }
      )
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          toDelete.forEach(element => {
            this.getEstudiantes(element);
          });
        }
      });
  }
  private getEstudiantes(element){
    this.detalleGrupoService.getEstudiantes(element.clave_profesor, element.id_grupo, element.clave_materia).subscribe(
      res =>{
        let estudiantes: any = res;
        if (estudiantes.length != 0) {
          this.openSnackBar('No se puede borrar grupo porque tiene alumnos registrados.')
        }else{
          this.grupoService.deleteGrupo(element.id_grupo).subscribe(
            res =>{
              this.openSnackBar(res['text']);
              this.dataService.listar_grupos$.emit();
              this.loadGrupos();
            }
          );
        }
      }
    );
  }
  applyFilter(filterValue: string) {
    this.grupos.filter = filterValue.trim().toLowerCase();
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.grupos.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.grupos.data.forEach(row => this.selection.select(row));
  }
  checkboxLabel(row?: any): string {
    if (this.selection.selected.length > 1) {
      let obj = this.selection.selected[0];
      this.selection.toggle(obj);
    }
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  private openSnackBar(message: string) {
    let snackBarRef = this._snackBar.open(message, '', { duration: 2000, verticalPosition: 'top' });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
}
