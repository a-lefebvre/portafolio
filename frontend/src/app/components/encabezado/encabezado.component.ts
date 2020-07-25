import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  hora: number;
  apellido: string;
  clave_profesor: any;
  constructor(private dataService: DataService, 
    private profesorService: ProfesorService) { }

  ngOnInit() {
    this.getDataStorage();
    let date = new Date();
    this.hora = date.getHours();
  }
  getDataStorage(){
    this.dataService.clave_profesor$.subscribe( clave_profesor =>{
      this.clave_profesor = clave_profesor;
      if (this.clave_profesor != undefined) {
        this.profesorService.findProfesor(this.clave_profesor).subscribe(
          res =>{
            this.apellido = res[0].apellido;
          }
        );
      }
    });
  }
}
