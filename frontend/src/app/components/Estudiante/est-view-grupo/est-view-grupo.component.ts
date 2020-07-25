import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { StorageMap } from '@ngx-pwa/local-storage';
import { GrupoService } from 'src/app/services/grupo/grupo.service';

@Component({
  selector: 'app-est-view-grupo',
  templateUrl: './est-view-grupo.component.html',
  styleUrls: ['./est-view-grupo.component.css']
})
export class EstViewGrupoComponent implements OnInit {
  grupo: any = {
    nombre_materia: '',
    clave_grupo: ''
  }
  constructor(public dialogRef: MatDialogRef<EstViewGrupoComponent>,
    private storage: StorageMap,
    private grupoService: GrupoService) { }
    ngOnInit() {
      this.getStorage();
    }
    private getStorage(){
      this.storage.get('id_grupo').subscribe((id_grupo) => {
        this.grupoService.findGrupo(''+id_grupo).subscribe(
          res =>{
            this.grupo = res[0];
          }
        );
      });
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
