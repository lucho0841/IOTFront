import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PetRoutingModule} from './pet-routing.module';
import {PetComponent} from './pet.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {PetFormComponent} from './components/pet-form/pet-form.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    PetComponent,
    PetFormComponent
  ],
  imports: [
    CommonModule,
    PetRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatSortModule,
    MatSelectModule,
    MatTooltipModule
  ]
})
export class PetModule {
}
