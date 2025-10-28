import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  imports: [],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {

  private fb = inject(FormBuilder)
  //form builder
  myForm = this.fb.group({
    name: [''],
    price: [0],
    inStorage: [0]

  })



  // la otra forma compleja de hacerlo
  // myform = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0)
  // })


}
