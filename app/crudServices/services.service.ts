import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

urlConection = 'http://localhost:5008/api/Paciente/'

  constructor(private http: HttpClient ) { }

  listPatients(): Observable<any>  {
    return this.http.get(`${this.urlConection}Lista`)
  }

  listPatientsId(id: any): Observable<any>  {
    return this.http.get(`${this.urlConection}Lista/${id}`)
  }

  savePatient(data: any): Observable<any>  {
    return this.http.post(`${this.urlConection}Guardar`, data)
  }

  putPatient(data: any): Observable<any>  {
    return this.http.put(`${this.urlConection}Editar`, data)
  }

  DeletePatient(id: any): Observable<any>  {
    return this.http.delete(`${this.urlConection}Eliminar/${id}`)
  }
}
