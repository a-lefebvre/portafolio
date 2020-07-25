import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { FormControl } from '@angular/forms';
import { Profesor } from 'src/app/models/profesor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  mode = new FormControl('over');
  clave_profesor: any;
  profesor: Profesor= {
    apellido: ''
  }
  constructor(private storage: StorageMap,
    private profesorService: ProfesorService) {
  }

  ngOnInit() {
    this.getStorageData();
  }
  private getStorageData(){
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
      this.profesorService.findProfesor(this.clave_profesor).subscribe(
        res =>{
          this.profesor = res[0];
        }
      );
    });
  }
}
