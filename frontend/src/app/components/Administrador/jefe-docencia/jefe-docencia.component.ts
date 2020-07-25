import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-jefe-docencia',
  templateUrl: './jefe-docencia.component.html',
  styleUrls: ['./jefe-docencia.component.css']
})
export class JefeDocenciaComponent implements OnInit {
  mode = new FormControl('over');

  constructor() { }

  ngOnInit(): void {
  }

}
