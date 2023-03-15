import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
     
  }

  ngOnInit(): void {
    this.buildForm();
  }

  login(): void {
    if(this.form.status == "VALID"){
      Swal.fire({
        title: 'Correcto!',
        text: 'Ha ingresado correctamente!',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
      
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Revise si ingreso correctamente el correo o la contraseña',
        icon: 'error',
        confirmButtonText: 'Vale'
      })
    }
    console.log(this.form.value);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['',[Validators.required]],
      password: ['', [Validators.required]]
    });
  }



}
