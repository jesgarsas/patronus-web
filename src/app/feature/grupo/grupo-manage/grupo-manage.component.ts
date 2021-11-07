import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    this.router.navigate(['/grupo/administracion/crear']);
  }

}
