import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario';
import { LoginService } from 'src/app/service/login.service';
import { AppContants } from 'src/app/utils/app-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit {

  public rolId?: number;
  public loading: boolean = true;
  public user?: Usuario;

  public rolAlumno: number = AppContants.ROL_ALUMNO;
  public rolProfesor: number = AppContants.ROL_PROFESOR;
  public rolAdmin: number = AppContants.ROL_ADMINISTRADOR;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.checkRol();
  }

  ngAfterContentInit(): void {
    this.loading = false;
  }
  
  private checkRol() {
    this.user = this.loginService.getUser();
    if (this.user) {
      this.rolId = this.user.rolId!;
    }
  }
}
