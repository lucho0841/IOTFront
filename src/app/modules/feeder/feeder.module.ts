import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeederRoutingModule } from './feeder-routing.module';
import { FeederComponent } from './feeder.component';


@NgModule({
  declarations: [
    FeederComponent
  ],
  imports: [
    CommonModule,
    FeederRoutingModule
  ]
})
export class FeederModule { }
