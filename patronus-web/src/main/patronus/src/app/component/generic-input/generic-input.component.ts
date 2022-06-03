import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  @Input() required: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() defaultValue: string | undefined;
  @Input() onlyNumbers: boolean = false;
  @Input() maxLength: string | null = null;
  @Input() showRequired: boolean = true;

  @Output() onSubmit: EventEmitter<Boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.form.addControl(this.formName, new FormControl());
    if (this.required) {
      this.form.controls[this.formName].setValidators(Validators.required);
    }
    if (this.defaultValue) {
      this.form.controls[this.formName].setValue(this.defaultValue);
    }
  }

  onKeypress(e: any) {
    this.onSubmit.emit();
  }

  getType() {
    if (this.onlyNumbers) {
      return 'number';
    } else {
      return 'text';
    }
  }

}
