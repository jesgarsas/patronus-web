import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patron-manage-creation',
  templateUrl: './patron-manage-creation.component.html',
  styleUrls: ['./patron-manage-creation.component.scss']
})
export class PatronManageCreationComponent implements OnInit {

  headerTitle: string = 'Crear patrón nuevo';

  constructor() { }

  ngOnInit(): void {
  }

}
