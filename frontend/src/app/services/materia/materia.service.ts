import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Materia } from 'src/app/models/materia';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private config: Config;
  private API_URI: string;
  constructor(private http: HttpClient) {
    this.config = new Config();
    let ip = this.config.getIp();
    this.API_URI = `http://${ip}:3000/api`;
  }

  getMaterias(){
    return this.http.get(`${this.API_URI}/materia`);
  }
  getMateria(clave_materia: string){
    return this.http.get(`${this.API_URI}/materia/${clave_materia}`);
  }
  createMateria(materia: Materia){
    return this.http.post(`${this.API_URI}/materia`, materia);
  }
  deleteMateria(clave_materia: string){
    return this.http.delete(`${this.API_URI}/materia/${clave_materia}`);
  }
}
