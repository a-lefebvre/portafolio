import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  clave_profesor: any;
  constructor(private storage: StorageMap,
    private router: Router,
    private dataService: DataService,
    private cookieService: CookieService) {
  }

  ngOnInit() {
    this.getstorage();
  }
  private getstorage(){
    this.storage.get('clave_profesor').subscribe((profesor) => {
      this.clave_profesor = profesor;
    });
  }
  logOut() {
    this.storage.delete('clave_profesor').subscribe(() => {
      this.dataService.clave_profesor$.emit(undefined);
      this.cookieService.delete('profe_logueado', '/profe');
      this.cookieService.delete('profe_logueado', '/');
      this.cookieService.delete('profe_logueado');
      this.router.navigate(['/'])
    });
  }
}
