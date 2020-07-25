import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-view-new-profesores',
  templateUrl: './view-new-profesores.component.html',
  styleUrls: ['./view-new-profesores.component.css']
})
export class ViewNewProfesoresComponent implements OnInit {
  displayedColumns: string[] = ['rfc', 'nombre', 'apellido', 'email'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private dialogRef: MatDialogRef<ViewNewProfesoresComponent>,
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
