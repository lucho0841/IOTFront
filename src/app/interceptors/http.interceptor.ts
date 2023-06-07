import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {TokenService} from "../services/auth/token/token.service";
import {UtilAlert} from "../util/util-alert";
import {catchError, finalize} from "rxjs/operators";
import {LoadingService} from "../services/loading/loading.service";

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private loadingService: LoadingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();
    let intReq = req;
    const token = this.tokenService.getToken();
    if (token) {
      intReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
    }
    return next.handle(intReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        let errorMessage = 'Error desconocido';

        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error: ${error.error?.message}`;
          UtilAlert.error({text: errorMessage});
        } else {
          // Error del lado del servidor
          if (error.status == 403 && error.url?.includes('/login')) {
            UtilAlert.warning({title: 'No se pudo iniciar sesión 😢', text: 'Nombre de usuario o contraseña incorrectos'});
          } else {
            UtilAlert.error({text: error.error?.humanMessage});
          }
        }

        return throwError(errorMessage);
      }),
      finalize(() => this.loadingService.hide())
    );
  }

}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true}];
