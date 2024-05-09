import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashCarModel } from './dash-service-object';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = "http://localhost:8080/api/";

  constructor(private http: HttpClient){ 
  }

  fetchAllCars() : Observable<DashCarModel[]> {
    return this.http.get<DashCarModel[]>(`${this.url}cars`);
  }

  deleteCarById(id : number) : Observable<DashCarModel> {
    let token = localStorage.getItem('token');
    
    if (token != null) {
      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      const requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders(headerDict), 
      };
      return this.http.delete<DashCarModel>(`${this.url}cars/${id}`,requestOptions);
    } else {
      return this.http.delete<DashCarModel>(`${this.url}cars/${id}`);
    }
  }
}
