import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dobavljac } from 'src/app/models/dobavljac';
import { DobavljacService } from 'src/app/services/dobavljac.service';

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
    private dobavljacService: DobavljacService) { }

  ngOnInit(): void {
  }

  public add() {
    this.dobavljacService.addDobavljac(this.data).subscribe(
      data => {
        this.snackBar.open("Dobavljac: " + data.naziv + " je uspešno dodat", "U redu", { duration: 3500 })
      }
    ),
      (error: Error) => {
        console.log(error.name + " " + error.message),
        this.snackBar.open("Dogodila se greška", "U redu", { duration: 3500 })
      }
  }

  public update() {
    this.dobavljacService.updateDobavljac(this.data).subscribe(
      data => {
        this.snackBar.open("Dobavljac: " + data.naziv + " je uspešno modifikovan", "U redu", { duration: 3500 })
      }
    ),
      (error: Error) => {
        console.log(error.name + " " + error.message),
        this.snackBar.open("Dogodila se greška", "U redu", { duration: 3500 })
      }
  }

  public delete() {
    this.dobavljacService.deleteDobavljac(this.data.id).subscribe(
      () => {
        this.snackBar.open("Dobavljac je uspešno obrisan", "U redu", { duration: 3500 })
      }
    ),
      (error: Error) => {
        console.log(error.name + " " + error.message),
        this.snackBar.open("Dogodila se greška", "U redu", { duration: 3500 })
      }
  }

  public cancel() {
    this.dialogRef.close();
    this.snackBar.open("odustali ste od izmena", "U redu" ,{duration: 3500});
  }
}
