import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CargoService } from 'src/app/_service/cargo.service';
import { Cargo } from 'src/app/_model/cargo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonalService } from 'src/app/_service/personal.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Personal } from 'src/app/_model/personal';
import * as moment from 'moment';
import { Usuario } from 'src/app/_service/usuario';

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

  usuario: Usuario;
  currentFileUpload: File;


  constructor(private cargoService: CargoService,private router :Router,private route: ActivatedRoute,private personalService: PersonalService) {

    this.genero = [
      { label: 'Seleccione un Genero', value: null },
      { label: 'Masculino', value: 'M' },
      { label: 'Femenino', value: 'F' }
    ];

  }

  ngOnInit() {
    this.personal = new Personal();
    this.usuario = new Usuario();

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


    //Cargando data de Cargos: Combobox
    this.cargoService.listar().subscribe(data => {
      this.cargo = data;
    });

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl('',Validators.required),
      'apellidos': new FormControl('',Validators.required),
      'celular': new FormControl('',Validators.compose([Validators.required, Validators.minLength(9),Validators.maxLength(9)])),
      'fechaNac': new FormControl('',Validators.required),
      'nroDni': new FormControl('',Validators.compose([Validators.required, Validators.minLength(8),Validators.maxLength(8)])),
      'genero': new FormControl('',Validators.required),
      'cargo': new FormControl('',Validators.required),
      'modalidad': new FormControl('C'),

      'user': new FormControl(''),
      'password': new FormControl('')

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
          'cargo': new FormControl(data.cargo),
          'modalidad': new FormControl(data.modalidad),
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
    this.personal.modalidad = this.form.value['modalidad'];
    //Usuario:
    this.usuario.personal = this.personal;
    this.usuario.username = this.form.value['user'];
    this.usuario.password = this.form.value['password'];
    this.usuario.enabled = true;
    
    let cargo = new Cargo();
    cargo.idCargo = this.selectedCargo.idCargo;
    this.personal.cargo = cargo;
    this.personal.fechaNac = moment(this.form.value['fechaNac']).format('YYYY-MM-DD');//localISOTime;


    //Validando si cargo una foto:
    /*if (this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([""], "blanco");
    }*/

    this.currentFileUpload = new File([""], "blanco");

    if(this.edicion){
      this.personalService.modificar(this.personal).subscribe( () =>{
        this.personalService.listar().subscribe(data =>{
          this.personalService.personalCambio.next(data);
          this.personalService.mensajeCambio.next('Se Modifico correctamente..');
        });
      });

    }else{
      //insercion
      console.log(this.usuario);
      this.personalService.registrar(this.usuario,this.currentFileUpload).subscribe( () => {
        this.personalService.listar().subscribe(data =>{
          this.personalService.personalCambio.next(data);
          this.personalService.mensajeCambio.next('Se Registro correctamente..');
        });
      });
    }

    this.router.navigate(['personal']);
    

  }

}
