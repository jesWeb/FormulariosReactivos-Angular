import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-login',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';


  private fb = inject(FormBuilder)

  formUtil = FormUtils

  //formBUilder
  loginForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    userName: ['', Validators.required, Validators.minLength(6)],
    password: ['', Validators.required, Validators.minLength(6)],
    passConfirm: ['', Validators.required]
  })

  onSubmit() {
    this.loginForm.markAllAsTouched()
    console.log('====================================');
    console.log(this.loginForm.value);
    console.log('====================================');
  }




}
