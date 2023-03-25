import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guardians/auth/auth.guard";
import {SidenavComponent} from "./components/sidenav/sidenav.component";

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'mascota',
        loadChildren: () => import('./modules/mascota/pet.module').then(m => m.PetModule)
      },
      {
        path: 'feeder',
        loadChildren: () => import('./modules/feeder/feeder.module').then(m => m.FeederModule)
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./modules/sign-up/sign-up.module').then(m => m.SignUpModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
