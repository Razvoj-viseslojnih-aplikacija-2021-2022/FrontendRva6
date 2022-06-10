import { Artikl } from './../models/artikl';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ARTIKL_URI } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ArtiklService {

  constructor(private httpClient: HttpClient) { }

  public getAllArtikls(): Observable<any>{
    return this.httpClient.get(`${ARTIKL_URI}`)
  }

  public addArtikl(artikl : Artikl): Observable<any>{
    artikl.id = 100000;
    return this.httpClient.post(`${ARTIKL_URI}`, artikl);
  }

  public updateArtikl(artikl : Artikl): Observable<any>{
    return this.httpClient.put(`${ARTIKL_URI}`, artikl);
  }

  public deleteArtikl(id: number): Observable<any>{
    return this.httpClient.delete(`${ARTIKL_URI}/${id}`);
  }
}
