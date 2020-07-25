import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { CriterioService } from 'src/app/services/criterio/criterio.service';
import { GrupoService } from 'src/app/services/grupo/grupo.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-est-criterios',
  templateUrl: './est-criterios.component.html',
  styleUrls: ['./est-criterios.component.css']
})
export class EstCriteriosComponent implements OnInit {
  num_control: any;
  estudiante: any;
  id_grupo: any;
  unidad: number = 1;
  unidades: number[] = [];
  displayedColumns: string[] = ['select', 'nombre_criterio', 'porcentaje'];
  dataSource: any = [];
  data: any = [];
  selection = new SelectionModel<any>(true, []);
  constructor(private storage: StorageMap,
    private grupoService: GrupoService,
    private criterioService: CriterioService,
    private dataService: DataService) { }

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
    this.dataService.listar_actividades$.emit(null);
    this.data = [];
    this.getCriterios(this.id_grupo, this.unidad);
  }
  getSeleccionado(){
    if (this.selection.selected.length > 1) {
      let obj = this.selection.selected[0];
      this.selection.toggle(obj);
    }
    let criterio = this.selection.selected[0];
    this.dataService.listar_actividades$.emit(criterio);
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
  private getCriterios(id_grupo: string, unidad: number){
    this.criterioService.getCriteriosByUnidad(id_grupo, unidad).subscribe(
      res =>{
        this.data = res;
        this.dataSource = new MatTableDataSource<any>(this.data);
      }
    );
  }  
  getTotalPorcentaje() {
    return this.data.map(t => t.porcentaje).reduce((acc, value) => acc + value, 0);
  }
}
