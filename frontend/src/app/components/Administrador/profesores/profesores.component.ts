import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data/data.service';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {
  mode = new FormControl('over');
  checked: boolean = false;
  seleccionados: any;
  grupos: any = [];
  constructor(private dataService: DataService,
    private profesorService: ProfesorService) { }

  ngOnInit() {
    // this.dataService.lista_select$.subscribe( (lista) =>{
    //   this.seleccionados = lista;
    //   // this.cargarGrupos();
    // });
  }
  cambiar(){
    this.checked = !this.checked;
  }
  // private cargarGrupos(){
  //   this.grupos = [];
  //   this.loadGrupos();
  // }
  // private loadGrupos(){
  //   this.profesorService.getProfesoresWithGrupos().subscribe(
  //     res =>{
  //       let lista: any = res;
  //       let cont = 0;
  //       this.seleccionados.forEach(element => {
  //         cont ++;
  //         this.findInGrupo(lista, element.clave_profesor, cont)
  //       });
  //     }
  //   );
  // }
  // private findInGrupo(array: any, clave_profesor: string, cont: number){
  //   array.forEach(element => {
  //     if (element.clave_profesor == clave_profesor) {
  //       this.grupos.push(element);
  //     }
  //   });
  // }
}
