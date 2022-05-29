import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Md5 } from 'md5-typescript';
import { take } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario/usuario';
import { LoginService } from 'src/app/service/login.service';
import { NotifierService } from 'src/app/service/notifier.service';
import { ToastService } from 'src/app/service/toast.service';
import { AppContants } from 'src/app/utils/app-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  loading: boolean = false;

  constructor(private loginService: LoginService,
    private toastService: ToastService,
    private router: Router,
    private notifierService: NotifierService) { }

  ngOnInit(): void {
    if (!this.loginService.getUser()) {
      this.notifierService.emitUserLogged(false);
    }

  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      let formData: FormData = new FormData();
      formData.append('nick', this.form.value['nick']);
      formData.append('password', Md5.init(this.form.value['password']));
      this.loginService.login(formData).pipe(take(1)).subscribe((user: Usuario) => {
        this.loginService.setUser(user);
        this.toastService.showConfirmation('Éxito', 'Se ha iniciado sesión de forma exitosa');
        this.notifierService.emitUserLogged(true);
        this.router.navigate([AppContants.HOME_PATH]);
        this.loading = false;
      }, (error) => {
        if (error.status === 404) {
          this.toastService.showError('Error', 'La combinación de usuario y contraseña no existe');
        } else {
          this.toastService.showError('Error', 'No se ha podido conectar con el servidor');
        }
        this.loading = false;
      });
    } else {
      this.toastService.showError('Error', 'Rellene el campo de nombre de usuario y la contraseña');
    }
  }

}
