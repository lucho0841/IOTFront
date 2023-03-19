import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginUser} from 'src/app/models/auth/login-user';
import {AuthService} from 'src/app/services/auth/auth.service';
import {TokenService} from 'src/app/services/auth/token/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLogged = false;
  errMsj!: string;

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
//todo hacer clase utilitaria para los mensajes
  login(): void {
    if (this.form.status == "VALID") {
      this.authService.login(this.formValue).toPromise().then(token => {
        this.isLogged = true;
        this.tokenService.setToken(token);
        this.router.navigateByUrl('/dashboard');
      }).catch(err => {
        this.isLogged = false;
        this.errMsj = err.error.message;
        Swal.fire({
          title: 'Error!',
          text: 'Revise si ingreso correctamente el correo o la contraseña',
          icon: 'error',
          confirmButtonText: 'Vale'
        })
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Revise si ingreso correctamente el correo o la contraseña',
        icon: 'error',
        confirmButtonText: 'Vale'
      })
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
