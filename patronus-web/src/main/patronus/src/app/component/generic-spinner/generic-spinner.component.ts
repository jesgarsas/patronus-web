import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-spinner',
  templateUrl: './generic-spinner.component.html',
  styleUrls: ['./generic-spinner.component.scss']
})
export class GenericSpinnerComponent implements OnInit {

  @Input() loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleLoading() {
    this.loading = !this.loading;
  }
}
