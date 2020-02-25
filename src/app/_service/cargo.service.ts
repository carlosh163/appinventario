import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cargo } from '../_model/cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  url: string = `${environment.HOST}/cargos`;
  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Cargo[]>(this.url);
  }
}
