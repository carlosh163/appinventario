import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/_service/categoria.service';
import { Categoria } from 'src/app/_model/categoria';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CategoriaDialogoComponent } from './categoria-dialogo/categoria-dialogo.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
  providers: [MessageService,DialogService]
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[];
  cols: any[];


  constructor(private categoriaService: CategoriaService,public dialogService: DialogService,public messageService: MessageService) { }

  ngOnInit(): void {

    this.cols = [
      { field: 'idCategoria', header: 'ID' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'estado', header: 'Estado' }
    ];

    this.categoriaService.categoriaCambio.subscribe( data =>{
      this.categorias = data;
    });

    this.categoriaService.mensajeCambio.subscribe(data =>{
      this.mensaje(data);

    });

    this.categoriaService.listar().subscribe(data=>{
      this.categorias = data;

    });
  }

  eliminar(idCargo: number){
    this.categoriaService.eliminar(idCargo).subscribe( () =>{
      this.categoriaService.listar().subscribe(data =>{
        this.categoriaService.categoriaCambio.next(data);
        this.categoriaService.mensajeCambio.next('Se Elimino correctamente..');
      });
    });

  }

  mensaje(detalle: string) {
    this.messageService.add({severity:'success', summary: 'Acción existosa', detail:detalle});
}



show(cate?: Categoria) {
  const ref = this.dialogService.open(CategoriaDialogoComponent, {
      header: 'Categoria',
      width: '30%',
      contentStyle: {"max-height": "350px", "overflow": "auto"},
      style:{"background":"green","display":"flex","flex-direction":"column"},
      data: cate
  });

  /*ref.onClose.subscribe((car: Car) =>{
      if (car) {
          this.messageService.add({severity:'info', summary: 'Car Selected', detail:'Vin:' + car.vin});
      }
  });*/
}


}
