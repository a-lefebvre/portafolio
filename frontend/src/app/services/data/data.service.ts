import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  listar$ = new EventEmitter<any[]>();
  unidad$ = new EventEmitter<number>();
  criterios$ = new EventEmitter<any[]>();
  id_criterio$ = new EventEmitter<string>();
  clave_profesor$ = new EventEmitter<string>();
  listar_profesor$ = new EventEmitter<any[]>();
  lista_select$ = new EventEmitter<any>();
  listar_materia$ = new EventEmitter<any[]>();
  listar_grupos$ =  new EventEmitter<any[]>();
  listar_actividades$ = new EventEmitter<any>();
  listar_calif$ = new EventEmitter<any>();
  imagenesCarga = new EventEmitter<string>();
  constructor() { }
}
