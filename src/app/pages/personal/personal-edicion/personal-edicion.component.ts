import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CargoService } from 'src/app/_service/cargo.service';
import { Cargo } from 'src/app/_model/cargo';
import { FormGroup, FormControl } from '@angular/forms';
import { PersonalService } from 'src/app/_service/personal.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Personal } from 'src/app/_model/personal';
import * as moment from 'moment';

@Component({
  selector: 'app-personal-edicion',
  templateUrl: './personal-edicion.component.html',
  styleUrls: ['./personal-edicion.component.css']
})
export class PersonalEdicionComponent implements OnInit {

  genero: SelectItem[];
  cargo: Cargo[];
  value: Date;
  es: any;

  form: FormGroup;
  edicion: boolean;
  id: number;

  personal: Personal;
  selectedCargo: Cargo  = new Cargo();
  //valCelular: string;


  constructor(private cargoService: CargoService,private router :Router,private route: ActivatedRoute,private personalService: PersonalService) {

    this.genero = [
      { label: 'Seleccione un Genero', value: null },
      { label: 'Masculino', value: 'M' },
      { label: 'Femenino', value: 'F' }
    ];
  }

  ngOnInit() {
    this.personal = new Personal();

    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "MAR", "MI", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }


    //Cargando data de Cargos:
    this.cargoService.listar().subscribe(data => {
      this.cargo = data;
    });

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'celular': new FormControl(''),
      'fechaNac': new FormControl(''),
      'nroDni': new FormControl(''),
      'genero': new FormControl(''),
      'cargo': new FormControl('')

    });

    //Obteniendo por ID:
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion= this.id != null;

      this.initForm();

    });



  }

  initForm(){
    if(this.edicion){
      //carga la data del servicio hacia el form.
      this.personalService.listarxID(this.id).subscribe(data =>{
        this.form = new FormGroup({
          'id': new FormControl(data.idPersonal),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos),
          'celular': new FormControl(data.celular),
          'fechaNac': new FormControl(new Date(data.fechaNac)),
          'nroDni': new FormControl(data.dni),
          'genero': new FormControl(data.genero),
          'cargo': new FormControl(data.cargo)
        });
        this.selectedCargo.idCargo = data.cargo.idCargo;
        
      });

    }
  }

  operar() {
    this.personal.idPersonal = this.form.value['id'];
    this.personal.nombres = this.form.value['nombres'];
    this.personal.apellidos = this.form.value['apellidos'];
    this.personal.celular = this.form.value['celular'];
    this.personal.dni = this.form.value['nroDni'];
    this.personal.genero = this.form.value['genero'];
    
    let cargo = new Cargo();
    cargo.idCargo = this.selectedCargo.idCargo;
    this.personal.cargo = cargo;
    this.personal.fechaNac = moment(this.form.value['fechaNac']).format('YYYY-MM-DD');//localISOTime;

    console.log(this.personal.cargo);
    if(this.edicion){
      this.personalService.modificar(this.personal).subscribe( () =>{
        this.personalService.listar().subscribe(data =>{
          this.personalService.personalCambio.next(data);
        });
      });

    }else{
      //insercion
      this.personalService.registrar(this.personal).subscribe(() =>{
        this.personalService.listar().subscribe(data =>{
          this.personalService.personalCambio.next(data);
        });
      });
    }

    this.router.navigate(['personal']);
    

  }

}