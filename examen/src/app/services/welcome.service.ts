import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  private apiUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) { }

  obtenerCandidato(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/candidato`);
  }

  obtenerVersion(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/version`);
  }
}
