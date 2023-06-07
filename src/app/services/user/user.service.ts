import { Injectable } from '@angular/core';
import {User} from "../../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static user: User | undefined;
  constructor() { }

  static getUser(): User | undefined {
    return this.user;
  }

  static setUser(user: User | undefined): void {
    this.user = user;
  }

}
