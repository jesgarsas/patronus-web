import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { NbMenuItem, NbSidebarComponent, NbSidebarService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { GenericSpinnerComponent } from './component/generic-spinner/generic-spinner.component';
import { Usuario } from './models/usuario/usuario';
import { LoginService } from './service/login.service';
import { NotifierService } from './service/notifier.service';
import { RolService } from './service/rol.service';
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
  public user: Usuario | undefined;
  public userRol: string = '';
  public profileOptions: NbMenuItem[] = [
    { title: 'Perfil', link: AppContants.USUARIO_DETALLES_PATH, queryParamsHandling: "merge", queryParams: { profile: true } },
    { title: 'Cerrar Sesión', icon: 'log-out-outline', link: AppContants.LOGOUT_PATH }
  ]
  public imageProfile: string = AppContants.URI_PROFILE_IMAGE;

  constructor(private sidebarService: NbSidebarService,
    private router: Router, private loginService: LoginService,
    private notifierService: NotifierService,
    private rolService: RolService,
    private titleService: Title,
    private activatedRoute: ActivatedRoute) {
    // Set interface
    this.resizeInteface();
    if (!this.loginService.getUser()) {
      this.router.navigate([AppContants.LOGIN_PATH]);
      this.userLogged = false;
    } else {
      this.userLogged = true;
      this.user = this.loginService.getUser();
      this.userRol = this.rolService.translateRol(this.user?.rolId!);
      if (window.location.pathname === AppContants.LOGIN_PATH
        || window.location.pathname === '/') {
        this.router.navigate([AppContants.HOME_PATH]);
      }
    }

    // Subscripcion para activar el sidebar
    this.notifierService.userLogged.pipe().subscribe((data: Boolean) => {
      this.userLogged = data ? true : false;
      if (data) {
        this.user = this.loginService.getUser();
        this.userRol = this.rolService.translateRol(this.user?.rolId!);
      } else {
        this.user = undefined;
        this.userRol = '';
      }
    });

    this.putTitleOnPage();
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

  private putTitleOnPage() {
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          if (child !== null) {
            while (child.firstChild) {
              child = child.firstChild;
            }
            if (child.snapshot.data['title']) {
              return 'Patronus - ' + child.snapshot.data['title'];
            }
          }
          return appTitle;
        })
      ).subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });
  }
}
