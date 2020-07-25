import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private config: Config;
  private API_URI: string;
  constructor(private http: HttpClient) {
    this.config = new Config();
    let ip = this.config.getIp();
    this.API_URI = `http://${ip}:3000/api`;
  }
  getFechasByGrupo(clave_profesor: string, id_grupo: string, unidad: number){
    return this.http.get(`${this.API_URI}/reporte/fechas/${clave_profesor}/${id_grupo}/${unidad}`);
  }
  getAsistenciasByAlumno(num_control: string, id_grupo: string, unidad: number){
    return this.http.get(`${this.API_URI}/reporte/asistencias/${num_control}/${id_grupo}/${unidad}`);
  }
  getCriteriosByUnidad(id_grupo: string, unidad: number){
    return this.http.get(`${this.API_URI}/reporte/criterios/${id_grupo}/unidad/${unidad}`);
  }
  getCalificacionesByCriterios(num_control: string, clave_materia: string, clave_grupo: string, unidad: number){
    return this.http.get(`${this.API_URI}/reporte/${clave_materia}/${unidad}/criterios/${clave_grupo}/${num_control}`);
  }
  getCalificacionByUnidadByEstudiante(clave_materia: string, clave_grupo: string, num_control: string){
    return this.http.get(`${this.API_URI}/reporte/${clave_materia}/unidades/${clave_grupo}/${num_control}`);
  }
}
