import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grupo } from 'src/app/models/grupo';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private config: Config;
  private API_URI: string;
  constructor(private http: HttpClient) {
    this.config = new Config();
    let ip = this.config.getIp();
    this.API_URI = `http://${ip}:3000/api`;
  }
  getAllGrupos(){
    return this.http.get(`${this.API_URI}/grupo`);
  }
  getMaterias(clave_profesor: string ){
    return this.http.get(`${this.API_URI}/grupo/${clave_profesor}`);
  }
  getGruposOfMaterias(clave_profesor: string, clave_materia: string){
    return this.http.get(`${this.API_URI}/grupo/${clave_profesor}/${clave_materia}`);
  }
  findGrupo(id_grupo: string){
    return this.http.get(`${this.API_URI}/grupo/findGrupo/${id_grupo}`);
  }
  findUniqueGrupo(clave_profesor: string, clave_materia: string, clave_grupo: string){
    return this.http.get(`${this.API_URI}/grupo/${clave_profesor}/${clave_materia}/${clave_grupo}`);
  }
  getMateriasByEstudiante(num_control: number){
    return this.http.get(`${this.API_URI}/grupo/estudiante/${num_control}`);
  }
  saveGrupo(grupo: Grupo){
    return this.http.post(`${this.API_URI}/grupo`, grupo);
  }
  deleteGrupo(id_grupo: string){
    return this.http.delete(`${this.API_URI}/grupo/${id_grupo}`,);
  }
}
