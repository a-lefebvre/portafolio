import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estudiante } from 'src/app/models/estudiante';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private config: Config;
  private API_URI: string;
  constructor(private http: HttpClient) {
    this.config = new Config();
    let ip = this.config.getIp();
    this.API_URI = `http://${ip}:3000/api`;
  }
  getAllEstudiantes(){
    return this.http.get(`${this.API_URI}/estudiante`);
  }
  findEstudiante(num_control:number){
    return this.http.get(`${this.API_URI}/estudiante/${num_control}`);
  }
  saveEstudiante(estudiante: Estudiante){
    return this.http.post(`${this.API_URI}/estudiante`, estudiante);
  }
  updateEstudiante(estudiante: any){
    return this.http.put(`${this.API_URI}/estudiante`, estudiante);
  }
}
