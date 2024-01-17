import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  obtenerProveedores(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/proveedores`);
  }

  deleteProveedor(proveedorID: number){
		return this.http.delete(this.apiUrl+'/proveedores/'+proveedorID);
  }
  
  agregarProveedor(nombre: string, descripcion: string){
    console.log(nombre);
    const body = {
      "nombre": nombre,
      "descripcion": descripcion
    }
		return this.http.post(this.apiUrl+'/proveedores', body);
	}
}
