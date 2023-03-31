import { Injectable } from '@angular/core';
import {User} from "../../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static user: User;
  constructor() { }

  static getUser(): User {
    return this.user;
  }

  static setUser(user: User): void {
    this.user = user;
  }

}
