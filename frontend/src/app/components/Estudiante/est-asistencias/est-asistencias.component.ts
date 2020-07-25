import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { GrupoService } from 'src/app/services/grupo/grupo.service';
import { EstudianteService } from 'src/app/services/estudiante/estudiante.service';
import { AsistenciaService } from 'src/app/services/asistencia/asistencia.service';

@Component({
  selector: 'app-est-asistencias',
  templateUrl: './est-asistencias.component.html',
  styleUrls: ['./est-asistencias.component.css']
})
export class EstAsistenciasComponent implements OnInit {
  meses: string[] = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  num_control: any;
  // estudiante: any;
  id_grupo: any;
  unidad: number = 1;
  unidades: number[] = [];
  displayedColumns: string[] = ['fecha', 'estado'];
  dataSource: any = [];
  periodo: string = '';
  constructor(private storage: StorageMap,
    private grupoService: GrupoService,
    private asistenciaService: AsistenciaService) { }

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
    this.dataSource = [];
    this.getAsistencias(this.id_grupo, this.unidad, this.num_control);
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
  private getAsistencias(id_grupo: string, unidad: number, num_control: number){
    this.asistenciaService.getAsistenciasByEstudiante(id_grupo, unidad, num_control).subscribe(
      res =>{
        let array: any = res;
        let cont = 0;
        array.forEach(element => {
          let obj = {
            fecha: this.convertFecha(element.fecha),
            estado: element.asistencia == true? 'A':'F' 
          }
          this.dataSource.push(obj);
          cont ++;
          if (cont == array.length) {
            // console.log(this.dataSource);
            this.setPeriodo(element.fecha);
          }
        });
      }
    );
  }
  private convertFecha(fecha: string){
    let array = fecha.split('-');
    let date: string;
    if (array[1] != undefined) {
      let mes = parseInt(array[1])
      date = this.dateWithCero(array[0])+'/'+this.meses[mes-1]+'/'+array[2];
      return date;
    }else{
      date = array[0];
    }
  }
  private dateWithCero(date: string){
    let dia = parseInt(date);
    if (dia < 10) {
      return '0'+dia;
    }
    return dia;
  }
  private setPeriodo(fecha: string){
    let array = fecha.split('-');
    let mes = parseInt(array[1])
    if (mes < 7) {
      this.periodo = 'ENE-JUN/'+array[2];
    }else{
      this.periodo = 'AGO-DIC/'+array[2];
    }
  }
}
