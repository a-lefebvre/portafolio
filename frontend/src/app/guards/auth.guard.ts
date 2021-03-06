import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private cookieService: CookieService,
    private _snackBar: MatSnackBar, private router: Router){}

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   if (!this.loginService.profesorLogueado) {
  //     this.openSnackBar('Debes iniciar sesión para acceder a las funcionalidades');
  //     this.router.navigate(['/']);
  //   }  
  //   return this.loginService.profesorLogueado;
  // }
  // openSnackBar(message: string) {
  //   let snackBarRef = this._snackBar.open(message, '', { duration: 2000, verticalPosition: 'top' });
  //   snackBarRef.afterDismissed().subscribe(() => {
  //     console.log('The snack was dismissed');
  //   });
  // }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let logueado = this.cookieService.get('profe_logueado');
    if (logueado != 'true') {
      this.openSnackBar('Debes iniciar sesión para acceder a las funcionalidades');
      this.router.navigate(['/']);
      return false;
    }
    return true;
    
  }
  openSnackBar(message: string) {
    let snackBarRef = this._snackBar.open(message, '', { duration: 2000, verticalPosition: 'top' });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
}
