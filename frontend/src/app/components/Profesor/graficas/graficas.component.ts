import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { AsistenciaService } from 'src/app/services/asistencia/asistencia.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { GrupoService } from 'src/app/services/grupo/grupo.service';
import { CalificacionService } from 'src/app/services/calificacion/calificacion.service';
import { DetalleGrupoService } from 'src/app/services/detalle-grupo/detalle-grupo.service';
import { ReporteService } from 'src/app/services/reporte/reporte.service';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

  // -----BAR GRAFIC

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [
    { data: [], label: '' },
    { data: [], label: '' }
  ];

  // ----Line
  public lineChartLabels: Label[] = [];
  public lineChartData: ChartDataSets[] = [
    { data: [0], label: '' },
    { data: [0], label: '' }
  ];
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(0, 49, 202,0.2)',
      borderColor: 'rgba(0, 49, 202,1)',
      pointBackgroundColor: 'rgba(0, 49, 202,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0, 49, 202,0.8)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(255,0,0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,0,0,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginDataLabels];

  // ----PIE GRAFIC
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(3, 163, 49,0.5)', 'rgba(255,0,0,0.5)'],
    },
  ];

  clave_profesor: any;
  materias: any;
  materiasUnique: any;
  clave_materia: string = '';
  listaMaterias: string[] = [];
  grupos: any;
  grupo: any;
  group: string;
  clave_grupo: string = '';
  id_grupo: string;
  asistencias: number[] = [];
  faltas: number[] = [];
  asist: any;
  falts: any;
  aprobados: number[] = [];
  reprobados: number[] = [];
  aprobadosFinal: number = 0;
  reprobadosFinal: number = 0;
  alumnos: any;
  total_estudiantes: number;
  aprobPorcent = 0;
  reprobPorcent = 0;
  constructor(private asistenciaService: AsistenciaService,
    private storage: StorageMap,
    private grupoService: GrupoService,
    private calificacionService: CalificacionService,
    private detalleGrupoService: DetalleGrupoService,
    private reporteService: ReporteService) { }

  ngOnInit() {
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
      this.getMaterias(this.clave_profesor);
    });
  }
  generateGrafics(event) {
    this.resetAll()
    this.getGrupo(event.value);
  }
  private barras() {
    this.barChartData = [];
    this.getAsistencias();
    this.barChartData.push(this.fillData(this.asistencias, 'Asistencias'));
    this.barChartData.push(this.fillData(this.faltas, 'Faltas'));
  }
  private line() {
    this.lineChartData = [];
    this.getAprobados();
    this.getReprobados();
    this.lineChartData.push(this.fillData(this.aprobados, 'Aprobados'));
    this.lineChartData.push(this.fillData(this.reprobados, 'Reprobados'));
  }
  private pie() {
    this.pieChartLabels = ['Aprobados(' + this.aprobPorcent + '%)', 'Reprobados(' + this.reprobPorcent + '%)']
  }
  private getGrupo(id_grupo: string) {
    this.grupoService.findGrupo(id_grupo).subscribe(
      res => {
        this.grupo = res[0];
        this.clave_grupo = this.grupo.clave_grupo;
        this.barras();
        this.line();
        this.getAlumnos(this.clave_profesor, this.grupo.id_grupo);
      }
    );
  }
  private getAlumnos(clave_profesor: string, id_grupo: string) {
    this.detalleGrupoService.getEstudiantes(clave_profesor, id_grupo, '0').subscribe(
      res => {
        this.alumnos = res;
        this.total_estudiantes = this.alumnos.length;
        let cont = 0;
        this.alumnos.forEach(element => {
          cont++;
          this.getCalificaciones(this.clave_materia, this.clave_grupo, element.num_control, cont);
        });
      }
    );
  }
  private getCalificaciones(clave_materia: string, clave_grupo: string, num_control: any, num: number) {
    this.pieChartData = [];
    this.reporteService.getCalificacionByUnidadByEstudiante(clave_materia, clave_grupo, num_control).subscribe(
      res => {
        let calificaciones: any = res;
        let flag = false;
        let cont = 0;
        calificaciones.forEach(element => {
          cont++;
          if (element.calificacion < 70) {
            flag = true;
          }
        });
        if (cont == this.grupo.unidades) {
          if (flag) {
            this.reprobadosFinal++;
          } else {
            this.aprobadosFinal++;
          }
          if (num == this.alumnos.length) {
            this.aprobPorcent = Math.round((this.aprobadosFinal * 100) / this.alumnos.length);
            this.reprobPorcent = Math.round((this.reprobadosFinal * 100) / this.alumnos.length);
            this.pie();
            this.pieChartData.push(this.aprobadosFinal);
            this.pieChartData.push(this.reprobadosFinal);
          }
        }

      }
    );
  }
  private getAprobados() {
    this.calificacionService.getAprobadosByUnidad(this.clave_profesor, this.clave_materia, this.clave_grupo).subscribe(
      res => {
        let array: any = res;
        let lastUnidad = this.grupo.unidades;
        for (let index = 0; index < lastUnidad; index++) {
          this.lineChartLabels.push('Unidad ' + (index + 1))
          let obj = {
            num_unidad: index + 1,
            total: this.getTotal(array, index + 1)
          }
          this.aprobados.push(obj.total);
        }
      }
    );
  }
  private getReprobados() {
    this.calificacionService.getReprobadosByUnidad(this.clave_profesor, this.clave_materia, this.clave_grupo).subscribe(
      res => {
        let array: any = res;
        let lastUnidad = this.grupo.unidades;
        for (let index = 0; index < lastUnidad; index++) {
          let obj = {
            num_unidad: index + 1,
            total: this.getTotal(array, index + 1)
          }
          this.reprobados.push(obj.total);
        }
      }
    );
  }
  private getTotal(array: any, unidad: number) {
    let total = 0;
    for (let index = 0; index < array.length; index++) {
      if (array[index].num_unidad == unidad) {
        total = array[index].total;
        return total;
      }
    }
    return total;
  }
  private getAsistencias() {
    this.asistenciaService.getAsistenciaByMateriaAndGrupo(this.clave_profesor, this.clave_materia, this.clave_grupo).subscribe(
      res => {
        // let array: any  = res;
        // console.log('asistencias: ',array);
        // array.forEach(element => {
        //   this.barChartLabels.push('Unidad '+element.num_unidad);
        //   this.asistencias.push(element.total);
        //   this.faltas.push(0);
        // });
        this.asist = res;
        let cont = 0;
        this.asist.forEach(element => {
          this.barChartLabels.push('Unidad ' + element.num_unidad);
          this.asistencias.push(element.total);
          cont++;
          if (cont == this.asist.length) {
            this.getFaltas();
          }
        });
      }
    );
  }
  private getFaltas() {
    this.asistenciaService.getFaltasByMateriaAndGrupo(this.clave_profesor, this.clave_materia, this.clave_grupo).subscribe(
      res => {
        let array: any = res;
        // let cont = 0;
        // console.log('faltas: ',this.asistencias);
        // array.forEach(element => {
        //   this.faltas.push(element.total);
        //   cont ++;
        // });
        this.validateAsistencias(this.asist, array);
      }
    );
  }

  private validateAsistencias(asistencias: any[], f: any[]) {
    if (asistencias.length > f.length) {
      for (let index = 0; index < asistencias.length; index++) {
        let unidad = asistencias[index].num_unidad;
        let obj = this.findInArray(f, unidad);
        if (obj == null) {
          this.faltas.push(0);
        } else {
          let valor = obj.total;
          this.faltas.push(valor);
        }
      }
    } else {
      f.forEach(element => {
        this.faltas.push(element.total);
      });
    }
  }
  private findInArray(array: any, item: number) {
    let obj = null;
    array.forEach(element => {
      if (element.num_unidad == item) {
        obj = element;
      }
    });
    return obj;
  }
  private fillData(array: number[], label: string) {
    let obj = {
      data: array,
      label: label
    }
    return obj;
  }
  getGrupos() {
    this.clave_grupo = '';
    this.resetAll();
    this.grupoService.getGruposOfMaterias(this.clave_profesor, this.clave_materia).subscribe(
      res => {
        this.grupos = res;
      }
    );
  }
  private getMaterias(clave_profesor: string) {
    this.materiasUnique = [];
    this.grupoService.getMaterias(clave_profesor).subscribe(
      res => {
        this.materias = res;
        this.materias.forEach(element => {
          if (!this.isDuplicate(element.clave_materia)) {
            this.materiasUnique.push(element);
          }
        });
      },
      err => {
        console.log(err);
      }
    );
  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
  private isDuplicate(clave_materia: number) {
    let exist = false;
    this.materiasUnique.forEach(element => {
      if (element.clave_materia == clave_materia) {
        exist = true;
      }
    });
    return exist;
  }
  resetAll() {
    this.asistencias = [];
    this.faltas = [];
    this.aprobados = [];
    this.reprobados = [];
    this.aprobadosFinal = 0;
    this.reprobadosFinal = 0;
    this.barChartLabels = [];
    this.barChartData = [];
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.lineChartLabels = [];
    this.lineChartData = [];
  }
}
