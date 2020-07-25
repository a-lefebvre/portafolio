import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Calificacion } from 'src/app/models/calificacion';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  private config: Config;
  private API_URI: string;
  constructor(private http: HttpClient) {
    this.config = new Config();
    let ip = this.config.getIp();
    this.API_URI = `http://${ip}:3000/api`;
  }
  getCalificacionesByActividad(id_actividad:string){
    return this.http.get(`${this.API_URI}/calificaciones/actividad/${id_actividad}`);
  }
  getCalificacionesByNumControl(num_control: number, id_grupo: string){
    return this.http.get(`${this.API_URI}/calificaciones/control/${num_control}/${id_grupo}`);
  }
  getAllCalificaciones(clave_profesor: string, clave_materia: string, clave_grupo: string){
    return this.http.get(`${this.API_URI}/calificaciones/all/${clave_profesor}/${clave_materia}/${clave_grupo}`);
  }
  getAprobadosByUnidad(clave_profesor: string, clave_materia: string, clave_grupo: string){
    return this.http.get(`${this.API_URI}/calificaciones/aprobados/${clave_profesor}/${clave_materia}/${clave_grupo}`);
  }
  getReprobadosByUnidad(clave_profesor: string, clave_materia: string, clave_grupo: string){
    return this.http.get(`${this.API_URI}/calificaciones/reprobados/${clave_profesor}/${clave_materia}/${clave_grupo}`);
  }
  getAprobadosByMateria(clave_profesor: string, clave_materia: string, clave_grupo: string){
    return this.http.get(`${this.API_URI}/calificaciones/aprobados/materia/${clave_profesor}/${clave_materia}/${clave_grupo}`);
  }
  getReprobadosByMateria(clave_profesor: string, clave_materia: string, clave_grupo: string){
    return this.http.get(`${this.API_URI}/calificaciones/reprobados/materia/${clave_profesor}/${clave_materia}/${clave_grupo}`);
  }
  getCalificacionesByEstudianteByUnidad(num_control: number, id_grupo: string, unidad: number){
    return this.http.get(`${this.API_URI}/calificaciones/grupo/${id_grupo}/${unidad}/${num_control}`);
  }
  getCalificacionesByEstudianteBycriterio(num_control: number, id_grupo: string, unidad: number, id_criterio: string){
    return this.http.get(`${this.API_URI}/calificaciones/grupo/${id_grupo}/${unidad}/${num_control}/${id_criterio}`);
  }
  createCalificacion(calificacion: Calificacion){
    return this.http.post(`${this.API_URI}/calificaciones`, calificacion);
  }
  updateCalificacion(calificacion: Calificacion){
    return this.http.put(`${this.API_URI}/calificaciones`, calificacion);
  }
}
