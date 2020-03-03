import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/_service/categoria.service';
import { Categoria } from 'src/app/_model/categoria';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';

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

  constructor(private categoriaService: CategoriaService,private builder: FormBuilder) { }

  ngOnInit(): void {

    this.estadou = [
      { label: 'Seleccione un Estado', value: null },
      { label: 'Operativo', value: 'O' },
      { label: 'Usado', value: 'U' },
      { label: 'Malogrado', value: 'M' }
    ];



    //this.listarCateg();
    this.form = this.builder.group({
      'id':new FormControl(0),
      'codPatrimonal':new FormControl('',Validators.required),
      'codInterno':new FormControl('',Validators.required),
      'nombre':new FormControl('',Validators.required),
      'estadou':new FormControl('',Validators.required),
      'modelo':new FormControl('',Validators.required),
      'categ':this.myControlCategoria
    });

    console.log(this.categorias);

    //this.f
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
