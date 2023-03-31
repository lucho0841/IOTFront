import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EMPTY, of} from "rxjs";
import {SignUpUser} from 'src/app/models/auth/sign-up-user';
import {LoginUser} from 'src/app/models/auth/login-user';
import {environment} from 'src/environments/environment';
import {User} from "../../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  public signUp(signUpUser: SignUpUser): Promise<void> {
    // return EMPTY.toPromise();
    const methodURL = `${environment.baseUrl}/user`;
    return this.httpClient.post<any>(methodURL, signUpUser).toPromise();
  }

  public login(loginUser: LoginUser): Promise<{ user: User; token: string }> {
    // return  of('skjlnjkbkjjhsfbjhdsbfhjbs').toPromise();
    const methodURL = `${environment.baseUrl}/auth/login`;
    return this.httpClient.post<{ user: User; token: string }>(methodURL, loginUser).toPromise();
  }
}
