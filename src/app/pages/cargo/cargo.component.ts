import { Component, OnInit } from '@angular/core';
import { CargoService } from 'src/app/_service/cargo.service';
import { Cargo } from 'src/app/_model/cargo';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css'],
  providers: [MessageService]
})
export class CargoComponent implements OnInit {

  cargos: Cargo[];
  cols: any[];
  constructor(private cargoService: CargoService,private messageService: MessageService,public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'idCargo', header: 'ID' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'estado', header: 'Estado' }
    ];

    this.cargoService.cargoCambio.subscribe( data =>{
      this.cargos = data;
    });

    this.cargoService.mensajeCambio.subscribe(data =>{
      this.mensaje(data);

    });

    this.cargoService.listar().subscribe(data => {
      //console.log(data);
      this.cargos = data;
    });
  }

  eliminar(idCargo: number){
    this.cargoService.eliminar(idCargo).subscribe( () =>{
      this.cargoService.listar().subscribe(data =>{
        this.cargoService.cargoCambio.next(data);
        this.cargoService.mensajeCambio.next('Se Elimino correctamente..');
      });
    });

  }

  mensaje(detalle: string) {
    this.messageService.add({severity:'success', summary: 'Acción existosa', detail:detalle});
}

}
