import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {TokenService} from "../../services/auth/token/token.service";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private tokenService: TokenService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.tokenService.getToken();// Obtén el token JWT de alguna fuente (LocalStorage, cookie, encabezado HTTP, etc.)
    const tokenData: any = jwt_decode(token);
    const expirationDate = new Date(tokenData.exp * 1000); // Multiplica por 1000 para obtener la fecha en milisegundos
    const currentDate = new Date();

    const canActive: boolean = Boolean(this.tokenService.getToken());
    console.log('validando token');
    sessionStorage.setItem('redirectTo', state.url);
    if (!canActive) {
      console.log('se debe redireccionar al login');
      this.router.navigateByUrl('login');
    }
    if (currentDate > expirationDate) {
      console.log('Token expirado');
      this.router.navigateByUrl('login');// El token ha expirado
    }
    return canActive;
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(next, state);
  }

}
