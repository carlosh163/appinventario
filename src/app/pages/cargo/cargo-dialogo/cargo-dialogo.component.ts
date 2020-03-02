import { Component, OnInit } from '@angular/core';
import { Cargo } from 'src/app/_model/cargo';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CargoService } from 'src/app/_service/cargo.service';

@Component({
  selector: 'app-cargo-dialogo',
  templateUrl: './cargo-dialogo.component.html',
  styleUrls: ['./cargo-dialogo.component.css']
})
export class CargoDialogoComponent implements OnInit {

  carg: Cargo;
  v: any = 'A';
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private marcaService: CargoService) { }

  ngOnInit(): void {
    this.carg = new Cargo();
    this.carg.idCargo = this.config.data.idCargo;
    this.carg.nombre = this.config.data.nombre;
    this.carg.estado = this.config.data.estado;
  }

  operar() {
    if (this.carg != null && this.carg.idCargo > 0) {
      this.marcaService.modificar(this.carg).subscribe(() => {
        this.marcaService.listar().subscribe(data => {
          this.marcaService.cargoCambio.next(data);
          this.marcaService.mensajeCambio.next('Se Modifico correctamente..');
        });
      });

    } else {


      this.carg.estado = this.v;

      this.marcaService.registrar(this.carg).subscribe(() => {
        this.marcaService.listar().subscribe(data => {
          this.marcaService.cargoCambio.next(data);
          this.marcaService.mensajeCambio.next('Se Registro correctamente..');
        });
      });

    }

    this.ref.close();

  }

  cancelar() {
    this.ref.close();

  }

}
