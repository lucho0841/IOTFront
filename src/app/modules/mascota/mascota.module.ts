import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MascotaRoutingModule } from './mascota-routing.module';
import { MascotaComponent } from './mascota.component';


@NgModule({
  declarations: [
    MascotaComponent
  ],
  imports: [
    CommonModule,
    MascotaRoutingModule
  ]
})
export class MascotaModule { }
