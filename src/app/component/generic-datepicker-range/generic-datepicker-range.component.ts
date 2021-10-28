import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-generic-datepicker-range',
  templateUrl: './generic-datepicker-range.component.html',
  styleUrls: ['./generic-datepicker-range.component.scss']
})
export class GenericDatepickerRangeComponent implements OnInit {

  @Input() label!: string;
  @Input() form: FormGroup = new FormGroup({});
  @Input() disable?: boolean;

  constructor() { }

  ngOnInit(): void {
    this.form.addControl('dateIni', new FormControl());
    this.form.addControl('dateFin', new FormControl());
  }

  onChange(input: string) {
    if (moment.isMoment(this.form.value['dateIni']) && moment.isMoment(this.form.value['dateFin']) 
      && this.form.value['dateIni'].isAfter(this.form.value['dateFin'])) {
      let date: moment.Moment;
      if (input === 'ini') {
        date = this.form.value['dateIni'];
        this.form.controls['dateFin'].setValue(date);
        this.form.controls['dateFin'].markAsTouched();
      } else {
        date = this.form.value['dateFin'];
        this.form.controls['dateIni'].setValue(date);
        this.form.controls['dateIni'].markAsTouched();
      }
    }
  }

}
