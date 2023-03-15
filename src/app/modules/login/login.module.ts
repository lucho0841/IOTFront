import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material //
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    SingUpComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
