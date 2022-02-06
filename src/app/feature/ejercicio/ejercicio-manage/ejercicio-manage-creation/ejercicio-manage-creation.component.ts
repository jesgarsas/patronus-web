import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ejercicio-manage-creation',
  templateUrl: './ejercicio-manage-creation.component.html',
  styleUrls: ['./ejercicio-manage-creation.component.scss']
})
export class EjercicioManageCreationComponent implements OnInit {

  form!: FormGroup;

  readonly nombreFormName: string = 'nombre';
  readonly patronFormName: string = 'patron';
  readonly intentosFormName: string = 'intentos';
  readonly preguntasFormName: string = 'preguntas';
  readonly opcionesFormName: string = 'opciones';
  readonly textoFormName: string = 'texto';
  readonly tipoFormName: string = 'tipo';
  readonly correcta: string = 'correcta';

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({});
    this.form.addControl(this.preguntasFormName, new FormArray([]));
  }

  addPregunta() {
    if (this.form && this.form.value[this.preguntasFormName]) {
      let preguntaForm = new FormGroup({});
      preguntaForm.addControl(this.textoFormName, new FormControl(undefined));
      preguntaForm.addControl(this.opcionesFormName, new FormArray([
        this.createOptionForm(),
        this.createOptionForm(),
      ]));
      this.form.value[this.preguntasFormName].push(preguntaForm);
    }
  }

  addOptionForm(form: FormArray) {
    form.push(this.createOptionForm());
  }

  private createOptionForm() {
    let form = new FormGroup({});
    form.addControl(this.textoFormName, new FormControl(undefined));
    form.addControl(this.correcta, new FormControl(undefined));
    return form;
  }

}
