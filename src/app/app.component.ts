import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NbSidebarComponent, NbSidebarService } from '@nebular/theme';
import { AppContants } from './utils/app-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('sidebar')
  public sidebar!: NbSidebarComponent;

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
    if (window.innerWidth <= AppContants.minWidthPhone) {
      this.mobile = true;
      this.toggleSidebarFixed();
      this.sidebarService.collapse('left');
    } else {
      this.mobile = false;
      this.toggleSidebarFixed();
      this.sidebarService.expand('left');
    }
  }

  private toggleSidebarFixed() {
    if (this.sidebar) {
      this.sidebar.fixed = this.mobile;
    }
  }
}
