import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Administrador } from 'src/app/models/administrador';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private config: Config;
  private API_URI: string;
  constructor(private http: HttpClient) {
    this.config = new Config();
    let ip = this.config.getIp();
    this.API_URI = `http://${ip}:3000/api`;
  }
  findAdministrador(clave_administrador: string){
    return this.http.get(`${this.API_URI}/administrador/${clave_administrador}`);
  }
  saveAdministrador(admin: Administrador){
    return this.http.post(`${this.API_URI}/administrador`, admin);
  }
  updateAdministrador(profesor: Administrador){
    return this.http.put(`${this.API_URI}/administrador`, profesor);
  }
  config_header_file(image: any){
    return this.http.post(`${this.API_URI}/administrador/config_header`, image);
  }
  config_watermark_file(image: any){
    return this.http.post(`${this.API_URI}/administrador/config_watermark`, image);
  }
  config_footer_file(image: any){
    return this.http.post(`${this.API_URI}/administrador/config_footer`, image);
  }
  getConfigFiles(){
    return this.http.get(`${this.API_URI}/administrador/config_files`);
  }
}
