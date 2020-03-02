import { Component, OnInit } from '@angular/core';
import { MarcaService } from 'src/app/_service/marca.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Marca } from 'src/app/_model/marca';
import { MarcaDialogoComponent } from './marca-dialogo/marca-dialogo.component';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css'],
  providers: [MessageService,DialogService]
})
export class MarcaComponent implements OnInit {

  cols: any[];
  marcas: Marca[];

  constructor(private categoriaService: MarcaService,public dialogService: DialogService,public messageService: MessageService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'idCategoria', header: 'ID' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'estado', header: 'Estado' }
    ];

    this.categoriaService.marcaCambio.subscribe( data =>{
      this.marcas = data;
    });

    this.categoriaService.mensajeCambio.subscribe(data =>{
      this.mensaje(data);

    });

    this.categoriaService.listar().subscribe(data=>{
      this.marcas = data;

    });
  }

  eliminar(idCargo: number) {
    this.categoriaService.eliminar(idCargo).subscribe(() => {
      this.categoriaService.listar().subscribe(data => {
        this.categoriaService.marcaCambio.next(data);
        this.categoriaService.mensajeCambio.next('Se Elimino correctamente..');
      });
    });

  }

  mensaje(detalle: string) {
    this.messageService.add({ severity: 'success', summary: 'Acción existosa', detail: detalle });
  }



  show(cate?: Marca) {
    let cateS = cate != null ? cate : new Marca();
    const ref = this.dialogService.open(MarcaDialogoComponent, {
      header: 'Marca',
      width: '30%',
      contentStyle: { "max-height": "350px", "overflow": "auto" },
      style: { "background": "green"},
      data: cateS
    });
  }

}
