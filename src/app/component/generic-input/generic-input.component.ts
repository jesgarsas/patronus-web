import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-generic-input',
  templateUrl: './generic-input.component.html',
  styleUrls: ['./generic-input.component.scss']
})
export class GenericInputComponent implements OnInit {

  @Input() label!: string;
  @Input() form: FormGroup = new FormGroup({});
  @Input() formName!: string;
  @Input() disable?: boolean;

  constructor() { }

  ngOnInit(): void {
    this.form.addControl(this.formName, new FormControl());
  }

}
