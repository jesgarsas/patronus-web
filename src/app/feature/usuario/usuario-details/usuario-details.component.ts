import { Component, OnInit } from '@angular/core';
import { AppContants } from 'src/app/utils/app-constants';

@Component({
  selector: 'app-usuario-details',
  templateUrl: './usuario-details.component.html',
  styleUrls: ['./usuario-details.component.scss']
})
export class UsuarioDetailsComponent implements OnInit {

  imageURI: string = AppContants.URI_PROFILE_IMAGE;

  constructor() { }

  ngOnInit(): void {
  }

}
