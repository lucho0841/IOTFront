import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginUser} from 'src/app/models/auth/login-user';
import {AuthService} from 'src/app/services/auth/auth.service';
import {TokenService} from 'src/app/services/auth/token/token.service';
import {UtilAlert} from "../../util/util-alert";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) {

  }

  ngOnInit(): void {
    this.buildForm();
  }

  login(): void {
    if (this.form.status == "VALID") {
      this.authService.login(this.formValue).toPromise().then(token => {
        this.tokenService.setToken(token);
        UtilAlert.success();
        this.router.navigateByUrl(sessionStorage.getItem('redirectTo') || '/dashboard').then();
      });
    } else {
      UtilAlert.warning({
        title: 'Error!',
        text: 'Revise si ingreso correctamente el correo o la contraseña',
        buttonText: 'Vale'
      });
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get formValue(): LoginUser {
    return this.form.value;
  }

}
