import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalComponent } from './pages/personal/personal.component';
import { PersonalEdicionComponent } from './pages/personal/personal-edicion/personal-edicion.component';


const routes: Routes = [
  {
    path: 'personal', component: PersonalComponent, children: [
      { path: 'nuevo', component: PersonalEdicionComponent },
      { path: 'edicion/:id', component: PersonalEdicionComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
