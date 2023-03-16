import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {
  }

  public nuevo(nuevoUsuario: any): Observable<any> {
    return this.httpClient.post<any>('nuevo', nuevoUsuario);
  }

  public login(loginUsuario: any): Observable<any> {
    return this.httpClient.post<any>('login', loginUsuario);
  }
}
