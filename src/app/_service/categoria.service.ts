import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Categoria } from '../_model/categoria';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaCambio = new Subject<Categoria[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/categorias`;
  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Categoria[]>(this.url);
  }

  listarxID(idCategoria: number){
    return this.http.get<Categoria>(`${this.url}/${idCategoria}`);
  }

  registrar(Categoria: Categoria){
    return this.http.post(`${this.url}`,Categoria);
  }
  modificar(Categoria: Categoria){
    return this.http.put(`${this.url}`,Categoria);
  }
  eliminar(idCategoria: number){
    return this.http.delete(`${this.url}/${idCategoria}`);
  }
}
