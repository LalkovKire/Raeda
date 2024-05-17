import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CarLocation, CarLocationRequest } from '../dashboard/dash-service-object';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private token = localStorage.getItem('token');
  private url = "http://localhost:8080/api/loc";
  private http = inject(HttpClient);
  
  constructor() { }

  getAllLocations() : Observable<CarLocation[]> {
    return this.http.get<CarLocation[]>(`${this.url}`);
  }

  addNewLocation(loc: CarLocationRequest) : Observable<CarLocation> {
    if (this.token != null) {
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }

      const requestOptions = {
        headers: new HttpHeaders(headerDict),
      };

    return this.http.post<CarLocation>(`${this.url}`, loc,requestOptions);
    } else 
      throw Error("Something went wrong while adding location");
  }

  editLocation(id: number, loc: CarLocationRequest) : Observable<CarLocation> {
    if (this.token != null) {
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }

      const requestOptions = {
        headers: new HttpHeaders(headerDict),
      };

    return this.http.put<CarLocation>(`${this.url}/edit/${id}`,loc, requestOptions);
    } else throw Error("Something went wrong while deleting");
  }

  deleteLocationById(id: number) : Observable<CarLocation> {
    if (this.token != null) {
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }

      const requestOptions = {
        headers: new HttpHeaders(headerDict),
      };

    return this.http.delete<CarLocation>(`${this.url}/${id}`, requestOptions);
    } else throw Error("Something went wrong while deleting");
  }

}
