import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-navegacion',
  templateUrl: './admin-navegacion.component.html',
  styleUrls: ['./admin-navegacion.component.css']
})
export class AdminNavegacionComponent implements OnInit {

  constructor(private storage: StorageMap,
    private router: Router,
    private cookieService: CookieService) { }

  ngOnInit() {
  }
  logOut() {
    this.storage.delete('clave_administrador').subscribe(() => {
      this.cookieService.delete('admin_logueado', '/admin');
      this.cookieService.delete('admin_logueado', '/');
      this.cookieService.delete('admin_logueado');
      this.router.navigate(['/'])
    });
  }
}
