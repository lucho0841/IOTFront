import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private visible = false;

  constructor() {
  }

  show(): void {
    setTimeout(() => this.visible = true);
  }

  hide(): void {
    this.visible = false;
  }

  isVisible(): boolean {
    return this.visible;
  }
}
