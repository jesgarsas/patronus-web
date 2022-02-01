import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ejercicio-manage-creation',
  templateUrl: './ejercicio-manage-creation.component.html',
  styleUrls: ['./ejercicio-manage-creation.component.scss']
})
export class EjercicioManageCreationComponent implements OnInit {

  form!: FormGroup;

  readonly nombreFormName: string = 'nombre';
  readonly patronFormName: string = 'patron';
  readonly intentosFormName: string = 'intentos'

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({});
  }

}
