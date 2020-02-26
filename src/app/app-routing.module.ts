import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalComponent } from './pages/personal/personal.component';
import { PersonalEdicionComponent } from './pages/personal/personal-edicion/personal-edicion.component';
import { CargoComponent } from './pages/cargo/cargo.component';
import { CargoEdicionComponent } from './pages/cargo/cargo-edicion/cargo-edicion.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';


const routes: Routes = [
  {
    path: 'personal', component: PersonalComponent, children: [
      { path: 'nuevo', component: PersonalEdicionComponent },
      { path: 'edicion/:id', component: PersonalEdicionComponent }

    ],
   
  },
  {
    path:'cargo',component:CargoComponent, children:[
      { path: 'nuevo', component: CargoEdicionComponent },
      { path: 'edicion/:id', component: CargoEdicionComponent }
    ]
  },
  {
    path:'categoria',component:CategoriaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
