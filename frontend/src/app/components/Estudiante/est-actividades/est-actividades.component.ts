import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ActividadService } from 'src/app/services/actividad/actividad.service';

@Component({
  selector: 'app-est-actividades',
  templateUrl: './est-actividades.component.html',
  styleUrls: ['./est-actividades.component.css']
})
export class EstActividadesComponent implements OnInit {
  id_grupo: string;
  unidad: number;
  id_criterio: string;
  actividades: any = [];
  constructor(private dataService: DataService,
    private storage: StorageMap,
    private actividadService: ActividadService) { }

  ngOnInit() {
    this.dataService.listar_actividades$.subscribe( criterio =>{
      if (criterio != null) {
        this.id_criterio = criterio.id_criterio;
        this.id_grupo = criterio.id_grupo;
        this.unidad = criterio.num_unidad;
        this.getActividades(this.id_grupo, this.unidad, this.id_criterio);
      }else{
        this.actividades = [];
      }
    });
  }
  private getActividades(id_grupo: string, num_unidad: number, id_criterio: string){
    this.actividadService.getActividadesByGrupo(id_grupo, num_unidad, id_criterio).subscribe(
      res =>{
        this.actividades = res;
      }
    );
  }
}
