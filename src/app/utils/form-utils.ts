import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `valor minimo ${errors['minlength'].requiredLength} caracteres.`;
        case 'min':
          return `Minimo de ${errors['min'].min}`;
        case 'email':
          return `El valor ingresado no es un correo electronico valido`;
      }
    }
    return null
  }

  static isValField(form: FormGroup, fieldName: string): boolean | null {
    return (
      form.controls[fieldName].errors &&
      form.controls[fieldName].touched
    )

  }


  static getFieldError(errorF: FormGroup, fieldName: string): string | null {
    if (!errorF.controls[fieldName]) {
      return null
    }
    const errors = errorF.controls[fieldName].errors ?? {}
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'
        case 'minlength':
          return `valor minimo ${errors['minlength'].requiredLength} caracteres.`;
        case 'min':
          return `Minimo de ${errors['min'].min}`;
      }
    }
    return null
  }

  //dynamic

  static isValidFiledInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    )
  }


  static getFieldErrorArray(errorF: FormArray, index: number): string | null {
    if (errorF.controls.length === 0) {
      return null
    }
    const errors = errorF.controls[index].errors ?? {}

    return FormUtils.getTextError(errors)
  }

}
