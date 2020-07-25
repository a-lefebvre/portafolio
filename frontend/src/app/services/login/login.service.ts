import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  profesorLogueado: boolean = true;
  estudianteLogueado: boolean = true;
  private adminLogueado: boolean;
  private num_control: any;
  private rfc: any;
  private clave_admin: any;
  constructor(private storage: StorageMap) { 
    this.getStorageData();
  }
  private getStorageData(){
    
    // this.storage.get('clave_administrador').subscribe( clave_administrador =>{
    //   this.clave_admin ='' + clave_administrador;
    //   this.validateSesion();
    // });
    // this.storage.get('numero_control').subscribe( num_control =>{
    //   this.num_control ='' + num_control;
    // });
    // this.storage.get('clave_profesor').subscribe( rfc =>{
    //   this.rfc ='' + rfc;
    // });
  }
  validateSesion(){
    console.log('ClvAdmin: ',this.clave_admin);
    if (this.clave_admin != undefined) {
      this.adminLogueado = true;
    }else{
      this.adminLogueado = false;
    }
  }
  setStatusAdmin(status: boolean){
    this.adminLogueado = status;
  }
  getStatusAdmin(){
    console.log('getStatus:', this.adminLogueado);
    return this.adminLogueado;
  }
  getClaveAdministrador() : boolean {
    return this.clave_admin;
  }
  
}
