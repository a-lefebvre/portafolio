import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-view-new-grupos',
  templateUrl: './view-new-grupos.component.html',
  styleUrls: ['./view-new-grupos.component.css']
})
export class ViewNewGruposComponent implements OnInit {
  displayedColumns: string[] = ['clave_profesor', 'clave_materia', 'grupo', 'hora_inicio', 'hora_final'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private dialogRef: MatDialogRef<ViewNewGruposComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
      this.completeHoras();
      this.data = new MatTableDataSource(this.data);
      this.data.sort = this.sort;
    }
    private completeHoras(){
      this.data.forEach(element => {
        element.hora_inicio = element.hora_inicio+':00';
        element.hora_final = element.hora_final+':00';
      });
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
