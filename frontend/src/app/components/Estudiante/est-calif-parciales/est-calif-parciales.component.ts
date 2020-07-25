import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { GrupoService } from 'src/app/services/grupo/grupo.service';
import { CriterioService } from 'src/app/services/criterio/criterio.service';
import { DataService } from 'src/app/services/data/data.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { CalificacionService } from 'src/app/services/calificacion/calificacion.service';

@Component({
  selector: 'app-est-calif-parciales',
  templateUrl: './est-calif-parciales.component.html',
  styleUrls: ['./est-calif-parciales.component.css']
})
export class EstCalifParcialesComponent implements OnInit {
  num_control: any;
  estudiante: any;
  id_grupo: any;
  unidad: number = 1;
  unidades: number[] = [];
  displayedColumns: string[] = ['select', 'nombre_criterio', 'porcentaje', 'obtenido'];
  dataSource: any = [];
  data: any = [];
  selection = new SelectionModel<any>(true, []);
  constructor(private storage: StorageMap,
    private grupoService: GrupoService,
    private dataService: DataService,
    private calificacionService: CalificacionService) { }

  ngOnInit() {
    this.getStorageData();
  }
  private getStorageData(){
    this.storage.get('id_grupo').subscribe( id_grupo =>{
      this.id_grupo = ''+id_grupo;
      this.fillUnidades(this.id_grupo);
    });
    this.storage.get('numero_control').subscribe( control =>{
      this.num_control = ''+control;
      this.createTabla();
    });
  }
  createTabla(){
    this.dataService.listar_calif$.emit(null);
    this.data = [];
    this.getCriteriosWithCalif(this.num_control, this.id_grupo, this.unidad);
  }
  getSeleccionado(){
    if (this.selection.selected.length > 1) {
      let obj = this.selection.selected[0];
      this.selection.toggle(obj);
    }
    let criterio = this.selection.selected[0];
    this.dataService.listar_calif$.emit(criterio);
  }
  private fillUnidades(id_grupo: string){
    this.unidades = [];
    this.grupoService.findGrupo(id_grupo).subscribe(
      res =>{
        let array: any = res[0];
        for (let index = 0; index < array.unidades; index++) {
          this.unidades.push(index+1);
        }
      }
    );
  }
  private getCriteriosWithCalif(num_control: number, id_grupo: string, unidad: number){
    this.calificacionService.getCalificacionesByEstudianteByUnidad(num_control, id_grupo, unidad).subscribe(
      res =>{
        this.data = res;
        let array = this.data;
        let cont  = 0;
        array.forEach(element => {
          let entero = Math.floor(element.porcentaje_obtenido);
          let num = element.porcentaje_obtenido;
          if (num % entero == 0) {
            element.porcentaje_obtenido = num+'.0';
          }
          cont ++;
          if (cont == array.length) {
            this.dataSource = new MatTableDataSource<any>(array)
          }
        });
      }
    );
  } 
  getTotalPorcentaje() {
    return this.data.map(t => t.porcentaje).reduce((acc, value) => acc + value, 0);
  }
  getTotalObtenido() {
    return this.data.map(t => parseFloat(t.porcentaje_obtenido)).reduce((acc, value) => acc + value, 0.0);
  }

}
