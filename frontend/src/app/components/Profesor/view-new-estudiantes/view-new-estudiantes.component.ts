import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSort, MatTableDataSource } from '@angular/material';
import { EditGrupoComponent } from '../edit-grupo/edit-grupo.component';
import { Estudiante } from 'src/app/models/estudiante';

@Component({
  selector: 'app-view-new-estudiantes',
  templateUrl: './view-new-estudiantes.component.html',
  styleUrls: ['./view-new-estudiantes.component.css']
})
export class ViewNewEstudiantesComponent implements OnInit {
  displayedColumns: string[] = ['num_control', 'apellido_est', 'nombre_est'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public dialogRef: MatDialogRef<ViewNewEstudiantesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.data = new MatTableDataSource(this.data);
    this.data.sort = this.sort;
  }
  click(){
    this.dialogRef.close();
  }
  key(event){
    if (event.key == 'Escape') {
      this.dialogRef.close();
    }
  }
}
