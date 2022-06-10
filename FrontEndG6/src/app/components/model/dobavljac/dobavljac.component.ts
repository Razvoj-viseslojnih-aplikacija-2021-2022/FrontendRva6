import { DobavljacDialogComponent } from './../../dialogs/dobavljac-dialog/dobavljac-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dobavljac } from 'src/app/models/dobavljac';
import { DobavljacService } from 'src/app/services/dobavljac.service';

@Component({
  selector: 'app-dobavljac',
  templateUrl: './dobavljac.component.html',
  styleUrls: ['./dobavljac.component.css']
})
export class DobavljacComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'adresa', 'kontakt', 'naziv', 'actions'];
  dataSource!: MatTableDataSource<Dobavljac>;
  subscription!: Subscription;

  constructor(private dobavljacService: DobavljacService,
    private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.dobavljacService.getAllDobavljac().subscribe
      (data => { this.dataSource = new MatTableDataSource(data) }),
      (error: Error) => { console.log(error.name + " " + error.message) }
  }

  public openDialog(flag: number, id?: number, adresa?: string, kontakt?: string, naziv?: string) {
    const dialogRef = this.dialog.open(DobavljacDialogComponent, { data: { id, adresa, kontakt, naziv } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.loadData();
      }
    })
  }


}
