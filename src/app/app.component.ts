import {Component} from '@angular/core';
import {LoadingService} from "./services/loading/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IOTFront';

  constructor(public loadingService: LoadingService) {
  }

}
