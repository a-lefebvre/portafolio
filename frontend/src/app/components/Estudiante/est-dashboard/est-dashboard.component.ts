import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StorageMap } from '@ngx-pwa/local-storage';
import { EstudianteService } from 'src/app/services/estudiante/estudiante.service';
import { Estudiante } from 'src/app/models/estudiante';

@Component({
  selector: 'app-est-dashboard',
  templateUrl: './est-dashboard.component.html',
  styleUrls: ['./est-dashboard.component.css']
})
export class EstDashboardComponent implements OnInit {
  mode = new FormControl('over');
  estudiante: any = {
    nombre_est: '',
  }
  constructor(private storage: StorageMap,
    private estudianteService: EstudianteService) { }

  ngOnInit() {
    this.getStorageData();
  }
  private getStorageData(){
    this.storage.get('numero_control').subscribe( num_control => {
      let control: any = num_control
      if (num_control != undefined) {
        this.estudianteService.findEstudiante(control).subscribe(
          res =>{
            this.estudiante = res[0];
          }
        );
      }
    });
  }
}
