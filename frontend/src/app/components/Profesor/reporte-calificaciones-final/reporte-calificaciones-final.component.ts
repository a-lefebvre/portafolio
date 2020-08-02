import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Img, Columns, Txt, Table, Cell } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { StorageMap } from '@ngx-pwa/local-storage';
import { ReporteService } from 'src/app/services/reporte/reporte.service';
import { GrupoService } from 'src/app/services/grupo/grupo.service';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import { Profesor } from 'src/app/models/profesor';
import { Materia } from 'src/app/models/materia';
import { MateriaService } from 'src/app/services/materia/materia.service';
import { DetalleGrupoService } from 'src/app/services/detalle-grupo/detalle-grupo.service';
import { Estudiante } from 'src/app/models/estudiante';
import { Config } from 'src/app/services/config';
import { AdministradorService } from 'src/app/services/administrador/administrador.service';

@Component({
  selector: 'app-reporte-calificaciones-final',
  templateUrl: './reporte-calificaciones-final.component.html',
  styleUrls: ['./reporte-calificaciones-final.component.css']
})
export class ReporteCalificacionesFinalComponent implements OnInit {
  columnas = ['Nº', 'Nº Control', 'Nombre', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'Promedio'];
  pdf: PdfMakeWrapper;
  clave_profesor: any;
  clave_materia: any;
  clave_grupo: any;
  materias: any = [];
  materiasUnique: any = [];
  grupo: string;
  grupos: any = [];
  id_grupo: string;
  unidades: any = [];
  alumnos: any = [];
  profesor: Profesor;
  materia: Materia;
  unidad: number = 1;
  data: any = [];
  disableBtnDownload = true;
    //---NEW FORMATO
    config: Config;
    header: string = ''
    watermark: string = '';
    footer: string = '';
    ip: string;
  constructor(private storage: StorageMap,
    private reporteService: ReporteService,
    private grupoService: GrupoService,
    private profesorService: ProfesorService,
    private materiaService: MateriaService,
    private detalleGrupoService: DetalleGrupoService,
    private adminstradorService: AdministradorService) {
      this.config = new Config();
    this.ip = this.config.getIp();
    this.initImag();
    PdfMakeWrapper.setFonts(pdfFonts);
     }

