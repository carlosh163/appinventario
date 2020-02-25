import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Personal } from '../_model/personal';
@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  url: string = `${environment.HOST}/personales`;
  constructor(private http:HttpClient) { }


  listar(){
    return this.http.get<Personal[]>(this.url);
  }
  listarxID(idPersonal: number){
    return this.http.get<Personal>(`${this.url}/${idPersonal}`);
  }

  registrar(personal: Personal){
    return this.http.post(`${this.url}`,personal);
  }
  modificar(personal: Personal){
    return this.http.put(`${this.url}`,personal);
  }
  eliminar(idPersonal: number){
    return this.http.delete(`${this.url}/${idPersonal}`);
  }
}
