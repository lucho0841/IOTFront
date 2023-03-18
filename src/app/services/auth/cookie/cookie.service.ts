import {Injectable} from '@angular/core';

const ITEM: number = 0;
const VALUE: number = 1;

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() {
  }

  setItem(item: string, value: string): void {
    const dictionary: Record<string, string> = this.getCookiesDictionary();
    dictionary[item] = value;
    document.cookie = Object.entries(dictionary)
      .map(([clave, valor]) => `${clave}=${valor}`).join(";");
  }

  getItem(item: string): string {
    return this.getCookiesDictionary()[item];
  }

  getCookiesDictionary(): Record<string, string> {
    const cookiesList: string[] = document.cookie.split(';');
    const dictionary: Record<string, string> = {};
    cookiesList.forEach(cookieString => {
      const cookie: string[] = cookieString.split('=');
      dictionary[cookie[ITEM]] = cookie[VALUE];
    });
    return dictionary;
  }
}
