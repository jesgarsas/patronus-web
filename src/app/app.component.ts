import { Component, HostListener, ViewChild } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public mobile: boolean = false;

  constructor(private sidebarService: NbSidebarService) {
    // Set interface
    this.resizeInteface();
  }

  public toggleSideBar() {
    this.sidebarService.toggle(false, 'left');
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeInteface();
  }
  
  private resizeInteface() {
    if (window.innerWidth <= 1140) {
      this.sidebarService.collapse('left');
      this.mobile = true;
    } else {
      this.sidebarService.expand('left');
      this.mobile = false;
    }
  }
}
