import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Categoria } from 'src/app/_model/categoria';
import { CategoriaService } from 'src/app/_service/categoria.service';

@Component({
  selector: 'app-categoria-dialogo',
  templateUrl: './categoria-dialogo.component.html',
  styleUrls: ['./categoria-dialogo.component.css']
})
export class CategoriaDialogoComponent implements OnInit {
  constructor(public ref: DynamicDialogRef,public config: DynamicDialogConfig,private categoriaService: CategoriaService) { }

  cate: Categoria;
  v: any='A';
  ngOnInit(): void {
    this.cate = new Categoria();
    this.cate.idCategoria = this.config.data.idCategoria;
    this.cate.nombre = this.config.data.nombre;
    this.cate.estado = this.config.data.estado;
  }
  operar(){
    if(this.cate != null && this.cate.idCategoria > 0){
      this.categoriaService.modificar(this.cate).subscribe( () =>{
        this.categoriaService.listar().subscribe(data =>{
          this.categoriaService.categoriaCambio.next(data);
          this.categoriaService.mensajeCambio.next('Se Modifico correctamente..');
        });
      });

    }else{

      
      this.cate.estado =this.v;

      this.categoriaService.registrar(this.cate).subscribe(() =>{
        this.categoriaService.listar().subscribe(data =>{
          this.categoriaService.categoriaCambio.next(data);
          this.categoriaService.mensajeCambio.next('Se Registro correctamente..');
        });
      });

    }

    this.ref.close();

  }

  cancelar() {
    this.ref.close();
    
}

}
