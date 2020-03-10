import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Personal } from '../_model/personal';
import { Subject } from 'rxjs';
import { Usuario } from './usuario';
@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  personalCambio = new Subject<Personal[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/personales`;
  constructor(private http:HttpClient) { }


  listar(){
    return this.http.get<Personal[]>(this.url);
  }
  listarxID(idPersonal: number){
    return this.http.get<Personal>(`${this.url}/${idPersonal}`);
  }

  registrar(usuario: Usuario, file?: File) {
    let formdata: FormData = new FormData();
    formdata.append('file', file);

    //multipart/form-data
    const userBlob = new Blob([JSON.stringify(usuario)], { type: "application/json" });
    formdata.append('usuario', userBlob);

    return this.http.post(`${this.url}`, formdata, {
      responseType: 'text'
    });
  }
  /*
  registrar(personal: Personal){
    return this.http.post(`${this.url}`,personal);
  }*/
  modificar(personal: Personal){
    return this.http.put(`${this.url}`,personal);
  }
  eliminar(idPersonal: number){
    return this.http.delete(`${this.url}/${idPersonal}`);
  }
}
