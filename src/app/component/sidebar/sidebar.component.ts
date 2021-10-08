import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public window: any = window;

  public verPatronesRoute: string = "/patron/buscador";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

}
