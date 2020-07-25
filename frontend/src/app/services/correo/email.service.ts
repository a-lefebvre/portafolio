import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Correo } from 'src/app/models/correo';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private config: Config;
  private API_URI: string;
  constructor(private http: HttpClient) {
    this.config = new Config();
    let ip = this.config.getIp();
    this.API_URI = `http://${ip}:3000/api`;
  }

  sendEmail(correo: Correo){
    return this.http.post(`${this.API_URI}/email`, correo);
  }
}
