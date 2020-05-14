import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LatLong } from '../models/lat-long';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  apiUrl = "https://localhost:44317/api/LatLongs";

  constructor(private http: HttpClient) { }

  getLatLongs(): Observable<LatLong[]> {
    return this.http.get<LatLong[]>(this.apiUrl);
  }

  createLatLong(latLong: LatLong): Observable<LatLong> {
    console.log("hit");
    return this.http.post<LatLong>(this.apiUrl, latLong);
  }

}
