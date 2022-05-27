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
}
