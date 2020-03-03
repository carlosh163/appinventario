import { Component, OnInit } from '@angular/core';
import { Bien } from 'src/app/_model/bien';
import { BienService } from 'src/app/_service/bien.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-bien',
  templateUrl: './bien.component.html',
  styleUrls: ['./bien.component.css'],
  providers: [MessageService]
})
export class BienComponent implements OnInit {
  
  bienes: Bien[];
  cols: any[];


  displayModal: boolean;
  bienI: Bien;

  vEDefOpera: string;
  catexBien: string;
  marcaxBien: string;


  constructor(private bienService: BienService,private messageService: MessageService,public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.bienI = new Bien();

    this.cols = [
      { field: 'codPatrimonial', header: 'Codigo Patrimonial' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'estadoUso', header: 'Estado de Uso' }, 
      { field: 'modelo', header: 'Modelo' },
      { field: 'categoria.nombre', header: 'Categoria' },
      { field: 'marca.nombre', header: 'Marca' }, 
      { field: 'codLectora', header: 'Cod. Barras' },
      

    ];

    this.bienService.bienCambio.subscribe( data =>{
      this.bienes = data;
    });

    this.bienService.mensajeCambio.subscribe(data =>{
      this.mensaje(data);

    });



    this.bienService.listar().subscribe(data => {
      this.bienes = data;
    });
    
  }

  eliminar(idPersonal: number){
    this.bienService.eliminar(idPersonal).subscribe( () =>{
      this.bienService.listar().subscribe(data =>{
        this.bienService.bienCambio.next(data);
        this.bienService.mensajeCambio.next('Se Elimino correctamente..');
      });
    });

  }

  mensaje(detalle: string) {
    this.messageService.add({severity:'success', summary: 'Acción existosa', detail:detalle});
}
  
showModalDialog(b: Bien) {
  this.displayModal = true;
  this.bienI = b;
  if(String(this.bienI.estadoUso) == 'O'){
    this.vEDefOpera = "Operativo"

  }else{
    this.vEDefOpera = "Malogrado"
  }

  this.catexBien= this.bienI.categoria.nombre;
  this.marcaxBien= this.bienI.marca.nombre;
}

}
