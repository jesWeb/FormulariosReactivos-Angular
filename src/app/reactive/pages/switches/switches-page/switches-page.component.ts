import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, NgClass } from '@angular/common';
import { FormUtils } from '../../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule, NgClass],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {

  private fb = inject(FormBuilder)
  formUtils = FormUtils
  //form builder
  myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    WantNotifications: [true],
    termAndConditions: [false, Validators.requiredTrue]

  })


  onSubmit() {
    this.myForm.markAllAsTouched()
    console.log('====================================');
    console.log(this.myForm.value);
    console.log('====================================');
  }


  // la otra forma compleja de hacerlo
  // myform = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0)
  // })


}
