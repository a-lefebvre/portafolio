import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-est-informacion',
  templateUrl: './est-informacion.component.html',
  styleUrls: ['./est-informacion.component.css']
})
export class EstInformacionComponent implements OnInit {
  mode = new FormControl('over');
  constructor() { }

  ngOnInit() {
  }

}
