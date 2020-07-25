import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { CalificacionService } from 'src/app/services/calificacion/calificacion.service';

@Component({
  selector: 'app-est-calif-actividades',
  templateUrl: './est-calif-actividades.component.html',
  styleUrls: ['./est-calif-actividades.component.css']
})
export class EstCalifActividadesComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'valor', 'calificacion', 'puntos'];
  num_control: any;
  id_criterio: any;
  id_grupo: any;
  unidad: any;
  actividades: any = [];
  dataSource = [];
  constructor(private dataService: DataService,
    private calificacionService: CalificacionService) { }

  ngOnInit() {
    this.dataService.listar_calif$.subscribe( criterio =>{
      if (criterio != null) {
        this.num_control = criterio.num_control
        this.id_criterio = criterio.id_criterio;
        this.id_grupo = criterio.id_grupo;
        this.unidad = criterio.num_unidad;
        this.getCalificacionesByCriterio(this.num_control, this.id_grupo, this.unidad, this.id_criterio);
      }else{
        this.actividades = [];
      }
    });
  }
  private getCalificacionesByCriterio(num_control: number, id_grupo: string, unidad: number, id_criterio: string){
    this.calificacionService.getCalificacionesByEstudianteBycriterio(num_control, id_grupo, unidad, id_criterio).subscribe(
      res =>{
        this.actividades = res;
        this.actividades.forEach(element => {
          let entero = Math.floor(element.puntos_obtenidos);
          let num = element.puntos_obtenidos;
          if (num % entero == 0) {
            element.puntos_obtenidos = num+'.0';
          }
        });
        this.dataSource = this.actividades;
      }
    );
  }
}
