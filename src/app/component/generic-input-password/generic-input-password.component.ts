import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GenericInputComponent } from '../generic-input/generic-input.component';

@Component({
  selector: 'app-generic-input-password',
  templateUrl: './generic-input-password.component.html',
  styleUrls: ['./generic-input-password.component.scss']
})
export class GenericInputPasswordComponent extends GenericInputComponent implements OnInit {

  showPassword: boolean = false;

  constructor() { super(); }

  ngOnInit(): void {
    this.form.addControl(this.formName, new FormControl());
    if (this.required) {
      this.form.controls[this.formName].setValidators(Validators.required);
    }
  }


  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onKeypress(e: any) {
    this.toggleShowPassword();
    this.onSubmit.emit();
  }
}
