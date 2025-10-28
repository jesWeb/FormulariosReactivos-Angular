import { FormGroup } from "@angular/forms";

export class FormUtils {


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

}
