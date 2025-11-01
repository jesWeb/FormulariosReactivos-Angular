import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";


const sleep = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 2500)
  })
}

export class FormUtils {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';


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


        case 'emailTaken':
          return `El correo electronico Ingresado ya esta siendo usado`;

        case 'userNotValid':
          return `El usuario que ingresaste no es valido  - Remplazalo`

        case 'pattern':
          if (errors['pattern'].requiredPattern == FormUtils.emailPattern) {
            return 'El valor del correo electronico no es valido';
          }

          return 'Formato inválido';


        default:
          return 'error no especioficado'
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

  //personalizada
  static contrasenasIguales(field: string, field2: string) {

    return (FormGroup: AbstractControl) => {

      const field1Value = FormGroup.get(field)?.value;

      const field2Value = FormGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwordNoIgual: true }

    }

  }


  //validacion asincrona

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {

    console.log('====================================');
    console.log('validando contra servidor');
    console.log('====================================');

    await sleep();

    const formvalue = control.value;

    if (formvalue == 'hola@mundo.com') {
      return {
        emailTaken: true
      }
    }

    return null
  }


  //validacion sincrona

  static noUsuario(user: AbstractControl): ValidationErrors | null {


    const formValue = user.value

    // if (formValue === "strider") {
    //   return {
    //     userNotValid: true
    //   }
    // }


    return formValue === 'strider' ? { userNotValid: true } : null;

  }


}