  ngOnInit() {
    this.getStorageData();
  }
  private getStorageData(){
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
      this.getProfesor(this.clave_profesor);
      this.getMaterias(this.clave_profesor);
    });
  }
  getGrupos(){
    this.unidades = [];
    this.unidad = 1;
    this.disableBtnDownload = true;
    this.grupoService.getGruposOfMaterias(this.clave_profesor, this.clave_materia).subscribe(
      res =>{
        this.grupos = res;
        this.getMateria(this.clave_materia);
      }
    );
  } 
  prepararData(event){
    this.unidades = [];
    this.unidad = 1;
    this.id_grupo=event.value;
    this.getGrupo(this.id_grupo);
  }
  private getMateria(clave_materia: string){
    this.materiaService.getMateria(clave_materia).subscribe(
      res =>{
        this.materia = res[0];
      }
    );
  }
  private getMaterias(clave_profesor: string){
    this.materiasUnique = [];
    this.grupoService.getMaterias(clave_profesor).subscribe(
      res =>{
        this.materias = res;
        this.materias.forEach(element => {
          if (!this.isDuplicate(element.clave_materia)) {
            this.materiasUnique.push(element);
          }
        });
      }
    );
  }
  private getProfesor(clave_profesor: string) {
    this.profesorService.findProfesor(clave_profesor).subscribe(
      res => {
        this.profesor = res[0];
      }
    );
  }
  private getGrupo(id_grupo: string){
    this.grupoService.findGrupo(id_grupo).subscribe(
      res =>{
        this.clave_grupo = res[0].clave_grupo;
        this.data = [];
        this.getAlumnos(this.clave_profesor, id_grupo);
      }
    );
  }
  private getAlumnos(clave_profesor: string, id_grupo: string) {
    this.detalleGrupoService.getEstudiantes(clave_profesor, id_grupo, '0').subscribe(
      res => {
        this.alumnos = res;
        let cont = 1;
        this.alumnos.forEach(element => {
          this.getCalificaciones(this.clave_materia, this.clave_grupo, element, cont);
          cont++;
        });
        if ((cont-1) == this.alumnos.length) {
          this.disableBtnDownload = false;
        }
      }
    );
  }
  private Comparator(a, b) {
    if (a[2] < b[2]) return -1;
    if (a[2] > b[2]) return 1;
    return 0;
  }
  private getCalificaciones(clave_materia: string, clave_grupo: string, alumno: any, num: number){
    this.reporteService.getCalificacionByUnidadByEstudiante(clave_materia, clave_grupo, ''+alumno.num_control).subscribe(
      res =>{
        let calificaciones:any = res;
        let row = [num, alumno.num_control, alumno.nombre_est];
        let cont = 4;
        let promedio = 0;
        let flag = false;
        calificaciones.forEach(element => {
          if (element.calificacion < 70) {
            flag = true;
          }
          promedio+= element.calificacion;
          let calif = element.calificacion < 70? Math.floor(element.calificacion) : Math.round(element.calificacion);
          row.push(calif);
          cont++
        });
          while(cont<=11){
            row.push('');
            cont ++;
          }
          if (cont == 12) {
            let prom;
            if (flag) {
              prom = 'N/A'
            }else{
              prom = Math.round(promedio/this.materia.unidades);  
            }    
            row.push(prom);
            this.data.push(row);
          }
      }
    );
  }
  private isDuplicate(clave_materia: number) {
    let exist = false;
    this.materiasUnique.forEach(element => {
      if(element.clave_materia == clave_materia){
        exist = true;
      }
    });
    return exist;
  }
  downloadPDF(){
    this.initPdf();
  }
  async initPdf(){
    this.pdf = new PdfMakeWrapper();
    this.pdf.pageSize('letter');
    this.pdf.pageOrientation('portrait');
    this.pdf.pageMargins([30, 100, 30, 80]);
    await this.setHeader();
        // ---NEW FORMATO
        await this.setFooter();
        await this.setWatermark();
        // ---
    this.createFormulario();
    this.data.sort(this.Comparator);
    this.data.unshift(this.columnas);
    this.setTable(this.data);
    let date = new Date();
    let fecha = ''+date.getDate()+(date.getMonth()+1)+date.getFullYear();
    // this.pdf.create().download('CalificacionesFinales-'+fecha);
    this.pdf.create().open();
  }

  private setTable(data: any){
    let matriz: any = [];
    for (let x = 0; x < data.length; x++) {
      let row = data[x];
      let fila = [];
      for (let y = 0; y < row.length; y++) {
        if (y == 0 || y == row.length-1) {
          fila.push(new Cell(new Txt(row[y]).alignment('center').end).end);
        }else{
          fila.push(new Txt(row[y]).end);
        }
      }
      matriz.push(fila);
    }
    let tabla = new Table(matriz).fontSize(10).end;
    this.pdf.add(tabla);
  }
  private createFormulario(){
    let nombre = new Txt('MATERIA: ').fontSize(12).end;
    let name = new Txt(`${this.materia.nombre_materia}`).fontSize(12).bold().end;
    let maestro = new Txt('PROFESOR: ').fontSize(12).end;
    let teacher =  new Txt(`${this.profesor.apellido} ${this.profesor.nombre}`).fontSize(12).bold().end;
    let izquierda = new Table([
      [nombre, name],
      [maestro, teacher]
    ]).layout('noBorders').end;

    let grupo = new Txt('GRUPO: ').fontSize(12).end;
    let group = new Txt(`${this.clave_grupo}`).bold().fontSize(12).end;
    let unidad = new Txt('PERIODO: ').fontSize(12).end;
    let date = new Date();
    let mes = date.getMonth()+1;
    let anio = date.getFullYear();
    let periodo: any;
    if (mes <=7) {
      periodo = new Txt(`ENE-JUN/${anio}`).bold().fontSize(12).end;
    }else{
      periodo = new Txt(`AGO-DIC/${anio}`).bold().fontSize(12).end;
    }
    let derecha =  new Table([
      [grupo, group],
      [unidad, periodo]
    ]).layout('noBorders').end;
    let columnas = [izquierda, derecha];
    let formulario =  new Columns(columnas).columnGap(5).end
    this.pdf.add(formulario);
    this.pdf.add(this.pdf.ln(1));
  }

  // ---NEW FORMATO
  async setHeader(){
    let tecnm = await new Img(this.header).width(570).height(70).margin([30, 10, 30, 0]).build();
    this.pdf.header(tecnm);
  }
  async setFooter(){
    let tecnm = await new Img(this.footer).width(570).height(80).margin([30, 0, 30, 0]).build(); //left, top, right, bottom
    this.pdf.footer(tecnm);
  }
  async setWatermark(){
    let tecnm = await new Img(this.watermark).height(710).width(600).margin([0, 80, 0, 0]).opacity(50).build();
    this.pdf.background(tecnm);
  }
  private initImag(){
    this.header = this.watermark = this.footer = `http://${this.ip}:3000/`;
    this.adminstradorService.getConfigFiles().subscribe(
      res =>{
        console.log(res);
        this.header+=res[0].encabezado;
        this.watermark+=res[0].marca;
        this.footer+=res[0].pie;
      }
    );
  }
}
