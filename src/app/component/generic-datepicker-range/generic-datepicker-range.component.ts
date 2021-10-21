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
        date.add(23, 'h').add(59, 'm').add(59, 's');
        this.form.controls['dateFin'].setValue(date);
        this.form.controls['dateFin'].markAsTouched();
      } else {
        date = this.form.value['dateFin'];
        date.subtract(23, 'h').subtract(59, 'm').subtract(59, 's');
        this.form.controls['dateIni'].setValue(date);
        this.form.controls['dateIni'].markAsTouched();
      }
    }
  }

}
