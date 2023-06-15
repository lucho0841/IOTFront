import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Schedule} from "../../models/schedule/schedule";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getAllScheduleList(petId: number): Promise<Schedule[]> {
    return this.http.get<Schedule[]>(`${environment.baseUrl}/api/pet-schedule/${petId}`).toPromise();
  }

  save(scheduleList: Schedule[]): Promise<Schedule[]> {
    return this.http.post<Schedule[]>(`${environment.baseUrl}/api/pet-schedule`, scheduleList).toPromise();
  }

  deleteAllBy(petId: number): Promise<void> {
    return this.http.delete<void>(`${environment.baseUrl}/api/pet-schedule/${petId}`).toPromise();
  }
}
