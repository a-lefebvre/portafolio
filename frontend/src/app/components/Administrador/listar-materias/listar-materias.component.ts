import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { MateriaService } from 'src/app/services/materia/materia.service';
import { DataService } from 'src/app/services/data/data.service';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { GrupoService } from 'src/app/services/grupo/grupo.service';

@Component({
  selector: 'app-listar-materias',
  templateUrl: './listar-materias.component.html',
  styleUrls: ['./listar-materias.component.css']
})
export class ListarMateriasComponent implements OnInit {
  displayedColumns: string[] = ['select', 'clave_materia', 'nombre_materia', 'unidades'];
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  materias: any = new MatTableDataSource();
  clave_materia: string = '';
  constructor(private materiaService: MateriaService,
    private dataService: DataService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private grupoService: GrupoService) { }
  ngOnInit() {
    this.getMaterias();
    this.dataService.listar_materia$.subscribe(() => {
      this.getMaterias();
    });
  }
  deleteMateria() {
    let toDelete = [];
    if (this.clave_materia != "") {
      toDelete = [this.clave_materia];
    }
    console.log(toDelete);
    if (toDelete.length != 0) {
      this.validateDelete(toDelete);
    } else {
      this.openSnackBar('Seleccione al menos una materia.', 2000);
    }
  }
  private getMaterias() {
    this.selection = new SelectionModel<any>(true, []);
    this.materiaService.getMaterias().subscribe(
      res => {
        this.materias = res;
        this.materias = new MatTableDataSource(this.materias);
        this.materias.sort = this.sort;
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
            this.materiaService.deleteMateria(element.clave_materia).subscribe();
            cont ++;
          });
          if (cont == toDelete.length) {
            this.openSnackBar(`Se elimnó ${cont} materia.`, 2000);
            this.dataService.listar_materia$.emit();
          }
        }
      });
  }
  private validateDelete(toDelete: any) {
    this.grupoService.getAllGrupos().subscribe(
      res => {
        let array: any = res;
        if (this.existInArray(array, toDelete[0].clave_materia)) {
          this.openSnackBar('No se puede eliminar la materia porque esta siendo usada.', 3000);
        }else{
          this.openAlert(`¿Esta seguro que desea eliminar ${toDelete.length} materia?`, toDelete);
        }
      }
    );
  }
  private existInArray(array: any, item: string){
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (element.clave_materia == item) {
        return true;
      }
    }
    return false;
  }
  private openSnackBar(message: string, duration: number) {
    let snackBarRef = this._snackBar.open(message, '', { duration: duration, verticalPosition: 'top' });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
}
