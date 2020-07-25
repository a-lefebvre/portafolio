import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { ProfesorService } from 'src/app/services/profesor/profesor.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-listar-docencia',
  templateUrl: './listar-docencia.component.html',
  styleUrls: ['./listar-docencia.component.css']
})
export class ListarDocenciaComponent implements OnInit {
  displayedColumns: string[] = ['select', 'clave_profesor', 'nombre', 'apellido', 'email'];
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  profesores: any = new MatTableDataSource();
  grupos: any;

  constructor(private profesorService: ProfesorService,
    private dataService: DataService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProfesores();
  }
  private getProfesores() {
    this.profesorService.getProfesores().subscribe(
      res => {
        this.profesores = res;
        console.log(this.profesores);
        this.profesores = new MatTableDataSource(this.profesores);
        this.profesores.sort = this.sort;
      }
    );
  }
  private openSnackBar(message: string) {
    let snackBarRef = this._snackBar.open(message, '', { duration: 3000, verticalPosition: 'top' });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack was dismissed');
    });
  }
  sendData(row){
    console.log(row);
  }
}
