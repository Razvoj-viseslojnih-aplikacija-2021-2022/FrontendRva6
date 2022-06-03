import { ArtiklService } from './../../../services/artikl.service';
import { Artikl } from 'src/app/models/artikl';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-artikl-dialog',
  templateUrl: './artikl-dialog.component.html',
  styleUrls: ['./artikl-dialog.component.css']
})
export class ArtiklDialogComponent implements OnInit {

  public flag!: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ArtiklDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Artikl,
    private artiklService: ArtiklService) { }

  ngOnInit(): void {
  }

  public add() {
    this.artiklService.addArtikl(this.data).subscribe(
      data => {
        this.snackBar.open("Artikl: " + data.naziv + " je uspešno dodat", "U redu", { duration: 3500 })
      }
    ),
      (error: Error) => {
        console.log(error.name + " " + error.message),
        this.snackBar.open("Dogodila se greška", "U redu", { duration: 3500 })
      }
  }

  public update() {
    this.artiklService.updateArtikl(this.data).subscribe(
      data => {
        this.snackBar.open("Artikl: " + data.naziv + " je uspešno modifikovan", "U redu", { duration: 3500 })
      }
    ),
      (error: Error) => {
        console.log(error.name + " " + error.message),
        this.snackBar.open("Dogodila se greška", "U redu", { duration: 3500 })
      }
  }

  public delete() {
    this.artiklService.deleteArtikl(this.data.id).subscribe(
      () => {
        this.snackBar.open("Artikl je uspešno obrisan", "U redu", { duration: 3500 })
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
