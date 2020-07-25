import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StorageMap } from '@ngx-pwa/local-storage';
import { AdministradorService } from 'src/app/services/administrador/administrador.service';
import { Administrador } from 'src/app/models/administrador';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  mode = new FormControl('over');
  hora: number;
  admin: Administrador = {
    nombre: ''
  };
  manual: any;
  constructor(private storage: StorageMap,
    private adminService: AdministradorService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    let date = new Date();
    this.hora = date.getHours();
    this.getStorageData();
  }
  // getManual(){
  //   this.manualService.getManual().subscribe(
  //     res =>{
  //       console.log(res);
  //     }
  //   );
  // }
  private getStorageData(){
    this.storage.get('clave_administrador').subscribe( clave_administrador =>{
      let clave_admin ='' + clave_administrador;
      this.getAdmin(clave_admin);
    });
  }
  private getAdmin(clave_admin: string){
    this.adminService.findAdministrador(clave_admin).subscribe(
      res =>{
        this.admin = res[0];
      }
    );
  }
}
