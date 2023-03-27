import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EMPTY, of} from "rxjs";
import {SignUpUser} from 'src/app/models/auth/sign-up-user';
import {LoginUser} from 'src/app/models/auth/login-user';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  public signUp(signUpUser: SignUpUser): Promise<void> {
    return EMPTY.toPromise();
    const methodURL = `${environment.baseUrl}/auth/sign-up`;
    return this.httpClient.post<any>(methodURL, signUpUser).toPromise();
  }

  public login(loginUser: LoginUser): Promise<string> {
    return  of('skjlnjkbkjjhsfbjhdsbfhjbs').toPromise();
    const methodURL = `${environment.baseUrl}/auth/login`;
    return this.httpClient.post<any>(methodURL, loginUser).toPromise();
  }
}
