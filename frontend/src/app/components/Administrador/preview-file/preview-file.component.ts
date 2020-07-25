import { Component, OnInit } from '@angular/core';
import { AdministradorService } from 'src/app/services/administrador/administrador.service';
import { Config } from 'src/app/services/config';
import { PdfMakeWrapper, Img } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-preview-file',
  templateUrl: './preview-file.component.html',
  styleUrls: ['./preview-file.component.css']
})
export class PreviewFileComponent implements OnInit {
  pdf: PdfMakeWrapper;
  config: Config;
  header: string = ''
  watermark: string = '';
  footer: string = '';
  ip: string;
  constructor(private adminstradorService: AdministradorService,
    private dataService: DataService) {
    this.config = new Config();
    this.ip = this.config.getIp();
    PdfMakeWrapper.setFonts(pdfFonts);
  }

  ngOnInit(): void {
    this.dataService.imagenesCarga.subscribe(() =>{
      this.preview();
    });
  }
  preview(){
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
  async initPDF(){
    this.pdf = new PdfMakeWrapper();
    this.pdf.pageSize('letter');
    this.pdf.pageOrientation('portrait');
    // this.pdf.pageMargins([30, 75]);
    this.pdf.pageMargins([30, 100, 30, 80]);//left, top, right, bottom
    await this.setHeader();
    await this.setFooter();
    await this.setWatermark();
    this.pdf.add('hola mundo !!!!1234567890123456789012345678901234567890123456789012345678912345678901234567890123456789123456789');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.add('hola mundo !!!!');
    this.pdf.create().open();
  }
  async setHeader(){
    // let tecnm = await new Img(this.header).height(70).margin([30, 0, 30, 0]).build();
    // let tecnm = await new Img(this.header).height(90).margin([0,10,0,0]).build();
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
}
