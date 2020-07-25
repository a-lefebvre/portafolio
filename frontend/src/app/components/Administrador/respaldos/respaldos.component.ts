import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BackupService } from 'src/app/services/backup/backup.service';

@Component({
  selector: 'app-respaldos',
  templateUrl: './respaldos.component.html',
  styleUrls: ['./respaldos.component.css']
})
export class RespaldosComponent implements OnInit {

  mode = new FormControl('over');  
  data: any = {
    user: 'usuario',
    password:'wNJSGq9h'
  }
  lapso: boolean = false;
  constructor(private backupService: BackupService) { }

  ngOnInit(): void {
  }
  createBackup(){
    this.lapso = true;
    this.backupService.createBackup(this.data).subscribe(
      res =>{
        console.log(res['text']);
        this.lapso = false;
      }
    );
  }
}
