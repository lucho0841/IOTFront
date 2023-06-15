import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SignUpUser} from 'src/app/models/auth/sign-up-user';
import {AuthService} from 'src/app/services/auth/auth.service';
import {UtilAlert} from "../../util/util-alert";

const MOBILE_PATTERN = /^[0-9]{10,10}$/;

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
      phoneNumber: ['', [Validators.required, Validators.pattern(MOBILE_PATTERN)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  register(): void {
    if (this.form.status == "VALID") {
      if (this.form.controls['password'].value == this.form.controls['confirmPassword'].value) {
        this.authService.signUp(this.formValue).then(() => {
          UtilAlert.success({
            title: '😎 Registro completado!',
            text: 'Su usuario ha sido registrado correctamente!',
            buttonText: 'Cool'
          });
          this.router.navigateByUrl('/login').then();
        });
      } else {
        UtilAlert.warning({
          text: 'La contraseña ingresada no coincide',
          buttonText: 'Ok'
        });
      }
    } else {
      UtilAlert.warning({
        text: 'Revise los campos e intente de nuevo',
        buttonText: 'Vale'
      });
    }
  }

  get formValue(): SignUpUser {
    return this.form.value;
  }

}
