import { AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Class que contiene los validadores del component EjercicioManageCreation
 */
export class EjercicioManageCreationValidators {

  public static minUnaPreguntaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let forbidden = control.value.length === 0;
      return forbidden ? {error: 'Mínimo añadada una pregunta'} : null;
    };
  }

  public static minDosOpcionesValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let forbidden = control.value.length < 2;
      return forbidden ? {error: 'Mínimo añadada dos opciones'} : null;
    };
  }

  public static minUnaOpcionCorrectaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let forbidden = true;
      (control as FormArray).controls.forEach((opcion: any) => {
        forbidden &&= !opcion.controls['correcta'].value;
      })
      return forbidden ? {error: 'Mínimo marque una opción correcta'} : null;
    };
  }
}