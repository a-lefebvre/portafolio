import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-grupos',
  templateUrl: './admin-grupos.component.html',
  styleUrls: ['./admin-grupos.component.css']
})
export class AdminGruposComponent implements OnInit {
  mode = new FormControl('over');
  checked: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  cambiar(){
    this.checked = !this.checked;
  }
}
