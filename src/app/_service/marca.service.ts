import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Marca } from '../_model/marca';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  marcaCambio = new Subject<Marca[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/marcas`;
  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Marca[]>(this.url);
  }

  listarxID(idMarca: number){
    return this.http.get<Marca>(`${this.url}/${idMarca}`);
  }

  registrar(Marca: Marca){
    return this.http.post(`${this.url}`,Marca);
  }
  modificar(Marca: Marca){
    return this.http.put(`${this.url}`,Marca);
  }
  eliminar(idMarca: number){
    return this.http.delete(`${this.url}/${idMarca}`);
  }
}
