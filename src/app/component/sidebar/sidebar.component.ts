import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
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
      title: 'Página principal',
      icon: 'home-outline',
      link: AppContants.HOME_PATH,
      pathMatch: "full"
    },    
    {
      title: 'Ver patrones',
      icon: 'search-outline',
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
      title: 'Administrar ejercicios',
      icon: 'book-open-outline',
      link: AppContants.EJERCICIO_ADMINISTRAR_PATH,
      pathMatch: "full"
    },
    {
      title: 'Administrar grupos',
      icon: 'people-outline',
      link: AppContants.GRUPO_ADMINISTRAR_PATH,
      pathMatch: "full"
    }
  ];

  public optionsAdmin: NbMenuItem[] = [
    ...this.optionsProfesores,
    {
      title: 'Administrar usuarios',
      icon: 'person-outline',
      link: AppContants.USUARIO_ADMINISTRAR_PATH,
      pathMatch: "full"
    }
  ];

  public notAlumno: number | boolean | undefined;
  public admin: number | boolean | undefined;

  constructor(private notifierService: NotifierService,
    private loginService: LoginService) { }

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
    this.admin = user && user?.rolId && user?.rolId === 3;
  }

}
