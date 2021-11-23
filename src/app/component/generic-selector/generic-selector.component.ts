import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generic-selector',
  templateUrl: './generic-selector.component.html',
  styleUrls: ['./generic-selector.component.scss']
})
export class GenericSelectorComponent implements OnInit {

  selectedItem: any;

  @Input() label!: string;
  @Input() form: FormGroup = new FormGroup({});
  @Input() formName!: string;
  @Input() disable?: boolean;
  @Input() required: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() defaultValue: string | undefined;
  @Input() options: any[] = [];

  @Output() onSubmit: EventEmitter<Boolean> = new EventEmitter();

  control?: any;

  constructor() { }
  
  ngOnInit(): void {
    this.form.addControl(this.formName, new FormControl());
    if (this.required) {
      this.form.controls[this.formName].setValidators(Validators.required);
    }
    if (this.defaultValue) {
      this.form.controls[this.formName].setValue(this.defaultValue);
    }
    
    this.control = this.form.controls[this.formName];
  }

  onKeypress(e: any) {
    this.onSubmit.emit();
  }

}
