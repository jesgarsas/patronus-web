import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UsuarioDTO } from 'src/app/models/usuario/usuario-dto';

@Component({
  selector: 'app-generic-autocomplete',
  templateUrl: './generic-autocomplete.component.html',
  styleUrls: ['./generic-autocomplete.component.scss']
})
export class GenericAutocompleteComponent implements OnInit, AfterViewInit {

  @Input() label!: string;
  @Input() form: FormGroup = new FormGroup({});
  @Input() formName!: string;
  @Input() disable?: boolean;
  @Input() required: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() defaultValue: string | undefined;
  @Input() service: any;
  @Input() param: string | undefined;
  @Input() transformFunction: Function | undefined;

  @ViewChild('autoInput') input: any;

  options: any[] = [];
  filteredOptions$: Observable<any[]> = of([]);
  formInput: FormGroup = new FormGroup({});

  @Output() onChange: EventEmitter<Boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.form.addControl(this.formName, new FormControl());
    if (this.required) {
      this.form.controls[this.formName].setValidators(Validators.required);
    }
    if (this.defaultValue) {
      this.form.controls[this.formName].setValue(this.defaultValue);
    }

    this.formInput.addControl('auto', new FormControl(undefined));
  }

  ngAfterViewInit(): void {
    if (this.service && this.param) {
      this.service.getByParam(this.param).pipe(take(1)).subscribe((data: any) => {
        if (data) {
          if (this.transformFunction) {
            data.map((item: any) => { this.transformFunction!(item) })
          }
          this.options = data;
          this.filteredOptions$ = of(data);
        }
      })
    }
  }

  private filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.label.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: any): Observable<any[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  onInput() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange(event: any) {
    if (event.label) {
      this.filteredOptions$ = this.getFilteredOptions(event.label);
      this.form.controls[this.formName].setValue(event);
      this.formInput.controls['auto'].setValue(event.label);
    }
  }

}
