import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtDTO } from 'src/app/models/jwt-dto';
import { LoginUser } from 'src/app/models/loginUser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUser;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;
  constructor(
    private formBuilder: FormBuilder,
    private router:Router, 
    private authService: AuthService, 
    private tokenService: TokenService
    ) { 
     
  }

  ngOnInit(): void {
    this.buildForm();
  }

  login(): void {
    if(this.form.status == "VALID"){
      const user = new LoginUser(this.form.value.email, this.form.value.password);
      this.authService.login(user).toPromise().then(answer => {
        const data = answer.result;
        console.log(data);
        this.isLogged = true;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
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
      email: ['',[Validators.required]],
      password: ['', [Validators.required]]
    });
  }



}
