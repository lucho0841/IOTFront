import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlimentadorComponent } from './alimentador.component';

const routes: Routes = [{ path: '', component: AlimentadorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlimentadorRoutingModule { }
