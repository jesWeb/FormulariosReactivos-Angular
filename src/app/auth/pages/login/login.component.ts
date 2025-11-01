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

  private fb = inject(FormBuilder);

  formUtil = FormUtils

  //formBUilder
  loginForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.formUtil.namePattern)]],
    email: ['',
      //normal
      [Validators.required, Validators.pattern(FormUtils.emailPattern)],
      //async
      [FormUtils.checkingServerResponse]
    ],
    userName: ['',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.formUtil.notOnlySpacesPattern),
        FormUtils.noUsuario
      ],

    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passConfirm: ['', [Validators.required]],

  }, {
    //validacion perzonalizada
    Validators: [
      this.formUtil.contrasenasIguales('passwod', 'passConfirm')
    ]
  })



  onSubmit() {
    this.loginForm.markAllAsTouched()
    console.log('====================================');
    console.log(this.loginForm.value);
    console.log('====================================');
  }




}
