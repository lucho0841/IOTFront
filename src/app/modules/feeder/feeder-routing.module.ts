import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeederComponent } from './feeder.component';

const routes: Routes = [{ path: '', component: FeederComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeederRoutingModule { }
