import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../_model/Rol';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  cargoCambio = new Subject<Rol[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/roles`;
  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Rol[]>(this.url);
  }

  listarxID(idRol: number){
    return this.http.get<Rol>(`${this.url}/${idRol}`);
  }

  registrar(Rol: Rol){
    return this.http.post(`${this.url}`,Rol);
  }
  modificar(Rol: Rol){
    return this.http.put(`${this.url}`,Rol);
  }
  eliminar(idRol: number){
    return this.http.delete(`${this.url}/${idRol}`);
  }
}
