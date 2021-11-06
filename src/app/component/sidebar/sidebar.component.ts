import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { LoginService } from 'src/app/service/login.service';
import { NotifierService } from 'src/app/service/notifier.service';
import { AppContants } from 'src/app/utils/app-constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public window: any = window;

  public optionsAlumnos: NbMenuItem[] = [
    {
      title: 'Ver patrones',
      icon: 'book-open-outline',
      link: AppContants.BUSCADOR_PATH,
      pathMatch: "full"
    }
  ];

  public optionsProfesores: NbMenuItem[] = [
    ...this.optionsAlumnos,
    {
      title: 'Administrar patrones',
      icon: 'folder-outline',
      link: AppContants.PATRON_ADMINISTRAR_PATH,
      pathMatch: "full"
    },
    {
      title: 'Administrar grupos',
      icon: 'folder-outline',
      link: AppContants.GRUPO_ADMINISTRAR_PATH,
      pathMatch: "full"
    }
  ];

  public notAlumno: number | boolean | undefined;

  constructor(private notifierService: NotifierService,
    private loginService: LoginService,
    private menuService: NbMenuService) { }

  ngOnInit(): void {
    this.setMenuItems();

    this.notifierService.userLogged.pipe().subscribe((data: Boolean) => {
      if (data) {
        this.setMenuItems();
      }
    });
  }

  private setMenuItems(): void {
    let user = this.loginService.getUser();
    this.notAlumno = user && user?.rolId && user?.rolId > 1;
  }

}
