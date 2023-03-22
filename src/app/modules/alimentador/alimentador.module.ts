import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlimentadorRoutingModule } from './alimentador-routing.module';
import { AlimentadorComponent } from './alimentador.component';


@NgModule({
  declarations: [
    AlimentadorComponent
  ],
  imports: [
    CommonModule,
    AlimentadorRoutingModule
  ]
})
export class AlimentadorModule { }
