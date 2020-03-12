import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CargoService } from 'src/app/_service/cargo.service';
import { Cargo } from 'src/app/_model/cargo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonalService } from 'src/app/_service/personal.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Personal } from 'src/app/_model/personal';
import * as moment from 'moment';
import { Usuario } from 'src/app/_model/usuario';
import { DomSanitizer } from '@angular/platform-browser';
import { UsuarioService } from 'src/app/_service/usuario.service';

import { switchMap } from 'rxjs/operators';
import { RolService } from 'src/app/_service/rol.service';
import { Rol } from 'src/app/_model/rol';

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
  selectedCargo: Cargo = new Cargo();
  //valCelular: string;

  usuario: Usuario;

  currentFileUpload: File;
  labelFile: string;
  selectedFiles: FileList;

  imagenData: any;
  imagenEstado: boolean = false;

  selectedRolesd: string[] = ['USER', 'v2']



  /*selectedRoles: Rol[] = [
    {idRol:1,nombre:"ADMIN",descripcion:"Administrador"},
    {idRol:2,nombre:"USER",descripcion:"Usuario"},
   
  ];*/



  listRoles: Rol[];

  //selectedRolesF :Rol[] = [];

  selectedRolesF: number[] = [];

  listSelectRoles: Rol[] = [];


  constructor(private cargoService: CargoService, private router: Router, private route: ActivatedRoute,
    private personalService: PersonalService, private sanitization: DomSanitizer, private userService: UsuarioService, private rolService: RolService) {

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
      'nombres': new FormControl('', Validators.required),
      'apelliP': new FormControl('', Validators.required),
      'apelliM': new FormControl('', Validators.required),

      'celular': new FormControl('', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9)])),
      'fechaNac': new FormControl('', Validators.required),
      'nroDni': new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8)])),
      'genero': new FormControl('', Validators.required),
      'cargo': new FormControl('', Validators.required),
      'modalidad': new FormControl('C'),

      'password': new FormControl(''),

    });

    //Obteniendo por ID:
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;

      this.initForm();


    });

  }


  initForm() {
    if (this.edicion) {
      //carga la data del servicio hacia el form.
      this.personalService.listarxID(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idPersonal),
          'nombres': new FormControl(data.nombres),
          'apelliP': new FormControl(data.apelliPaterno),
          'apelliM': new FormControl(data.apelliMaterno),
          'celular': new FormControl(data.celular),
          'fechaNac': new FormControl(new Date(data.fechaNac)),
          'nroDni': new FormControl(data.dni),
          'genero': new FormControl(data.genero),
          'cargo': new FormControl(data.cargo),
          'modalidad': new FormControl(data.modalidad),

          'password': new FormControl(''),
        });
        this.selectedCargo.idCargo = data.cargo.idCargo;

        this.personalService.listarxIDF(this.id).subscribe(data => {
          if (data.size > 0) {
            this.convertir(data);
          }
        });

        //cargando lista de checks : Roles:
        this.rolService.listar().subscribe(data => {
          this.listRoles = data;
        });


      });


      //enviando roles que le pertenecen:
      this.userService.listarxID(this.id).subscribe(data => {
        data.roles.forEach(d => {
          this.selectedRolesF.push(d.idRol);
        });

        //this.selectedRolesF = data.roles;
        
      });

    }
  }

  convertir(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let base64 = reader.result;
      this.imagenData = base64;
      this.setear(base64);
    }
  }
  setear(base64: any) {
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(base64);
    this.imagenEstado = true;
  }

  operar() {

    this.personal.nombres = this.form.value['nombres'];
    this.personal.apelliPaterno = this.form.value['apelliP'];
    this.personal.apelliMaterno = this.form.value['apelliM'];
    this.personal.celular = this.form.value['celular'];
    this.personal.dni = this.form.value['nroDni'];
    this.personal.genero = this.form.value['genero'];
    this.personal.modalidad = this.form.value['modalidad'];



    let cargo = new Cargo();
    cargo.idCargo = this.selectedCargo.idCargo;
    this.personal.cargo = cargo;
    this.personal.fechaNac = moment(this.form.value['fechaNac']).format('YYYY-MM-DD');//localISOTime;

    //Usuario:Noemi Jaime Durand: njaime

    this.usuario.username = this.form.value['nombres'].substr(0, 1) + this.form.value['apelliP'];
    this.usuario.password = this.form.value['password'];
    this.usuario.enabled = true;


    //Validando si cargo una foto:
    if (this.selectedFiles != null) {
      this.currentFileUpload = this.selectedFiles.item(0);
    } else {
      this.currentFileUpload = new File([""], "blanco");
    }

    if (this.edicion) {

      this.personal.idPersonal = this.form.value['id'];
      this.usuario.idUsuario = this.personal.idPersonal;

      //this.usuario.personal = this.personal;

      this.userService.listarxID(this.form.value['id']).subscribe(data => {


        if (this.usuario.password == "") {
          this.usuario.password = data.password;
        }
        //console.log(this.selectedRolesF);
        
        this.selectedRolesF.forEach(i =>{
          let rolS = new Rol();
          rolS.idRol = i;
          this.listSelectRoles.push(rolS);
        })

        

        this.usuario.roles = this.listSelectRoles;
        console.log(this.usuario.roles)

        //this.usuario.roles = data.roles;

        this.userService.modificar(this.usuario).subscribe(() => {
          this.personalService.modificar(this.personal, this.currentFileUpload).pipe(switchMap(() => {
            return this.personalService.listar();
          })).subscribe(data => {
            this.personalService.personalCambio.next(data);
            this.personalService.mensajeCambio.next('Se Modifico correctamente..');
          });
        });

      });



    } else {
      //insercion
      this.usuario.personal = this.personal;
      //console.log(this.usuario);
      this.personalService.registrar(this.usuario, this.currentFileUpload).subscribe(() => {
        this.personalService.listar().subscribe(data => {
          this.personalService.personalCambio.next(data);
          this.personalService.mensajeCambio.next('Se Registro correctamente..');
        });
      });
    }

    this.router.navigate(['personal']);


  }

  selectFile(e: any) {
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;

    this.convertir(e.target.files[0]);
  }

  onBasicUpload(event) {
    console.log(event);
    this.personalService.mensajeCambio.next('File Uploaded with Basic Mode');
  }

}
