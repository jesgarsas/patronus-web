import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbSidebarComponent, NbSidebarService } from '@nebular/theme';
import { takeUntil } from 'rxjs/operators';
import { GenericSpinnerComponent } from './component/generic-spinner/generic-spinner.component';
import { LoginService } from './service/login.service';
import { NotifierService } from './service/notifier.service';
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
  public userLogged: boolean = true;

  constructor(private sidebarService: NbSidebarService,
    private router: Router, private loginService: LoginService,
    private notifierService: NotifierService) {
    // Set interface
    this.resizeInteface();
    if (!this.loginService.getUser()) {
      this.router.navigate(['/login']);
      this.userLogged = false;
    } else {
      this.userLogged = true;
      if (window.location.pathname === '/login') {
        this.router.navigate(['/patron/buscador']);
      }
    }

    // Subscripcion para activar el sidebar
    this.notifierService.userLogged.pipe().subscribe((data: Boolean) => {
      this.userLogged = data ? true : false;
    });
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
