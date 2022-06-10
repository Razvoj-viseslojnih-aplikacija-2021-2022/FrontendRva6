import { PorudzbinaService } from './../../../services/porudzbina.service';
import { Porudzbina } from './../../../models/porudzbina';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DobavljacService } from 'src/app/services/dobavljac.service';
import { Dobavljac } from 'src/app/models/dobavljac';

@Component({
  selector: 'app-porudzbina-dialog',
  templateUrl: './porudzbina-dialog.component.html',
  styleUrls: ['./porudzbina-dialog.component.css']
})
export class PorudzbinaDialogComponent implements OnInit {

  public flag!: number;
  dobavljaci!: Dobavljac[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PorudzbinaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Porudzbina,
    public dobavljacService: DobavljacService,
    public porudzbinaService: PorudzbinaService) { }

  ngOnInit(): void {
    this.dobavljacService.getAllDobavljac().subscribe(
      result => {
        this.dobavljaci = result;
      }
    )
  }

  public compare(a:any, b:any){
    return a.id == b.id;
  }

  public add() {
    this.porudzbinaService.addPorudzbina(this.data)
      .subscribe(data => this.snackBar.open("Uspesno ste dodali porudzbinu: " + data.id, "U redu", { duration: 3500 })),
      (error: Error) => {
        console.log(error.name + " " + error.message),
          this.snackBar.open("Doslo je do greske", "U redu", { duration: 2500 })
      }
  }

  public update() {
    this.porudzbinaService.updatePorudzbina(this.data).subscribe
      (data => { this.snackBar.open("Porudzbina: " + data.id + " je uspesno azurirana", "U redu", { duration: 3500 }) }),
      (error: Error) => {
        console.log(error.name + " " + error.message),
        this.snackBar.open("Doslo je do greske", "U redu", { duration: 2500 })
      }
  }

  public delete() {
    this.porudzbinaService.deletePorudzbina(this.data.id).subscribe
      (() => { this.snackBar.open("Porudzbina je uspesno obrisana", "U redu", { duration: 3500 }) }),
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
