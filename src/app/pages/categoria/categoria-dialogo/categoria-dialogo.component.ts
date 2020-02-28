import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Categoria } from 'src/app/_model/categoria';

@Component({
  selector: 'app-categoria-dialogo',
  templateUrl: './categoria-dialogo.component.html',
  styleUrls: ['./categoria-dialogo.component.css']
})
export class CategoriaDialogoComponent implements OnInit {
  constructor(public ref: DynamicDialogRef,public config: DynamicDialogConfig) { }

  cate: Categoria;
  ngOnInit(): void {
    this.cate = new Categoria();
    this.cate.idCategoria = this.config.data.idCategoria;
    this.cate.nombre = this.config.data.nombre;
    this.cate.estado = this.config.data.estado;
  }
  operar(){

  }

  cancelar() {
    this.ref.close();
    
}

}
