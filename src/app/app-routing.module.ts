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
        loadChildren: () => import('./modules/mascota/mascota.module').then(m => m.MascotaModule)
      },
      {
        path: 'alimentador',
        loadChildren: () => import('./modules/alimentador/alimentador.module').then(m => m.AlimentadorModule)
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
