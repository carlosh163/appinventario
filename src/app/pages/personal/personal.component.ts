import { Component, OnInit } from '@angular/core';
import { PersonalService } from 'src/app/_service/personal.service';
import { Personal } from 'src/app/_model/personal';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
  providers: [MessageService]
})
export class PersonalComponent implements OnInit {

  //displayedColumns = ['idPersonal', 'Nombres', 'Apellidos', 'Fecha Nac.', 'DNI', 'Genero', 'Cargo', 'Acciones'];
  personales: Personal[];
  cols: any[];

  constructor(private personalService: PersonalService,private messageService: MessageService) { }

  ngOnInit() {

    this.cols = [
      { field: 'idPersonal', header: 'ID' },
      { field: 'nombres', header: 'Nombres' },
      { field: 'apellidos', header: 'Apellidos' },
      { field: 'fechaNac', header: 'Fecha Nac.' },
      { field: 'dni', header: 'DNI' },
      { field: 'genero', header: 'Genero' },
      { field: 'cargo.nombre', header: 'Cargo' },
    ];

    this.personalService.personalCambio.subscribe( data =>{
      this.personales = data;
    });

    this.personalService.mensajeCambio.subscribe(data =>{
      this.mensaje(data);

    });



    this.personalService.listar().subscribe(data => {
      //console.log(data);
      this.personales = data;
    });

  }

  eliminar(idPersonal: number){
    this.personalService.eliminar(idPersonal).subscribe( () =>{
      this.personalService.listar().subscribe(data =>{
        this.personalService.personalCambio.next(data);
        this.personalService.mensajeCambio.next('Se Elimino correctamente..');
      });
    });

  }

  mensaje(detalle: string) {
    this.messageService.add({severity:'success', summary: 'Acción existosa', detail:detalle});
}

}
