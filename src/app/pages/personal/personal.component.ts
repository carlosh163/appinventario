import { Component, OnInit } from '@angular/core';
import { PersonalService } from 'src/app/_service/personal.service';
import { Personal } from 'src/app/_model/personal';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  displayedColumns = ['idPersonal', 'Nombres', 'Apellidos', 'Fecha Nac.', 'DNI', 'Genero', 'Cargo', 'Acciones'];
  personales: Personal[];
  cols: any[];

  constructor(private personalService: PersonalService) { }

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



    this.personalService.listar().subscribe(data => {
      //console.log(data);
      this.personales = data;
    });

  }

}
