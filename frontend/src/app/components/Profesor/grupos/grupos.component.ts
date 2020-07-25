import { Component, OnInit } from '@angular/core';
import { GrupoService } from '../../../services/grupo/grupo.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditGrupoComponent } from '../edit-grupo/edit-grupo.component';
import { DataService } from 'src/app/services/data/data.service';
import { FormControl } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {
  mode = new FormControl('over');
  grupos: any = [];
  materias: any = [];
  clave_profesor: any;
  clave_grupo: string;
  clave_materia: string;
  id_grupo:number;
  constructor(private grupoService: GrupoService, 
    private storage: StorageMap, private router: Router,
    public dialog: MatDialog) {
  }

  openDialog(boton): void {
    this.id_grupo = boton.id;
    this.clave_materia = boton.name;
    this.storage.set('clave_materia', this.clave_materia).subscribe(() => { });
    this.storage.set('id_grupo', this.id_grupo).subscribe(() => {});
    const dialogRef = this.dialog.open(EditGrupoComponent, {
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

  ngOnInit() {
    this.getStorage();
  }
  private getStorage(){
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
      this.grupoService.getMaterias(this.clave_profesor).subscribe(
        res => {
          this.grupos = res;
          this.eliminarDuplicados();
        }
      );
    });
  }
  private eliminarDuplicados() {
    this.grupos.forEach(grupo => {
      if (!this.existe(grupo.clave_materia)) {
        this.materias.push(grupo);
      }
    });
  }
  private existe(clave_materia: string) {
    for (let index = 0; index < this.materias.length; index++) {
      if (clave_materia == this.materias[index].clave_materia) {
        return true;
      }
    }
    return false;
  }
}
