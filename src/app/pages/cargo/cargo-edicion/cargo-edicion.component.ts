import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CargoService } from 'src/app/_service/cargo.service';
import { Cargo } from 'src/app/_model/cargo';

@Component({
  selector: 'app-cargo-edicion',
  templateUrl: './cargo-edicion.component.html',
  styleUrls: ['./cargo-edicion.component.css']
})
export class CargoEdicionComponent implements OnInit {

  form: FormGroup;
  edicion: boolean;
  id: number;

  cargo: Cargo;

  constructor(private route: ActivatedRoute,private cargoService: CargoService,private router :Router) { }

  ngOnInit() {
    this.cargo = new Cargo();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'estado': new FormControl('A')

    });

    //Obteniendo por ID:
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion= this.id != null;

      this.initForm();
      console.log(this.edicion)

    });



  }

  initForm(){
    if(this.edicion){
      //carga la data del servicio hacia el form.
      this.cargoService.listarxID(this.id).subscribe(data =>{
        this.form = new FormGroup({
          'id': new FormControl(data.idCargo),
          'nombre': new FormControl(data.nombre),
          'estado': new FormControl(data.estado)
        });
        
        
      });
      

    }
  }

  operar() {
   /* console.log(this.form.value['id']);
      console.log(this.form.value['nombre']);
      console.log(this.form.value['estado']);*/



    this.cargo.idCargo = this.form.value['id'];
    this.cargo.nombre = this.form.value['nombre'];
    this.cargo.estado = this.form.value['estado'];
    console.log("ingreso..");
    if(this.edicion){
      console.log("ingreso EDICION");
      this.cargoService.modificar(this.cargo).subscribe( () =>{
        this.cargoService.listar().subscribe(data =>{
          this.cargoService.cargoCambio.next(data);
          this.cargoService.mensajeCambio.next('Se Modifico correctamente..');
        });
      });

    }else{
      //insercion
      this.cargoService.registrar(this.cargo).subscribe(() =>{
        this.cargoService.listar().subscribe(data =>{
          this.cargoService.cargoCambio.next(data);
          this.cargoService.mensajeCambio.next('Se Registro correctamente..');
        });
      });
    }

    this.router.navigate(['cargo']);
    

  }

}
