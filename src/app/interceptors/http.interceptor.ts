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
        if (error.error instanceof ErrorEvent) {
          console.log('error desde el cliente');
          UtilAlert.error({text: error.error.message});
        } else {
          console.log('error desde el servidor');
          UtilAlert.error({text: error.error.message});
        }
        return throwError(error.error.message);
      }),
      finalize(() => this.loadingService.hide())
    );
  }

}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true}];
