import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { XlsxService } from 'src/app/services/archivos/xlsx.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-generate-formato',
  templateUrl: './generate-formato.component.html',
  styleUrls: ['./generate-formato.component.css']
})
export class GenerateFormatoComponent implements OnInit {
  lista_seleccionados: any = [];
  @Input() tipo: string = '';
  constructor(private xlsxService: XlsxService) { }

  ngOnInit() {
  }
  downloadFile(){
    console.log(this.tipo);
    if (this.tipo == 'grupos') {
      let data = this.fillDataGrupos();
      this.xlsxService.exportAsExcelFile(data, 'lista_grupos');
    }
    if (this.tipo == 'profesores') {
      let data = this.fillDataProfesores();
      this.xlsxService.exportAsExcelFile(data, 'lista_profesores');
    }
    if (this.tipo == 'materias') {
      let data = this.fillDataMaterias();
      this.xlsxService.exportAsExcelFile(data, 'lista_materias');
    }
    if (this.tipo == 'estudiantes') {
      let data = this.fillDataEstudiantes();
      this.xlsxService.exportAsExcelFile(data, 'lista_estudiantes');
    }
  }
  private fillDataGrupos() {
    let data: any = [];
    data[0] = { 
      "rfc": 'RFC(borrar)', 
      "clave_materia": 'CLAVE(borrar)', 
      "grupo": 'ISA(borrar)',
      "hora_inicio": '13',
      "hora_final": '14'
    }
    return data;
  }
  private fillDataProfesores() {
    let data: any = [];
    data[0] = { 
      "rfc": 'RFC(borrar)', 
      "nombre": 'NOMBRE(borrar)', 
      "apellido": 'APELLIDO(borrar)',
      "email": 'correo(borrar)'
    }
    return data;
  }
  private fillDataMaterias() {
    let data: any = [];
    data[0] = { 
      "clave_materia": 'CLAVE(borrar)', 
      "nombre": 'NOMBRE(borrar)', 
      "unidades": '3'
    }
    return data;
  }
  private fillDataEstudiantes() {
    let data: any = [];
    data[0] = { 
      "num_control": '13161198(borrar)', 
      "nombre": 'NOMBRE(borrar)', 
      "apellido": 'APELLIDO(borrar'
    }
    return data;
  }
}
