import {Injectable} from '@angular/core';
import {CookieService} from "../cookie/cookie.service";
import {Router} from "@angular/router";

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private cookieService: CookieService, private router: Router) {
  }

  public setToken(token: string): void {
    this.cookieService.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return this.cookieService.getItem(TOKEN_KEY);
  }

  public logOut(): void {
    window.sessionStorage.clear();
    Object.keys(this.cookieService.getCookiesDictionary()).forEach(item => this.cookieService.removeItem(item));
    this.router.navigateByUrl('login');
  }
}
