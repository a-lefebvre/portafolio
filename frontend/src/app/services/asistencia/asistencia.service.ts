import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private config: Config;
  private API_URI: string;
  constructor(private http: HttpClient) {
    this.config = new Config();
    let ip = this.config.getIp();
    this.API_URI = `http://${ip}:3000/api`;
  }
  getFecha(fecha: string, id_grupo: string){
    return this.http.get(`${this.API_URI}/asistencia/fecha/${fecha}/${id_grupo}`);
  }
  getListaByGrupoByUnidad(id_grupo:string, num_unidad: number){
    return this.http.get(`${this.API_URI}/asistencia/${id_grupo}/${num_unidad}`);
  }
  getListaActual(id_grupo: string, fecha: string, unidad: number){
    return this.http.get(`${this.API_URI}/asistencia/${id_grupo}/dia/${fecha}/${unidad}`);
  }
  getAsistenciasByIdDetalle(id_detalle: string){
    return this.http.get(`${this.API_URI}/asistencia/detalle/${id_detalle}`);
  }
  getAsistenciaByMateriaAndGrupo(clave_profesor: string, clave_materia: string, clave_grupo: string){
    return this.http.get(`${this.API_URI}/asistencia/${clave_profesor}/asistencias/${clave_materia}/${clave_grupo}`);
  }
  getFaltasByMateriaAndGrupo(clave_profesor: string, clave_materia: string, clave_grupo: string){
    return this.http.get(`${this.API_URI}/asistencia/${clave_profesor}/faltas/${clave_materia}/${clave_grupo}`);
  }
  getAsistenciasByEstudiante(id_grupo: string, unidad: number, num_control: number){
    return this.http.get(`${this.API_URI}/asistencia/${id_grupo}/${unidad}/asistencias/${num_control}`);
  }
  createAsistencia(asistencia: any){
    return this.http.post(`${this.API_URI}/asistencia`, asistencia);
  }
  updateAsistencia(asistencia: any){
    return this.http.put(`${this.API_URI}/asistencia`, asistencia);
  }
}
