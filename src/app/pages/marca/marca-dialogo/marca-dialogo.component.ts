import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/_model/marca';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MarcaService } from 'src/app/_service/marca.service';

@Component({
  selector: 'app-marca-dialogo',
  templateUrl: './marca-dialogo.component.html',
  styleUrls: ['./marca-dialogo.component.css']
})
export class MarcaDialogoComponent implements OnInit {

  marc: Marca;
  v: any = 'A';

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private marcaService: MarcaService) { }

  ngOnInit(): void {
    this.marc = new Marca();
    this.marc.idMarca = this.config.data.idMarca;
    this.marc.nombre = this.config.data.nombre;
    this.marc.estado = this.config.data.estado;
  }

  operar() {
    if (this.marc != null && this.marc.idMarca > 0) {
      this.marcaService.modificar(this.marc).subscribe(() => {
        this.marcaService.listar().subscribe(data => {
          this.marcaService.marcaCambio.next(data);
          this.marcaService.mensajeCambio.next('Se Modifico correctamente..');
        });
      });

    } else {


      this.marc.estado = this.v;

      this.marcaService.registrar(this.marc).subscribe(() => {
        this.marcaService.listar().subscribe(data => {
          this.marcaService.marcaCambio.next(data);
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
