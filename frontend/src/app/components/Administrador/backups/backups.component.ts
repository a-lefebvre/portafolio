import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import { GrupoService } from 'src/app/services/grupo/grupo.service';
import { DetalleGrupoService } from 'src/app/services/detalle-grupo/detalle-grupo.service';
import { ReporteService } from 'src/app/services/reporte/reporte.service';
import { MateriaService } from 'src/app/services/materia/materia.service';

@Component({
  selector: 'app-backups',
  templateUrl: './backups.component.html',
  styleUrls: ['./backups.component.css']
})
export class BackupsComponent implements OnInit {
  lapso: boolean = false;
  profesores: any;
  constructor(private profesorService: ProfesorService,
    private grupoService: GrupoService,
    private detalleGrupoService: DetalleGrupoService,
    private reporteService: ReporteService,
    private materiaService: MateriaService) { }

  ngOnInit(): void {
    this.getProfesores();
  }
  private getProfesores(){
    this.profesorService.getProfesores().subscribe(
      res =>{
        this.profesores = res;
        console.log(this.profesores);
        this.profesores.forEach(element => {
          
        });
      }
    );
  }
  private getMateriasOfProfesor(profesor: any){
    let materias: any = [];
  }
  createReportes(){
    this.lapso = true;
  }
}
