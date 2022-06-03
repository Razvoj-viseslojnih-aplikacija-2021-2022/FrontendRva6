import { Dobavljac } from './../../../models/dobavljac';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { DobavljacService } from 'src/app/services/dobavljac.service';
import { MatDialog } from '@angular/material/dialog';
import { DobavljacDialogComponent } from '../../dialogs/dobavljac-dialog/dobavljac-dialog.component';

@Component({
  selector: 'app-dobavljac',
  templateUrl: './dobavljac.component.html',
  styleUrls: ['./dobavljac.component.css']
})
export class DobavljacComponent implements OnInit {

  dataSource! : MatTableDataSource<Dobavljac>;
  displayedColumns = ['id', 'adresa', 'kontakt','naziv', 'actions'];
  subscription! : Subscription;


  constructor(private dobavljacService: DobavljacService,
              private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.subscription = this.dobavljacService.getAllDobavljac().subscribe
    (data => {this.dataSource = new MatTableDataSource(data)}),
    (error: Error) => {console.log(error.name + " " + error.message)}
  }

  public openDialog(flag: number, id?: number, adresa?: string, kontakt?: string, naziv?:string){
    const dialogRef = this.dialog.open(DobavljacDialogComponent,{data:{id, adresa, kontakt, naziv}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(
      result =>{
        if(result == 1){
          this.loadData();
        }
      }
    )
  }
}
