import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CarLocation } from '../dashboard/dash-service-object';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private url = "http://localhost:8080/api/loc";
  private http = inject(HttpClient);
  
  constructor() { }

  getAllLocations() : Observable<CarLocation[]> {
    return this.http.get<CarLocation[]>(`${this.url}`)
  }
}
