import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Personal } from '../_model/personal';
import { Subject } from 'rxjs';
import { Usuario } from '../_model/usuario';
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

  listarxIDF(idPersonal: number){
    return this.http.get(`${this.url}/f/${idPersonal}`, {
      responseType: 'blob'
    });
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
  modificar(personal: Personal, file?: File) {
    let formdata: FormData = new FormData();
    formdata.append('file', file);

    //multipart/form-data
    const userBlob = new Blob([JSON.stringify(personal)], { type: "application/json" });
    formdata.append('personal', userBlob);

    return this.http.put(`${this.url}`, formdata, {
      responseType: 'text'
    });
  }
  /*eliminar(idPersonal: number){
    return this.http.delete(`${this.url}/${idPersonal}`);
  }*/
}
