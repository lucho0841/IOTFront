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
    document.cookie = `${item}=${value}`;
  }

  getItem(item: string): string {
    return this.getCookiesDictionary()[item];
  }

  removeItem(item: string) {
    document.cookie = `${item}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  getCookiesDictionary(): Record<string, string> {
    const dictionary: Record<string, string> = {};
    const cookieString: string = document.cookie;
    if (cookieString.length > 0) {
      const cookiesList: string[] = cookieString.split('; ');
      cookiesList.forEach(cookieString => {
        const cookie: string[] = cookieString.split('=');
        dictionary[cookie[ITEM]] = cookie[VALUE];
      });
    }

    return dictionary;
  }
}
