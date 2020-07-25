import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {
  mode = new FormControl('over');
  checked: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  cambiar(){
    this.checked = !this.checked;
  }
}
