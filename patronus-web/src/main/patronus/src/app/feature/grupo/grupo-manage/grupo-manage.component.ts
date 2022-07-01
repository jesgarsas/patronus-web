import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppContants } from 'src/app/utils/app-constants';

@Component({
  selector: 'app-grupo-manage',
  templateUrl: './grupo-manage.component.html',
  styleUrls: ['./grupo-manage.component.scss']
})
export class GrupoManageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  crearGrupo() {
    this.router.navigate([AppContants.GRUPO_CREAR_PATH]);
  }

}
