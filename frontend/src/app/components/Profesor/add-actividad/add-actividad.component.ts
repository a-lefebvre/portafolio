import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { Actividad } from 'src/app/models/actividad';
import { ActividadService } from 'src/app/services/actividad/actividad.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { DetalleGrupoService } from 'src/app/services/detalle-grupo/detalle-grupo.service';
import { Correo } from 'src/app/models/correo';
import { EmailService } from 'src/app/services/correo/email.service';
import { GrupoService } from 'src/app/services/grupo/grupo.service';
import { DataService } from 'src/app/services/data/data.service';
import { FormControl, Validators } from '@angular/forms';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-add-actividad',
  templateUrl: './add-actividad.component.html',
  styleUrls: ['./add-actividad.component.css']
})
export class AddActividadComponent implements OnInit {
  id_grupo: any;
  clave_profesor: any;
  oldActividad: any;
  actividad: Actividad = {
    nombre_actividad: '',
    valor: null,
    descripcion: ''
  }
  nombreFormcontrol = new FormControl('',
    [Validators.required,
    Validators.minLength(3)]);
  valorFormcontrol = new FormControl({
    value: this.actividad.valor,
    disabled: true
  },
    [Validators.required,
    Validators.maxLength(3),
    Validators.max(100),
    Validators.pattern('[1-9]+[0-9]*')]);
  correos: any = [];
  email: Correo;
  grupo: any;
  actividades: any = [];
  disableBtn = true;
  constructor(private storage: StorageMap,
    private detalleGrupoService: DetalleGrupoService,
    private emailService: EmailService,
    private grupoService: GrupoService,
    public dialogRef: MatDialogRef<AddActividadComponent>,
    @Inject(MAT_DIALOG_DATA) private id_criterio: any,
    private actividadService: ActividadService,
    private _snackBar: MatSnackBar,
    private dataService: DataService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getStorageData();
    this.actividad.id_criterio = this.id_criterio;
    this.dataService.id_criterio$.emit();
    this.getActividades(this.id_criterio);
  }
  getStorageData() {
    this.storage.get('id_grupo').subscribe((id_grupo) => {
      this.id_grupo = id_grupo;
      this.getGrupo();
    });
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
      this.getCorreos();
    });
  }
  validarActividad() {
    let suma = parseInt(this.actividad.valor.toString()) + this.getTotalPuntos();
    if (suma > 100) {
      this.openAlert(`Se esta excediendo en ${suma - 100} puntos, ¿Esta seguro que desea continúar?`);
    } else {
      this.saveActividad()
    }

  }
  private saveActividad() {
    if (!this.validateActividad(this.oldActividad)) {
      this.actividadService.deleteActividad(this.oldActividad.id_actividad).subscribe(
        res =>{
          this.actividadService.newActividad(this.actividad).subscribe(
            res =>{
              this.openSnackBar(res['text']);
              this.getActividades(this.id_criterio);
              this.resetForm();
              this.disableBtn=true;
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
          );
        }
      );
    }else{
      this.actividadService.newActividad(this.actividad).subscribe(
        res =>{
          this.openSnackBar(res['text']);
          this.getActividades(this.id_criterio);
          this.resetForm();
          this.disableBtn=true;
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
      );
    }

    // if (this.oldActividad != undefined) {
    //   this.actividadService.deleteActividad(this.oldActividad.id_actividad).subscribe(
    //     res =>{
    //       this.actividadService.newActividad(this.actividad).subscribe(
    //         res =>{
    //           this.openSnackBar(res['text']);
    //           this.getActividades(this.id_criterio);
    //           this.resetForm();
    //           this.disableBtn=true;
    //           this.correos.forEach(element => {
    //             if (element.email_est != null) {
    //               this.crearEmail(element.email_est);
    //               this.emailService.sendEmail(this.email).subscribe(
    //                 res => {
    //                   console.log(res);
    //                 }
    //               );
    //             }
    //           });
    //         }
    //       );
    //     }
    //   );
    // } else {
    //   this.actividadService.newActividad(this.actividad).subscribe(
    //     res =>{
    //       this.openSnackBar(res['text']);
    //       this.getActividades(this.id_criterio);
    //       this.resetForm();
    //       this.disableBtn=true;
    //       this.correos.forEach(element => {
    //         if (element.email_est != null) {
    //           this.crearEmail(element.email_est);
    //           this.emailService.sendEmail(this.email).subscribe(
    //             res => {
    //               console.log(res);
    //             }
    //           );
    //         }
    //       });
    //     }
    //   );
    // }
  }
  capitaliza() {
    this.actividad.nombre_actividad = this.capitalizar(this.actividad.nombre_actividad);
    this.actividad.descripcion = this.capitalizar(this.actividad.descripcion);
  }
  private getActividades(id_criterio) {
    this.actividadService.getActividadByCriterio(id_criterio).subscribe(
      res => {
        this.actividades = res;
        if (this.actividades.length == 1) {
          this.oldActividad = this.actividades[0];
          if (!this.validateActividad(this.oldActividad)) {
            this.actividades = [];
            console.log(this.oldActividad);
          }
        } else {
          this.getTotalPuntos();
        }
      }
    );
  }
  private crearEmail(email: string) {
    this.email = {
      email: email,
      asunto: "Nueva actividad",
      mensaje: `Se ha agregado nueva actividad a la materia ${this.grupo.nombre_materia} del grupo ${this.grupo.clave_grupo}`
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
  private getGrupo() {
    this.grupoService.findGrupo(this.id_grupo).subscribe(
      res => {
        this.grupo = res[0];
      },
      err => {
        console.log(err);
      }
    );
  }
  private openSnackBar(message: string) {
    let snackBarRef = this._snackBar.open(message, '', { duration: 2000, verticalPosition: 'top' });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
  private resetForm() {
    this.actividad.descripcion = '';
    this.nombreFormcontrol.reset();
    this.nombreFormcontrol.setErrors(null);
    this.valorFormcontrol.reset();
    this.valorFormcontrol.setErrors(null);
  }
  private openAlert(mensaje: string) {
    this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: mensaje
    }
    )
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.saveActividad();
        }
      });
  }
  validarNumero(event) {
    if (event.charCode >= 48 && event.charCode <= 57) {
      return true;
    }
    return false;
  }
  validar() {
    if (this.nombreFormcontrol.valid) {
      this.valorFormcontrol.enable()
    } else {
      this.valorFormcontrol.disable();
      this.disableBtn = true;
    }
    if (this.nombreFormcontrol.valid && this.valorFormcontrol.valid) {
      this.disableBtn = false;
    } else {
      this.disableBtn = true;
    }
  }
  getTotalPuntos() {
    return this.actividades.map(t => t.valor).reduce((acc, value) => acc + value, 0);
  }
  click() {
    this.dialogRef.close();
  }
  key(event) {
    if (event.key == 'Escape') {
      this.dialogRef.close();
    }
  }
  private capitalizar(cadena: string) {
    if (cadena != '' && cadena != null) {
      return cadena.charAt(0).toUpperCase() + cadena.slice(1).toLowerCase();
    }
    return cadena;
  }
  private validateActividad(actividad: any) {
    if ((actividad.nombre_actividad == actividad.descripcion) && actividad.valor == 100) {
      return false;
    }
    return true;
  }
}
