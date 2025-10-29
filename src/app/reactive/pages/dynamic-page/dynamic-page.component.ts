import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule, FormArray, Form } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  private fb = inject(FormBuilder)
  formUtils = FormUtils

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['mario bros', Validators.required],
        ['Death stranding', Validators.required]
      ],
      Validators.minLength(3)
    )
  })

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  //errores
  isValidFiledInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    )
  }


}
