import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MascotaRoutingModule} from './mascota-routing.module';
import {MascotaComponent} from './mascota.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {PetFormComponent} from './components/pet-form/pet-form.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    MascotaComponent,
    PetFormComponent
  ],
  imports: [
    CommonModule,
    MascotaRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class MascotaModule {
}
