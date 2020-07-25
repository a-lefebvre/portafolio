import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { ActividadService } from 'src/app/services/actividad/actividad.service';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { CalificacionService } from 'src/app/services/calificacion/calificacion.service';

@Component({
  selector: 'app-view-actividades',
  templateUrl: './view-actividades.component.html',
  styleUrls: ['./view-actividades.component.css']
})
export class ViewActividadesComponent implements OnInit {
  actividades: any = [];
  calificaciones: any = [];
  disableBtnUpdate: boolean = true;
  constructor(public dialogRef: MatDialogRef<ViewActividadesComponent>,
    @Inject(MAT_DIALOG_DATA) private id_criterio: any,
    private actividadService: ActividadService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private calificacionService: CalificacionService) { }

  ngOnInit() {
    this.getActividades();
  }
  private getActividades(){
    this.actividadService.getActividadByCriterio(this.id_criterio).subscribe(
      res =>{
        this.actividades = res;
        this.getTotalPuntos();
      }
    );
  }
  updateActividad(id_actividad: string){
    let actividad = this.findInArray(id_actividad);
    if (actividad != null) {
      actividad.valor = this.convertValor(actividad.valor);
      this.actividadService.updateActividad(actividad).subscribe(
        res =>{
          this.disableBtnUpdate = true;
        }
      );
    }
  }
  private findInArray(id_actividad: string){
    let obj = null;
    this.actividades.forEach(element => {
      if (element.id_actividad == id_actividad) {
        obj = element;
      }
    });
    return obj;
  }
  deleteActividad(id_actividad: string){
    this.openDialog('¿Está seguro que desea eliminar esta actividad?', id_actividad);
    this.validarDelete(id_actividad);
  }
  private validarDelete(id_actividad: string){
    this.calificacionService.getCalificacionesByActividad(id_actividad).subscribe(
      res =>{
        this.calificaciones = res;
      }
    );
  }
  private openDialog(mensaje: string, id_actividad: string){
    this.dialog.open(DialogConfirmComponent, { 
      width: '400px',
      data: mensaje })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          if (this.calificaciones.length != 0) {
            this.openSnackBar('No se puede eliminar esta actividad porque tiene calificaciones registradas.', 3500);
          }else{
            this.actividadService.deleteActividad(id_actividad).subscribe(
              res =>{
                this.openSnackBar(res['text'], 2000);
                this.getActividades();
              }
            );
          }
        }
      }
    );
  }
  private openSnackBar(message: string, duration: number) {
    let snackBarRef = this._snackBar.open(message, '', { duration: duration });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
  getTotalPuntos(){
    return this.actividades.map(t => t.valor).reduce((acc, value) => acc + value, 0);
  }
  click(){
    this.dialogRef.close();
  }
  key(event){
    if (event.key == 'Escape') {
      this.dialogRef.close();
    }
  }
  private convertValor(numero: string){
    let calif = 0;
    if (numero != null && numero != '') {
      calif = parseInt(numero);
      calif = calif > 100? 100: calif; 
    }
    return calif;
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
