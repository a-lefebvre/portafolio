import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Criterio } from 'src/app/models/criterio';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class CriterioService {
  private config: Config;
  private API_URI: string;
  constructor(private http: HttpClient) {
    this.config = new Config();
    let ip = this.config.getIp();
    this.API_URI = `http://${ip}:3000/api`;
  }
  getCriterios(id_grupo:string){
    return this.http.get(`${this.API_URI}/criterio/${id_grupo}`);
  }
  getCriteriosByUnidad(id_grupo:string, unidad: number){
    return this.http.get(`${this.API_URI}/criterio/${id_grupo}/${unidad}`);
  }
  newCriterio(criterio: Criterio){
    return this.http.post(`${this.API_URI}/criterio`, criterio);
  }
  deleteCriterio(id_criterio: string){
    return this.http.delete(`${this.API_URI}/criterio/${id_criterio}`, );
  }
}
