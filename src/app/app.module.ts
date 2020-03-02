import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from './primeng/primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { PersonalEdicionComponent } from './pages/personal/personal-edicion/personal-edicion.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CargoComponent } from './pages/cargo/cargo.component';
import { CargoEdicionComponent } from './pages/cargo/cargo-edicion/cargo-edicion.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { CategoriaDialogoComponent } from './pages/categoria/categoria-dialogo/categoria-dialogo.component';
import { BienComponent } from './pages/bien/bien.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { MarcaDialogoComponent } from './pages/marca/marca-dialogo/marca-dialogo.component';
import { CargoDialogoComponent } from './pages/cargo/cargo-dialogo/cargo-dialogo.component';
import { BienEdicionComponent } from './pages/bien/bien-edicion/bien-edicion.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonalComponent,
    PersonalEdicionComponent,
    CargoComponent,
    CargoEdicionComponent,
    CategoriaComponent,
    CategoriaDialogoComponent,
    BienComponent,
    MarcaComponent,
    MarcaDialogoComponent,
    CargoDialogoComponent,
    BienEdicionComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
