import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ConfigService {

    constructor(
        private http: HttpClient,
    ) { }

    PostAnonymous(apiURL: any, item: any) {

        const promise = new Promise(async (resolve, reject) => {
            this.http
                .post<any[]>(apiURL, item)
                .toPromise()
                .then((res: any) => {
                    // Success
                    resolve(res);
                },
                    (err: any) => {
                        // Error
                        reject(err);
                    }
                );
        });
        return promise;
    }

    GetAnonymous(apiURL: string) {
    
        const promise = new Promise(async (resolve, reject) => {
          this.http
          .get<any[]>(apiURL)
            .toPromise()
            .then((res: any) => {
              // Success
              resolve(res);
            },
              err => {
                // Error
                reject(err);
              }
            );
        });
        return promise;
      }
    
}