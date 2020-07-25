import { Injectable } from '@angular/core';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');
@Injectable({
  providedIn: 'root'
})
export class PdfService {
  documento: any;
  columns: string[];
  data: string[][];
  options = {
    theme: 'grid',
      styles: {
        lineColor: 0,
        lineWidth: 0.1,
        textColor: 0,
        font: "helvetica",
        fontSize: 8
      },
      headStyles: {
        fillColor: [220, 234, 245],
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        fontStyle: 'normal', 
        fillColor: 255,
        halign: 'left',
        valign: 'middle',
      },
      columnStyles: {
        id: {
          halign: 'center',
          overflow: 'linebreak', 
          cellWidth: 'wrap'
        },
        control: {
          halign: 'center',
          overflow: 'linebreak', 
          cellWidth: 'wrap'
        }
      },
      margin: {
        top: 50,
        left: 15,
        right: 15,
        bottom: 15
      },
      tableWidth: 'auto'
  }
  constructor() {
    this.documento = new jsPDF();
  }
  createTable(columns: any[], data: any[][]){
    this.documento.autoTable(columns, data, this.options);
  }
  addText(x:number, y:number, text: string){
    this.documento.text(text, x, y);
  }
  addImagen(img_url: any, format: string, x: number, y: number, width: number, height: number){
    let img = new Image();
    img.src = img_url;
    this.documento.addImage(img, format, x, y, width, height);
  }
  createDocument(name: string){
    let date = new Date();
    name+=date.toLocaleDateString()+date.toLocaleTimeString();
    this.documento.save(name);
  }
  init(){
    this.documento = new jsPDF();
  }
  setFont(name: string){
    this.documento.setFont(name);
  }
  setFontSize(size: number){
    this.documento.setFontSize(size);
  }
  setFonts(weight: string, size: number){
    this.documento.setFontType(weight);
    this.documento.setFontSize(size);
  }
  setFontType(weight: string){
    this.documento.setFontType(weight);
  }
  setColor(rgb: any){
    this.documento.setDrawColor(rgb);
  }
  setLineWidth(width: number){
  }
  drawLine(y: number, x: number, fin: number, start: number, width:number){
    this.documento.setLineWidth(width);
    this.documento.line(y, x, fin, start);
  }
  setTextColor(rgb: any){
    this.documento.setTextColor(rgb);
  }
}
