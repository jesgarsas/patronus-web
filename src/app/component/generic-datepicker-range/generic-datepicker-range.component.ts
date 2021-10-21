import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-generic-datepicker-range',
  templateUrl: './generic-datepicker-range.component.html',
  styleUrls: ['./generic-datepicker-range.component.scss']
})
export class GenericDatepickerRangeComponent implements OnInit {

  @Input() label!: string;
  @Input() form: FormGroup = new FormGroup({});
  @Input() formName!: string;
  @Input() disable?: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
