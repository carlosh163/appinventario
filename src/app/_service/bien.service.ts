import { Injectable } from '@angular/core';
import { Bien } from '../_model/bien';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BienService {

  bienCambio = new Subject<Bien[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/bienes`;
  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Bien[]>(this.url);
  }

  listarxID(idBien: number){
    return this.http.get<Bien>(`${this.url}/${idBien}`);
  }

  registrar(Bien: Bien){
    return this.http.post(`${this.url}`,Bien);
  }
  modificar(Bien: Bien){
    return this.http.put(`${this.url}`,Bien);
  }
  eliminar(idBien: number){
    return this.http.delete(`${this.url}/${idBien}`);
  }
}
