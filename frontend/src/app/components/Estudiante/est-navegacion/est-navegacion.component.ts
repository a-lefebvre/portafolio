import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-est-navegacion',
  templateUrl: './est-navegacion.component.html',
  styleUrls: ['./est-navegacion.component.css']
})
export class EstNavegacionComponent implements OnInit {

  constructor(private storage: StorageMap,
    private cookieService: CookieService,
    private router: Router,) { }

  ngOnInit() {
  }
  logOut() {
    this.storage.delete('numero_control').subscribe(() => {
      this.cookieService.delete('est_logueado', '/estudiante');
      this.cookieService.delete('est_logueado', '/');
      this.cookieService.delete('est_logueado');
      this.router.navigate(['/'])
    });
  }
}
