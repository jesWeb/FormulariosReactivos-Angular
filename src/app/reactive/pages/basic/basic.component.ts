import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicComponent {

  //forma uno
  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0)
  // })

  //forma recomendada

  private fb = inject(FormBuilder)

  myFomr: FormGroup = this.fb.group({
    /**usa
     * validadore sincronos y validadores asyncronos , donde se tienen que meter dentro de un []
     */
    /**existen dos tipos de errores por inputu o por formulario */
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  })

  isValField(fieldName: string): boolean | null {
    return !!this.myFomr.controls[fieldName].errors
  }


  //
  getFieldError(fieldName: string): string | null {
    if (!this.myFomr.controls[fieldName]) {
      return null
    }

    const errors = this.myFomr.controls[fieldName].errors ?? {}


    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'

        case 'minlength':
          return `Minimo de ${errors['minlength'].requiredLength} caracteres.`;

        case 'min':
          return `Minimo de ${errors['mih'].min}`;


      }
    }
    return null
  }




}
