import { ArtiklService } from './../../../services/artikl.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Artikl } from 'src/app/models/artikl';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-artikl',
  templateUrl: './artikl.component.html',
  styleUrls: ['./artikl.component.css']
})
export class ArtiklComponent implements OnInit, OnDestroy {

  dataSource! : MatTableDataSource<Artikl>;
  displayedColumns = ['id', 'naziv', 'proizvodjac', 'actions'];
  subscription! : Subscription;


  constructor(private artiklService: ArtiklService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.subscription = this.artiklService.getAllArtikls().subscribe
    (data => {this.dataSource = new MatTableDataSource(data)}),
    (error: Error) => {console.log(error.name + " " + error.message)}
  }

}
