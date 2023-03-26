import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeederRoutingModule } from './feeder-routing.module';
import { FeederComponent } from './feeder.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import { FeederFormComponent } from './components/feeder-form/feeder-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    FeederComponent,
    FeederFormComponent
  ],
  imports: [
    CommonModule,
    FeederRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class FeederModule { }
