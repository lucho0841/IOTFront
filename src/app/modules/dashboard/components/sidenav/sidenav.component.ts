import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../../../services/auth/token/token.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  logout() {
    this.tokenService.logOut();
  }
}
