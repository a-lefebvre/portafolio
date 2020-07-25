import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profesor } from 'src/app/models/profesor';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private config: Config;
  private API_URI: string;
  constructor(private http: HttpClient) {
    this.config = new Config();
    let ip = this.config.getIp();
    this.API_URI = `http://${ip}:3000/api`;
  }
  getProfesores() {
    return this.http.get(`${this.API_URI}/profesor`);
  }
  getProfesoresWithGrupos() {
    return this.http.get(`${this.API_URI}/profesor/grupos`);
  }
  findProfesor(clave_profesor: string) {
    return this.http.get(`${this.API_URI}/profesor/${clave_profesor}`);
  }
  saveProfesor(profesor: Profesor) {
    return this.http.post(`${this.API_URI}/profesor`, profesor);
  }
  updateProfesor(profesor: Profesor) {
    return this.http.put(`${this.API_URI}/profesor`, profesor);
  }
  deleteProfesor(clave_profesor: string) {
    return this.http.delete(`${this.API_URI}/profesor/${clave_profesor}`);
  }
}
