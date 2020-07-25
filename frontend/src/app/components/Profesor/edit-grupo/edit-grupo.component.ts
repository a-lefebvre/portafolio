import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { StorageMap } from '@ngx-pwa/local-storage';
import { GrupoService } from 'src/app/services/grupo/grupo.service';
@Component({
  selector: 'app-edit-grupo',
  templateUrl: './edit-grupo.component.html',
  styleUrls: ['./edit-grupo.component.css']
})
export class EditGrupoComponent implements OnInit {
  checked: boolean = false;
  grupo: any = {
    nombre_materia: '',
    clave_grupo: ''
  }
  constructor(public dialogRef: MatDialogRef<EditGrupoComponent>,
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
  cambiar(){
    this.checked = !this.checked;
  }
  click(){
    this.dialogRef.close();
  }
  key(event){
    if (event.key == 'Escape') {
      this.dialogRef.close();
    }
  }
  prueba(event){
    console.log(event);
  }
}
