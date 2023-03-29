import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {environment} from "../../../environments/environment";
import {Schedule} from "../../models/schedule/schedule";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getSchedule(petId: number): Promise<Schedule> {
    return of({petId, scheduleList: ['08:00', '13:00', '20:00']}).toPromise();
    return this.http.get<Schedule>(`${environment.baseUrl}/schedule/${petId}`).toPromise();
  }

  save(schedule: Schedule): Promise<Schedule> {
    return of(schedule).toPromise();
    return this.http.post<Schedule>(`${environment.baseUrl}/schedule/create`, schedule).toPromise();
  }
}
