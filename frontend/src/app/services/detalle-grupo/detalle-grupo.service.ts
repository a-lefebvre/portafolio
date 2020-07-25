import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Detalle_grupo } from 'src/app/models/detalle-grupo';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class DetalleGrupoService {
  private config: Config;
  private API_URI: string;
  constructor(private http: HttpClient) {
    this.config = new Config();
    let ip = this.config.getIp();
    this.API_URI = `http://${ip}:3000/api`;
  }
  findGrupo(id_grupo:string){
    return this.http.get(`${this.API_URI}/detalleGrupo/${id_grupo}`);
  }
  getEstudiante(id_grupo: string, num_control:number){
    return this.http.get(`${this.API_URI}/detalleGrupo/estudiante/${id_grupo}/${num_control}`);
  }
  findEstudiante(clave_profesor:string, num_control:number){
    return this.http.get(`${this.API_URI}/detalleGrupo/${clave_profesor}/${num_control}`);
  }
  getEstudiantes(clave_profesor:string, id_grupo:string, clave_materia:string){
    return this.http.get(`${this.API_URI}/detalleGrupo/${clave_profesor}/${id_grupo}/${clave_materia}`);
  }
  addEstudiante(detalleGrupo: Detalle_grupo){
    return this.http.post(`${this.API_URI}/detalleGrupo`, detalleGrupo);
  }
  updateStatus(detalleGrupo: Detalle_grupo){
    return this.http.put(`${this.API_URI}/detalleGrupo`, detalleGrupo);
  }
  deleteEstudiante(id_detalle: string){
    return this.http.delete(`${this.API_URI}/detalleGrupo/${id_detalle}`);
  }
}
