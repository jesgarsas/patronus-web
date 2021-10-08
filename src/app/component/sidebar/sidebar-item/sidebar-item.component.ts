import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss']
})
export class SidebarItemComponent implements OnInit {

  @Input() public icon: string = "";
  @Input() public label: string = "Opción"
  @Input() public path: string = "-";

  public classSelected: string = "";

  constructor() { }

  ngOnInit(): void {
    if(window.location.pathname === this.path) {
      this.classSelected = "selectedItem"
    }
  }

}
