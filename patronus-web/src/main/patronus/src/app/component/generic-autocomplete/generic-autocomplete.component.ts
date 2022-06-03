import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-generic-autocomplete',
  templateUrl: './generic-autocomplete.component.html',
  styleUrls: ['./generic-autocomplete.component.scss']
})
export class GenericAutocompleteComponent implements OnInit, AfterViewInit, OnChanges {

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
  @Input() multiple: boolean = false;
  @Input() selected: number[] = [];

  @ViewChild('autoInput') input: any;

  options: any[] = [];
  filteredOptions$: Observable<any[]> = of([]);
  formInput: FormGroup = new FormGroup({});

  @Output() onChange: EventEmitter<Boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    let formControl = new FormControl(this.multiple ? [] : undefined);
    this.form.addControl(this.formName, formControl);

    if (this.required) {
      this.form.controls[this.formName].setValidators(Validators.required);
    }

    this.formInput.addControl('auto', new FormControl(undefined));

    if (this.defaultValue) {
      this.formInput.controls['auto'].setValue(this.defaultValue);
      this.filteredOptions$ = this.getFilteredOptions(this.defaultValue);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.defaultValue && changes.defaultValue.currentValue) {
      this.formInput.controls['auto'].setValue(changes.defaultValue.currentValue);
      this.filteredOptions$ = this.getFilteredOptions(changes.defaultValue.currentValue.trim());
    }
    if (changes.selected && changes.selected.currentValue) {
      this.setItemFromList();
    }
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
          this.filteredOptions$ = this.getFilteredOptions(this.defaultValue);
          this.setItemFromList();
        }
      })
    }
  }

  private filter(value: any): any[] {
    const filterValue = value;
    let lowed = filterValue;
    try {
      lowed = lowed.toLowerCase();
    } catch { }
    return this.options.filter(optionValue => optionValue.label.toLowerCase().includes(lowed));
  }

  getFilteredOptions(value: any): Observable<any[]> {
    let list = of(value).pipe(
      map(filterString => this.filter(filterString)));
    if (!this.multiple) {
      return list;
    } else {
      return list.pipe(map(filterString => this.filterWithList(filterString)));
    }
  }

  private filterWithList(values: any[]): any[] {
    let form = this.form.controls[this.formName];
    if (form.value instanceof Array) {
      return values.filter(value => !form.value.includes(value));
    } else {
      return values;
    }
  }

  onInput() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange(event: any) {
    if (event.label) {
      this.filteredOptions$ = this.getFilteredOptions(event.label);
      let form = this.form.controls[this.formName];

      if (!this.multiple) {
        form.setValue(event);
        this.formInput.controls['auto'].setValue(event.label);
      } else {
        if (form.value instanceof Array) {
          form.value.push(event)
          form.setValue(form.value);
        } else {
          form.setValue([event]);
        }
        
        this.formInput.controls['auto'].setValue('');
        this.onInput();
      }
    }
  }

  clearMultipleList(): void {
    this.form.controls[this.formName].setValue([]);
    this.formInput.controls['auto'].setValue('');
    this.onInput();
  }

  deleteItemFromList(value: never): void {
    let form = this.form.controls[this.formName];
    let index = form.value.indexOf(value);
    if (index != -1) {
      form.value.splice(index, 1)
      form.setValue(form.value);
    }
    
    // this.formInput.controls['auto'].setValue('');
    this.onInput();
  }

  setItemFromList() {
    if (this.selected) {
      let items: any[] = [];

      this.options.forEach(option => {
        this.selected.forEach(id => {
          if (option && option.id === id) {
            items.push(option);
          }
        });
      });
  
      this.form.controls[this.formName].setValue(items);
    }
  }
}
