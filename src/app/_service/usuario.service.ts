import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Usuario } from '../_model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = `${environment.HOST}/usuarios`;
  constructor(private http: HttpClient) { }

  registrar(usuario: Usuario) {
    return this.http.post(this.url, usuario);
  }
  modificar(usuario: Usuario) {
    return this.http.put(this.url, usuario);
  }
  listarxID(idUsu: number){
    return this.http.get<Usuario>(`${this.url}/${idUsu}`);
  }
  eliminar(idUsuario: number){
    return this.http.delete(`${this.url}/${idUsuario}`);
  }

}
