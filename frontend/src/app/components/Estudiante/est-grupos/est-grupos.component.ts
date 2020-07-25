import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { GrupoService } from 'src/app/services/grupo/grupo.service';
import { EstViewGrupoComponent } from '../est-view-grupo/est-view-grupo.component';

@Component({
  selector: 'app-est-grupos',
  templateUrl: './est-grupos.component.html',
  styleUrls: ['./est-grupos.component.css']
})
export class EstGruposComponent implements OnInit {
  mode = new FormControl('over');
  num_control: any;
  grupos: any;
  constructor(private storage: StorageMap,
    public dialog: MatDialog,
    private grupoService: GrupoService) { }

  ngOnInit() {
    this.getStorage();
  }

  private getStorage(){
    this.storage.get('numero_control').subscribe((control) => {
      this.num_control = control;
      this.grupoService.getMateriasByEstudiante(this.num_control).subscribe(
        res => {
          this.grupos = res;
        }
      );
    });
  }
  openDialog(boton): void {
    let id_grupo = boton.id;
    let clave_materia = boton.name;
    this.storage.set('clave_materia', clave_materia).subscribe(() => { });
    this.storage.set('id_grupo', id_grupo).subscribe(() => {});
    const dialogRef = this.dialog.open(EstViewGrupoComponent, {
      height: '600px',
      width: '800px',
      panelClass: 'dialog-custom',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.storage.delete('id_grupo').subscribe(() => { });
      this.storage.delete('clave_materia').subscribe(() => { });
      console.log('The dialog was closed');
    });
  }
}
