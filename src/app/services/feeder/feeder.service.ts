import { Injectable } from '@angular/core';
import {Feeder} from "../../models/feeder/feeder";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeederService {
  private feeder: Feeder | undefined;
  constructor(private http: HttpClient) { }

  getFeeder(): Feeder | undefined {
    return this.feeder;
  }

  setFeeder(feeder: Feeder): void {
    this.feeder = feeder;
  }

  resetFeeder(): void {
    this.feeder = undefined;
  }

  getAllFeederList(): Promise<Feeder[]> {
    // return of(this.buildDefaultList()).toPromise();
    return this.http.get<Feeder[]>(`${environment.baseUrl}/feeder`).toPromise();
  }

  create(feeder: Feeder): Promise<Feeder> {
    feeder.id = 10;
    // return of(feeder).toPromise();
    return this.http.post<Feeder>(`${environment.baseUrl}/feeder`, feeder).toPromise();
  }

  update(feeder: Feeder): Promise<Feeder> {
    // return of(feeder).toPromise();
    return this.http.put<Feeder>(`${environment.baseUrl}/feeder`, feeder).toPromise();
  }

  delete(feeder: Feeder): Promise<Feeder> {
    // return of(feeder).toPromise();
    return this.http.delete<Feeder>(`${environment.baseUrl}/feeder/${feeder.id}`).toPromise();
  }

  buildDefaultList(): Feeder[] {
    {
      const feederList = [];
      for (let i = 0; i < 10; i++) {
        feederList.push({
          id: i,
          serial: `serial${i}`,
          name: `name${i}`
        });
      }
      return feederList;
    }
  }

}
