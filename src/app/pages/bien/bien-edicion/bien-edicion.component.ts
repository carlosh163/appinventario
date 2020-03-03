import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/_service/categoria.service';
import { Categoria } from 'src/app/_model/categoria';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { MarcaService } from 'src/app/_service/marca.service';
import { Marca } from 'src/app/_model/marca';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-bien-edicion',
  templateUrl: './bien-edicion.component.html',
  styleUrls: ['./bien-edicion.component.css']
})
export class BienEdicionComponent implements OnInit {

  filteredCategoriasSingle: Categoria[];
  cateSelect: any;

  categoria: Categoria;


  //forma 2:
  categorias: Categoria[];

  form: FormGroup;

  myControlCategoria :FormControl = new FormControl('',Validators.required);


  estadou: SelectItem[];

  marca: Marca;
  filteredMarcasSingle: Marca[];


  edicion: boolean;
  id: number;

  constructor(private categoriaService: CategoriaService,private builder: FormBuilder,private marcaService: MarcaService,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.estadou = [
      { label: 'Seleccione un Estado', value: null },
      { label: 'Operativo', value: 'O' },
      { label: 'Usado', value: 'U' },
      { label: 'Malogrado', value: 'M' }
    ];

    /////
    this.form = this.builder.group({
      'id':new FormControl(0),
      'codPatrimonal':new FormControl('',Validators.required),
      'codInterno':new FormControl('',Validators.required),
      'nombre':new FormControl('',Validators.required),

      'estadou':new FormControl('',Validators.required),
      'modelo':new FormControl('',Validators.required),
      'tipo':new FormControl('',Validators.required),
      'serie':new FormControl('',Validators.required),

      'dimension':new FormControl('',Validators.required),
      'color':new FormControl('',Validators.required),
      'observaciones':new FormControl('',Validators.required),
      'codLectora':new FormControl('',Validators.required),
      'estado':new FormControl('',Validators.required), // A

      'categ':this.myControlCategoria,
      'marcaA':new FormControl('',Validators.required),
    });

    //console.log(this.categorias);

    //this.f


    //Obteniendo por ID:
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion= this.id != null;

      this.initForm();

    });
  }


  initForm(){
    /*if(this.edicion){
      //carga la data del servicio hacia el form.
      this.bienService.listarxID(this.id).subscribe(data =>{
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

    }*/
  }

  
  /*
  **
  Forma 1:
  */
 filterCategoriaSingle(event) {
  let query = event.query;
  this.categoriaService.listar().subscribe(categ => {
    this.filteredCategoriasSingle = this.filterCate(query, categ);
  });
}
filterCate(query, categorias: Categoria[]): Categoria[] {
  //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  let filtered: Categoria[] = [];
  for (let i = 0; i < categorias.length; i++) {

    this.categoria = categorias[i];
    if (this.categoria.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0 || this.categoria.idCategoria == query.toLowerCase()) {
      filtered.push(this.categoria);
    }
  }
  return filtered;
}

filterMarcaSingle(event) {
  let query = event.query;
  this.marcaService.listar().subscribe(marc => {
    this.filteredMarcasSingle = this.filterMarca(query, marc);
  });
}
filterMarca(query, categorias: Marca[]): Marca[] {
  //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  let filtered: Marca[] = [];
  for (let i = 0; i < categorias.length; i++) {

    this.marca = categorias[i];
    if (this.marca.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0 || this.marca.idMarca == query.toLowerCase()) {
      filtered.push(this.marca);
    }
  }
  return filtered;
}


/*
**
Forma 2: No funka
*/

/*
listarCateg(){
  this.categoriaService.listar().subscribe(data =>{
    this.categorias = data;
  });
}



filterCategoriaSingle2(event) {
  let val = event.query;
    this.filteredCategoriasSingle = this.miFilter(val);
    //console.log(this.miFilter(val));
}
miFilter(val: any){
  console.log('entro a mi filtrado..');
  console.log(this.categorias);
  return this.categorias.filter(option =>{
    console.log(option.nombre.toLowerCase());
    console.log(val.toLowerCase());
    //option.nombre.toLowerCase().includes(val.toLowerCase());
    //
    option.nombre.toLowerCase().indexOf(val.toLowerCase());
    console.log(option.nombre.toLowerCase().includes(val.toLowerCase()));

  });

}*/

/*displayFn(val: Categoria) {
  return val ? val.nombre : val;

}*/




operar(){
  this.categoria=this.form.value['categ'];
}

}
