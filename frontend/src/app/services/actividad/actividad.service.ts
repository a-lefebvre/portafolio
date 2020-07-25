import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actividad } from 'src/app/models/actividad';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private config: Config;
  private API_URI: string;
  constructor(private http: HttpClient) {
    this.config = new Config();
    let ip = this.config.getIp();
    this.API_URI = `http://${ip}:3000/api`;
  }
  getActividadByCriterio(id_criterio: string) {
    return this.http.get(`${this.API_URI}/actividad/criterio/${id_criterio}`);
  }
  getActividadByUnidad(unidad: number) {
    return this.http.get(`${this.API_URI}/actividad/unidad/${unidad}`);
  }
  getActividadesByGrupo(id_grupo: string, num_unidad: number, id_criterio: string){
    return this.http.get(`${this.API_URI}/actividad/${id_grupo}/${num_unidad}/${id_criterio}`);
  }
  newActividad(actividad: Actividad) {
    return this.http.post(`${this.API_URI}/actividad`, actividad);
  }
  updateActividad(actividad: any){
    return this.http.put(`${this.API_URI}/actividad`, actividad);
  }
  deleteActividad(id_actividad: string){
    return this.http.delete(`${this.API_URI}/actividad/${id_actividad}`);
  }
}
