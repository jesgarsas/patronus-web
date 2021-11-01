import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { UsuarioDTO } from 'src/app/models/usuario/usuario-dto';
import { LoginService } from 'src/app/service/login.service';
import { ToastService } from 'src/app/service/toast.service';
import { RolService } from 'src/app/service/rol.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AppContants } from 'src/app/utils/app-constants';

@Component({
  selector: 'app-usuario-details',
  templateUrl: './usuario-details.component.html',
  styleUrls: ['./usuario-details.component.scss']
})
export class UsuarioDetailsComponent implements OnInit {

  imageURI: string = AppContants.URI_PROFILE_IMAGE;
  user: UsuarioDTO = new UsuarioDTO;
  isAlumno: boolean = true;
  isProfesor: boolean = true;
  id: number = 0;
  form: FormGroup = new FormGroup({});

  constructor(private usuarioService: UsuarioService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private rolService: RolService) { }

  ngOnInit(): void {

    this.route.queryParamMap.pipe(take(1)).subscribe(map => {
      if (map.get("profile")) {
        let user = this.loginService.getUser();
        if (user) {
          this.getProfileValues(user.id!);
        }
      } else {
        this.getUserValues(map.get("id"));
      }
    });
  }

  getProfileValues(id: Number): void {
    let user = this.loginService.getUser();
    this.usuarioService.getUserInformation(+id, user!.token!).pipe(take(1)).subscribe(user => {
      if (user) {
        this.user = user;
        this.setValues();
      } else {
        this.toastService.showError('Error', 'El usuario no existe');
      }
    }, _ => {
      this.toastService.showError('Error', 'No se ha podido conectar con el servidor');
    });
  }

  setValues() {
    this.form.controls['nick'].setValue(this.user.nick);
    this.form.controls['email'].setValue(this.user.email);
    this.form.controls['grupo'].setValue(this.user.grupo);
    this.form.controls['profesor'].setValue(this.user.profesor);
    this.form.controls['profesorEmail'].setValue(this.user.profesorEmail);
    this.form.controls['rol'].setValue(this.rolService.translateRol(this.user.rolId!));
    this.isAlumno = this.user.rolId! === 1;
    this.isProfesor = !this.isAlumno;
  }

  getUserValues(idString: string | null): void {
    let id: Number = new Number(idString);
    if (id != NaN) {
      this.id = +id;
      this.getProfileValues(id);
    }
  }

}