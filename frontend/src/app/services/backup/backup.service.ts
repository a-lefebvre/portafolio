import { Injectable } from '@angular/core';
import { Config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackupService {
  private config: Config;
  private API_URI: string;
  constructor(private http: HttpClient) {
    this.config = new Config();
    let ip = this.config.getIp();
    this.API_URI = `http://${ip}:3000`;
  }

  createBackup(data: any){
    return this.http.post(`${this.API_URI}/backup`, data);
  }
}
