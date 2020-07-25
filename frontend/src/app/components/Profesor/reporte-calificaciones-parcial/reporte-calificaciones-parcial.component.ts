import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Img, Columns, Txt, Table, Cell } from 'pdfmake-wrapper';
import { pdfFonts } from "pdfmake/build/vfs_fonts";
import { Profesor } from 'src/app/models/profesor';
import { Materia } from 'src/app/models/materia';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ReporteService } from 'src/app/services/reporte/reporte.service';
import { DetalleGrupoService } from 'src/app/services/detalle-grupo/detalle-grupo.service';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import { GrupoService } from 'src/app/services/grupo/grupo.service';
import { MateriaService } from 'src/app/services/materia/materia.service';
import { Config } from 'src/app/services/config';
import { AdministradorService } from 'src/app/services/administrador/administrador.service';

@Component({
  selector: 'app-reporte-calificaciones-parcial',
  templateUrl: './reporte-calificaciones-parcial.component.html',
  styleUrls: ['./reporte-calificaciones-parcial.component.css']
})
export class ReporteCalificacionesParcialComponent implements OnInit {
  pdf: PdfMakeWrapper;
  columnsToDisplay: string[];
  clave_profesor: any;
  clave_materia: any;
  id_grupo: any;
  clave_grupo: string;
  alumnos: any;
  profesor: Profesor;
  materia: Materia;
  data: any = [];
  materiasUnique: any;
  // ---
  grupo: string
  grupos: any;
  unidad: number = 1;
  unidades: number[] = [];
  disableBtnDownload = true;
  columnasS = [];
    //---NEW FORMATO
  config: Config;
  header: string = ''
  watermark: string = '';
  footer: string = '';
  ip: string;
  // -----
  constructor(private reporteService: ReporteService,
    private storage: StorageMap,
    private detalleGrupoService: DetalleGrupoService,
    private profesorService: ProfesorService,
    private grupoService: GrupoService,
    private materiaService: MateriaService,
    private adminstradorService: AdministradorService) { 
      this.config = new Config();
      this.ip = this.config.getIp();
      this.initImag();
  }
  ngOnInit() {
    this.getStorageData();
  }
  private getStorageData() {
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
      this.getProfesor(this.clave_profesor);
      this.getMaterias(this.clave_profesor);
    });
  } 
  fillUnidades(event){
    this.disableBtnDownload = false;
    this.unidades = [];
    this.unidad = 1;
    this.id_grupo=event.value;
    this.getGrupo(this.id_grupo);
    for (let index = 0; index < this.materia.unidades; index++) {
      this.unidades.push(index+1);
    }
    this.setCriterios();
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
  setCriterios(){
    this.columnasS = [];
    this.columnsToDisplay = [];
    this.reporteService.getCriteriosByUnidad(this.id_grupo, this.unidad).subscribe(
      res =>{
        let criterios: any = res;
        let cont = 0;
        let porcentaje = 0;
        criterios.forEach(element => {
          let column = element.nombre_criterio + `(${element.porcentaje}%)`;
          this.columnasS.push(element.nombre_criterio );
          this.columnsToDisplay.push(column);
          porcentaje+=element.porcentaje;
          cont++;
          if (cont == criterios.length) {
            let total = `Total (${porcentaje}%)`;
            this.columnsToDisplay.push(total)
          }
        });
        this.getAlumnos(this.clave_profesor, this.id_grupo);
      }
    );
  }
  private getGrupo(id_grupo: string){
    this.grupoService.findGrupo(id_grupo).subscribe(
      res =>{
        this.clave_grupo = res[0].clave_grupo;
      }
    );
  }
  private getMateria(clave_materia: string){
    this.materiaService.getMateria(clave_materia).subscribe(
      res =>{
        this.materia = res[0];
      }
    );
  }
  private getMaterias(clave_profesor: string){
    this.pdf = new PdfMakeWrapper();
    this.materiasUnique = [];
    this.grupoService.getMaterias(clave_profesor).subscribe(
      res =>{
        let materias: any = res;
        materias.forEach(element => {
          if (!this.isDuplicate(element.clave_materia)) {
            this.materiasUnique.push(element);
          }
        });
      },
      err =>{
        console.log(err);
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
  private getAlumnos(clave_profesor: string, id_grupo: string) {
    this.detalleGrupoService.getEstudiantes(clave_profesor ,id_grupo, '0').subscribe(
      res => {
        this.alumnos = res;
        // console.log(this.alumnos);
        let columnas: string[] = this.getColumnas();
        this.fillData(columnas);
      }
    );
  }
  downloadPDF() {
    this.initPdf();
  }
  fillData(columnas: string[]){
    this.data = [];
    this.pushData(columnas);
    let cont = 0;
    for (let index = 0; index < this.alumnos.length; index++) {
      const element = this.alumnos[index];
      this.reporteService.getCalificacionesByCriterios(element.num_control, this.clave_materia, this.clave_grupo, this.unidad).subscribe(
        res =>{
          let row = [cont+1, element.num_control, element.nombre_est];
          let calificaciones: any = res;
          let total = 0;
          let porcentaje = 0; 
          for (let index = 0; index < this.columnasS.length; index++) {
            let pos = this.existInColumns(calificaciones, this.columnasS[index])
            if (pos > -1) {
              porcentaje += calificaciones[pos].puntos;
              let puntos = calificaciones[pos].puntos.toFixed(1);
              row.push(puntos+'%');
              total++;
            }else{
              row.push('0%');
            }
          }
          if (total == calificaciones.length) {
            let calif = porcentaje.toFixed(1);
            row.push(calif+'%');
            this.pushData(row);
            cont++;
          }
        }
      );
    }
    // this.alumnos.forEach(element => {
    //   this.reporteService.getCalificacionesByCriterios(element.num_control, this.clave_materia, this.clave_grupo, this.unidad).subscribe(
    //     res =>{
    //       let row = [cont+1, element.num_control, element.nombre_est];
    //       let calificaciones: any = res;
    //       let total = 0;
    //       let porcentaje = 0; 
    //       for (let index = 0; index < this.columnasS.length; index++) {
    //         let pos = this.existInColumns(calificaciones, this.columnasS[index])
    //         if (pos > -1) {
    //           porcentaje += calificaciones[pos].puntos;
    //           let puntos = calificaciones[pos].puntos.toFixed(1);
    //           row.push(puntos+'%');
    //           total++;
    //         }else{
    //           row.push('0%');
    //         }
    //       }
    //       if (total == calificaciones.length) {
    //         let calif = porcentaje.toFixed(1);
    //         row.push(calif+'%');
    //         this.pushData(row);
    //         cont++;
    //       }
    //       // this.pushData(row);
    //       // cont++;
    //     }
    //   );
    // });
  }
  pushData(obj: any){
    this.data.push(obj);
  }
  async initPdf(){
    this.pdf = new PdfMakeWrapper();
    this.pdf.pageOrientation('landscape');
    this.pdf.pageMargins([30, 100, 30, 80]);
    await this.setHeader();
        // ---NEW FORMATO
        await this.setFooter();
        await this.setWatermark();
        // ---
    this.createFormulario();
    this.setTable(this.data);
    let date = new Date();
    let fecha = ''+date.getDate()+(date.getMonth()+1)+date.getFullYear();
    // this.pdf.create().download('CalificacionesParciales-'+fecha);
    this.pdf.create().open();
  }

  setTable(data: any){
    let matriz: any = [];
    for (let x = 0; x < data.length; x++) {
      let row = data[x];
      let fila = [];
      for (let y = 0; y < row.length; y++) {
        if (y != 1 && y != 2) {
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
  getColumnas(){
    let cont = 0;
    let columns = ['Nº', 'Nº Control', 'Nombre'];
    this.columnsToDisplay.forEach(element => {
      columns.push(element);
      cont++;
    });
    if (cont == this.columnsToDisplay.length) {
      // console.log(columns);
      return columns;
    }
  }
  createFormulario(){
    // this.pdf.add(this.pdf.ln(2));
    let nombre = new Txt('MATERIA:').fontSize(12).end;
    let name = new Txt(`${this.materia.nombre_materia}`).fontSize(12).bold().end;
    let maestro = new Txt('PROFESOR:').fontSize(12).end;
    let teacher =  new Txt(`${this.profesor.apellido} ${this.profesor.nombre}`).fontSize(12).bold().end;
    let izquierda = new Table([
      [nombre, name],
      [maestro, teacher]
    ]).layout('noBorders').width(400).end;

    let grupo = new Txt('GRUPO:').fontSize(12).end;
    let group = new Txt(`${this.clave_grupo}`).bold().fontSize(12).end;
    let unidad = new Txt('UNIDAD:').fontSize(12).end;
    let unity = new Txt(`${this.unidad}`).bold().fontSize(12).end;
    let centro =  new Table([
      [grupo, group],
      [unidad, unity]
    ]).layout('noBorders').width(150).end;


    let ciclo = new Txt('PERIODO:').fontSize(12).end;
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
      [ciclo, periodo]
    ]).layout('noBorders').end;

    let columnas = [izquierda, centro, derecha];
    let formulario =  new Columns(columnas).columnGap(5).end
    this.pdf.add(formulario);
    this.pdf.add(this.pdf.ln(1)); 
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
  private existInColumns(array: any, item: string){
    for (let index = 0; index < array.length; index++) {
      if (array[index].nombre_criterio == item) {
        return index;
      }
    }
    return -1;
  }

    //--------NEW FORMATO
    async setHeader(){
      console.log(this.header);
      let tecnm = await new Img(this.header).width(600).height(70).margin([130, 10, 60, 0]).build();
      this.pdf.header(tecnm);
    }
    async setFooter(){
      let tecnm = await new Img(this.footer).width(600).height(80).margin([130, 0, 60, 0]).build(); //left, top, right, bottom
      this.pdf.footer(tecnm);
    }
    async setWatermark(){
      let tecnm = await new Img(this.watermark).height(500).width(800).margin([0, 80, 0, 0]).opacity(30).build();
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
