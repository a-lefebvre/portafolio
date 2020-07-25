import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import { MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/services/data/data.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { GrupoService } from 'src/app/services/grupo/grupo.service';

@Component({
  selector: 'app-listar-profesores',
  templateUrl: './listar-profesores.component.html',
  styleUrls: ['./listar-profesores.component.css'],
})
export class ListarProfesoresComponent implements OnInit {
  displayedColumns: string[] = ['select', 'clave_profesor', 'nombre', 'apellido', 'email'];
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  profesores: any = new MatTableDataSource();
  grupos: any;
  clave_profesor: string = '';
  constructor(private profesorService: ProfesorService,
    private dataService: DataService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private grupoService: GrupoService) { }

  ngOnInit() {
    this.getProfesores();
    this.dataService.listar_profesor$.subscribe(() => {
      this.getProfesores();
    });
  }
  deleteProfesor() {
    let toDelete = [this.clave_profesor]
    if (this.clave_profesor != '') {
      this.openAlert(`¿Esta seguro que deseas eliminar ${toDelete.length} profesor?`, toDelete);
    }else{
      this.openSnackBar('Seleccione al menos un profesor.');
    }
  }
  private getProfesores() {
    this.profesorService.getProfesores().subscribe(
      res => {
        this.profesores = res;
        this.profesores = new MatTableDataSource(this.profesores);
        this.profesores.sort = this.sort;
      }
    );
  }
  private openAlert(mensaje: string, toDelete: any) {
    this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: mensaje
    }
    )
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          let cont = 0;
          toDelete.forEach(element => {
            this.getGrupos(element);
          });
        }
      });
  }
  private getGrupos(element: any){
    this.grupoService.getMaterias(element.clave_profesor).subscribe(
      res =>{
        let grupos: any = res;
        if (grupos.length != 0) {
          this.openSnackBar('No se puede eliminar profesor porque tiene registrados grupos');
        }else{
          this.profesorService.deleteProfesor(element.clave_profesor).subscribe(
            res =>{
              this.openSnackBar(res['text']);
              this.dataService.listar_profesor$.emit();
            }
          );
        }
      }
    );
  }
  private openSnackBar(message: string) {
    let snackBarRef = this._snackBar.open(message, '', { duration: 3000, verticalPosition: 'top' });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }

}
