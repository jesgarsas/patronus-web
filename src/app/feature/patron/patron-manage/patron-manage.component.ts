import { Component, HostListener, OnInit } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { PatronDTO } from 'src/app/models/patron/patron-dto';
import { AppContants } from 'src/app/utils/app-constants';

@Component({
  selector: 'app-patron-manage',
  templateUrl: './patron-manage.component.html',
  styleUrls: ['./patron-manage.component.scss']
})
export class PatronManageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
