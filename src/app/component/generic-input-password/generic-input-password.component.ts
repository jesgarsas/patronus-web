import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GenericInputComponent } from '../generic-input/generic-input.component';

@Component({
  selector: 'app-generic-input-password',
  templateUrl: './generic-input-password.component.html',
  styleUrls: ['./generic-input-password.component.scss']
})
export class GenericInputPasswordComponent extends GenericInputComponent implements OnInit {

  @Input() showRequired: boolean = true;

  hidePassword: boolean = true;

  constructor() { super(); }

  ngOnInit(): void {
    this.form.addControl(this.formName, new FormControl());
    if (this.required) {
      this.form.controls[this.formName].setValidators(Validators.required);
    }
  }


  getInputType() {
    if (this.hidePassword) {
      return 'password';
    }
    return 'text';
  }

  toggleShowPassword() {
    this.hidePassword = !this.hidePassword;
  }

  onKeypress(e: any) {
    this.toggleShowPassword();
    this.onSubmit.emit();
  }
}
