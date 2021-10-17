import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public window: any = window;

  public verPatronesRoute: string = "/patron/buscador";
  public administrarPatronesRoute: string = "/patron/administracion"

  public options: NbMenuItem[] = [
    {
      title: 'Ver patrones',
      icon: 'book-open-outline',
      link: this.verPatronesRoute,
      pathMatch: "full"
    },
    {
      title: 'Administrar patrones',
      icon: 'folder-outline',
      link: this.administrarPatronesRoute,
      pathMatch: "full"
    }
  ];

  constructor() { }

  ngOnInit(): void {

  }

}
