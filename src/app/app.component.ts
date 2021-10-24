import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbSidebarComponent, NbSidebarService } from '@nebular/theme';
import { GenericSpinnerComponent } from './component/generic-spinner/generic-spinner.component';
import { LoginService } from './service/login.service';
import { AppContants } from './utils/app-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('sidebar')
  public sidebar!: NbSidebarComponent;
  @ViewChild('spinner')
  public spinner!: GenericSpinnerComponent;

  public mobile: boolean = false;

  constructor(private sidebarService: NbSidebarService,
    private router: Router, private loginService: LoginService) {
    // Set interface
    this.resizeInteface();
    if (!this.loginService.getUser()) {
      this.router.navigate(['/login']);
    }
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
