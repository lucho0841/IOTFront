import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SignUpUser} from 'src/app/models/auth/sign-up-user';
import {LoginUser} from 'src/app/models/auth/login-user';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  public signUp(signUpUser: SignUpUser): Observable<void> {
    const methodURL = `${environment.baseUrl}/auth/sign-up`;
    return this.httpClient.post<any>(methodURL, signUpUser);
  }

  public login(loginUser: LoginUser): Observable<string> {
    const methodURL = `${environment.baseUrl}/auth/login`;
    return this.httpClient.post<any>(methodURL, loginUser);
  }
}
