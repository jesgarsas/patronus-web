import { Component, Input, OnInit } from '@angular/core';
import { PatronDTO } from 'src/app/models/patron/patron-dto';

@Component({
  selector: 'app-patron-listitem',
  templateUrl: './patron-listitem.component.html',
  styleUrls: ['./patron-listitem.component.scss']
})
export class PatronListitemComponent implements OnInit {

  @Input() public item?: PatronDTO;

  constructor() { }

  ngOnInit(): void {
  }

}
