import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppContants } from 'src/app/utils/app-constants';

@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.component.html',
  styleUrls: ['./home-profesor.component.scss']
})
export class HomeProfesorComponent implements OnInit {

  public buttons: any[] = [
    {
      id: 0,
      name: 'Administrar ejercicios',
      icon: 'book-open-outline',
      url: AppContants.EJERCICIO_ADMINISTRAR_PATH
    },
    {
      id: 1,
      name: 'Administrar patrones',
      icon: 'folder-outline',
      url: AppContants.PATRON_ADMINISTRAR_PATH
    },
    {
      id: 2,
      name: 'Administrar grupos',
      icon: 'people-outline',
      url: AppContants.GRUPO_ADMINISTRAR_PATH
    },
    {
      id: 3,
      name: 'Ver patrones',
      icon: 'search-outline',
      url: AppContants.BUSCADOR_PATH
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickButton(id: number) {
    this.router.navigate([this.buttons[id].url]);
  }

}
