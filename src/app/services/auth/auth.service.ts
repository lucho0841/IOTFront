import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { SignUpUser } from 'src/app/models/signUpUser';
import { LoginUser } from 'src/app/models/loginUser';
import { JwtDTO } from 'src/app/models/jwt-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly userUrl = environment.baseURL_identityService;
  constructor(private httpClient: HttpClient) {
  }

  public signUp(signUpUser: SignUpUser): Observable<any> {
    let methodURL = `${this.userUrl}/Users/createUser`;
    return this.httpClient.post<any>(methodURL, signUpUser);
  }

  public login(user: LoginUser): Observable<any> {
    let methodURL = `${this.userUrl}/Users/authenticate?email=${user.email}&password=${user.password}`;
    return this.httpClient.post<any>(methodURL, user);
  }
}
