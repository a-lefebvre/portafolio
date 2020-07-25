import { Component, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/services/administrador/administrador.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-ajustes-file',
  templateUrl: './ajustes-file.component.html',
  styleUrls: ['./ajustes-file.component.css']
})
export class AjustesFileComponent implements OnInit {
  nameArchivo: string = 'Selecciona una imagen';
  encabezado: string = 'Selecciona tu archivo';
  marca: string = 'Selecciona tu archivo';
  pie: string = 'Selecciona tu archivo';
  files: File[] = [];
  constructor(private administradorService: AdministradorService,
    private dataService: DataService) { }

  ngOnInit(): void {
  }
  onChange(event) {
    const name = event.target.name;
    const files = event.target.files;
    this.setFileName(files, name);
    console.log(name, files);
    this.defineType(name, files[0]);
    this.dataService.imagenesCarga.emit();
  }
  saveConfig(){
    this.saveHeader();
  }
  private saveHeader(){
    let header = this.files[0];
    let formdata = new FormData();
    formdata.append('image', header);
    this.administradorService.config_header_file(formdata).subscribe(
      res =>{
        console.log(res['text']);
        this.saveMarca();
      }
    );
  }
  private saveMarca(){
    let marca = this.files[1];
    let formdata = new FormData();
    formdata.append('image', marca);
    this.administradorService.config_watermark_file(formdata).subscribe(
      res =>{
        console.log(res['text']);
        this.saveFooter();
      }
    );
  }
  private saveFooter(){
    let footer = this.files[2];
    let formdata = new FormData();
    formdata.append('image', footer);
    this.administradorService.config_footer_file(formdata).subscribe(
      res =>{
        console.log(res['text']);
      }
    );
  }
  private defineType(tipo: string, file: File){
    if (tipo == 'encabezado') {
      this.files[0] = file;
    }
    if (tipo == 'marca') {
      this.files[1] = file;
    }
    if (tipo == 'pie') {
      this.files[2] = file;
    }
  }
  private setFileName(files: any[], tipo: string) {
    let file = files[0];
    if (tipo == 'encabezado') {
      this.defineEncabezadoName(file);
    }
    if (tipo == 'marca') {
      this.defineMarcaName(file);
    }
    if (tipo == 'pie') {
      this.definePieName(file);
    }

  }
  private defineEncabezadoName(file: File){
    if (file != undefined) {
      let name = file.name;
      if (name.length > 35) {
        this.encabezado = '';
        for (let index = 0; index < 32; index++) {
          this.encabezado += name.charAt(index);
        }
        this.encabezado += '...'
      } else {
        this.encabezado = file.name;
      }
    } else {
      this.encabezado = 'Selecciona tu archivo';
    }
  }
  private defineMarcaName(file: File){
    if (file != undefined) {
      let name = file.name;
      if (name.length > 35) {
        this.marca = '';
        for (let index = 0; index < 32; index++) {
          this.marca += name.charAt(index);
        }
        this.marca += '...'
      } else {
        this.marca = file.name;
      }
    } else {
      this.marca = 'Selecciona tu archivo';
    }
  }
  private definePieName(file: File){
    if (file != undefined) {
      let name = file.name;
      if (name.length > 35) {
        this.pie = '';
        for (let index = 0; index < 32; index++) {
          this.pie += name.charAt(index);
        }
        this.pie += '...'
      } else {
        this.pie = file.name;
      }
    } else {
      this.pie = 'Selecciona tu archivo';
    }
  }
}
