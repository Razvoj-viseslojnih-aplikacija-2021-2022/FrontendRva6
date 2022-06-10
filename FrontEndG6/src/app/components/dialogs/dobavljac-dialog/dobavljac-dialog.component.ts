import { DobavljacService } from './../../../services/dobavljac.service';
import { Dobavljac } from './../../../models/dobavljac';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dobavljac-dialog',
  templateUrl: './dobavljac-dialog.component.html',
  styleUrls: ['./dobavljac-dialog.component.css']
})
export class DobavljacDialogComponent implements OnInit {

  public flag!: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DobavljacDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dobavljac,
    public dobavljacService: DobavljacService) { }

  ngOnInit(): void {
  }

  public add() {
    this.dobavljacService.addDobavljac(this.data)
      .subscribe(data => this.snackBar.open("Uspesno ste dodali dobavljaca: " + data.naziv, "U redu", { duration: 3500 })),
      (error: Error) => {
        console.log(error.name + " " + error.message),
          this.snackBar.open("Doslo je do greske", "U redu", { duration: 2500 })
      }
  }

  public update() {
    this.dobavljacService.updateDobavljac(this.data).subscribe
      (data => { this.snackBar.open("Dobavljac: " + data.naziv + " je uspesno azuriran", "U redu", { duration: 3500 }) }),
      (error: Error) => {
        console.log(error.name + " " + error.message),
        this.snackBar.open("Doslo je do greske", "U redu", { duration: 2500 })
      }
  }

  public delete() {
    this.dobavljacService.deleteDobavljac(this.data.id).subscribe
      (() => { this.snackBar.open("Dobavljac je uspesno obrisan", "U redu", { duration: 3500 }) }),
      (error: Error) => {
        console.log(error.name + " " + error.message),
        this.snackBar.open("Doslo je do greske", "U redu", { duration: 2500 })
      }
  }

  public cancel(){
    this.dialogRef.close();
    this.snackBar.open("Odustali ste od promena", "U redu", {duration:3500});
  }

}
