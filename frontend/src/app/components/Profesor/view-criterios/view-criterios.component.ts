import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { DataService } from 'src/app/services/data/data.service';
import { CriterioService } from 'src/app/services/criterio/criterio.service';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { AddActividadComponent } from '../add-actividad/add-actividad.component';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { ViewActividadesComponent } from '../view-actividades/view-actividades.component';
import { ActividadService } from 'src/app/services/actividad/actividad.service';
import { Actividad } from 'src/app/models/actividad';

@Component({
  selector: 'app-view-criterios',
  templateUrl: './view-criterios.component.html',
  styleUrls: ['./view-criterios.component.css']
})
export class ViewCriteriosComponent implements OnInit {
  displayedColumns = ['nombre', 'porcentaje', 'opciones'];
  criterios: any;
  unidad: number = 1;
  actividades: any = [];
  constructor(private storage: StorageMap,
    private dataService: DataService,
    private criterioService: CriterioService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ViewCriteriosComponent>,
    private _snackBar: MatSnackBar,
    private actividadService: ActividadService) {
    this.loadCriterios();
  }

  ngOnInit() {
    this.criterios = [];
    this.dataService.criterios$.subscribe(() => {
      this.loadCriterios();
    });
    this.dataService.unidad$.subscribe(unidad => {
      this.unidad = unidad;
      this.loadCriterios();
    })
  }

  loadCriterios() {
    this.storage.get('id_grupo').subscribe((id_grupo) => {
      id_grupo = id_grupo;
      this.criterioService.getCriteriosByUnidad('' + id_grupo, this.unidad).subscribe(
        res => {
          this.criterios = res;
        }
      );
    });
  }

  addActividad(boton) {
    this._snackBar.dismiss();
    const id_criterio = boton.target.id;
    const dialogRef = this.dialog.open(AddActividadComponent, {
      height: '540px',
      width: '400px',
      data: id_criterio,
      panelClass: 'dialog-custom'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  viewActividad(boton) {
    this._snackBar.dismiss();
    const id_criterio = boton.target.id;
    const dialogRef = this.dialog.open(ViewActividadesComponent, {
      height: '500px',
      width: '400px',
      data: id_criterio,
      panelClass: 'dialog-custom'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  deleteCriterio(boton) {
    const id_criterio = boton.target.id;
    this.openDialog('¿Esta seguro que desea eliminar este criterio?', id_criterio);
    this.validarDelete(id_criterio);
  }
  validarDelete(id_criterio: string){
    this.actividadService.getActividadByCriterio(id_criterio).subscribe(
      res =>{
        this.actividades= res;
      }
    );
  }
  private openDialog(mensaje: string, id_criterio: string){
    this.dialog.open(DialogConfirmComponent, { 
      width: '400px',
      data: mensaje }
      )
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          if (this.actividades.length != 0) {
            this.openSnackBar('No se pudo eliminar criterio porque tiene actividades creadas, asegurate que no se estén usando las actividades antes de borrar.', 5000);
          }else{
            this.criterioService.deleteCriterio(id_criterio).subscribe(
              res => {
                this.loadCriterios();
                this.dataService.unidad$.emit( this.unidad);
                this.dataService.criterios$.emit();
              });
          }
        }
      }
      );
  }
  private openSnackBar(message: string, duration: number) {
    let snackBarRef = this._snackBar.open(message, '', { duration: duration, verticalPosition: 'bottom' });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
  getTotalPorcentaje() {
    return this.criterios.map(t => t.porcentaje).reduce((acc, value) => acc + value, 0);
  }
  click(){
    this.dialogRef.close();
  }
  key(event){
    if (event.key == 'Escape') {
      this.dialogRef.close();
    }
  }
}
