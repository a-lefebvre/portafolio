import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  checked: boolean = false;
  mode = new FormControl('over');
  opciones = ['Final', 'Parcial'];
  opcion = 'Final';
  constructor() { }

  ngOnInit() {
  }

  cambiar(){
    this.checked = !this.checked;
  }
}
