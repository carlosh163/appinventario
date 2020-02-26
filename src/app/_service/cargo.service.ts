import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cargo } from '../_model/cargo';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  cargoCambio = new Subject<Cargo[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST}/cargos`;
  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Cargo[]>(this.url);
  }

  listarxID(idCargo: number){
    return this.http.get<Cargo>(`${this.url}/${idCargo}`);
  }

  registrar(cargo: Cargo){
    return this.http.post(`${this.url}`,cargo);
  }
  modificar(cargo: Cargo){
    return this.http.put(`${this.url}`,cargo);
  }
  eliminar(idCargo: number){
    return this.http.delete(`${this.url}/${idCargo}`);
  }
}
