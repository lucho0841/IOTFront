import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {EMPTY, of} from "rxjs";
import {SignUpUser} from 'src/app/models/auth/sign-up-user';
import {LoginUser} from 'src/app/models/auth/login-user';
import {environment} from 'src/environments/environment';
import {User} from "../../models/user/user";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  public signUp(signUpUser: SignUpUser): Promise<void> {
    const methodURL = `${environment.baseUrl}/api/user/public/sign-up`;
    return this.httpClient.post<any>(methodURL, signUpUser).toPromise();
  }

  public login(loginUser: LoginUser): Promise<{ user: User | undefined; token: string }> {
    const methodURL = `${environment.baseUrl}/login`;
    return this.httpClient.post<any>(methodURL, loginUser, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      const headers = response.headers;
      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken?.replace('Bearer ','');

      return {user: undefined, token: token};
    })).toPromise();
  }
}
