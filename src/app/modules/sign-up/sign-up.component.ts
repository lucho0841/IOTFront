import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SignUpUser} from 'src/app/models/auth/sign-up-user';
import {AuthService} from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  register(): void {
    if (this.form.status == "VALID") {
      if (this.form.controls['password'].value == this.form.controls['confirmPassword'].value) {
        this.authService.signUp(this.formValue).toPromise().then(answer => {
          Swal.fire({
            title: 'Registro completado!',
            text: 'Su usuario ha sido registrado correctamente!',
            icon: 'success',
            confirmButtonText: 'Cool'
          }).then(() => {
            console.log(answer);
            this.router.navigateByUrl('/login');
          })
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'La contraseña ingresada no coincide',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Revise los campos e intente de nuevo',
        icon: 'error',
        confirmButtonText: 'Vale'
      })
    }
    console.log(this.form.value);
  }

  get formValue(): SignUpUser {
    return this.form.value;
  }

}
