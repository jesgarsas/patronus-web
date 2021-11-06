import { Component, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { UsuarioDTO } from 'src/app/models/usuario/usuario-dto';
import { LoginService } from 'src/app/service/login.service';
import { ToastService } from 'src/app/service/toast.service';
import { RolService } from 'src/app/service/rol.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AppContants } from 'src/app/utils/app-constants';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { DialogPasswordChangeComponent } from 'src/app/component/generic-dialog/dialog-password-change/dialog-password-change.component';
import { Md5 } from 'md5-typescript';
import { AppUtilities } from 'src/app/utils/app-uitilites';

@Component({
  selector: 'app-usuario-details',
  templateUrl: './usuario-details.component.html',
  styleUrls: ['./usuario-details.component.scss']
})
export class UsuarioDetailsComponent implements OnInit {

  private dialog?: NbDialogRef<DialogPasswordChangeComponent>;
  imageURI: string = AppContants.URI_PROFILE_IMAGE;
  user: UsuarioDTO = new UsuarioDTO;
  isAlumno: boolean = true;
  isProfesor: boolean = true;
  id: number = 0;
  form: FormGroup = new FormGroup({});
  loading: boolean = false;

  constructor(private usuarioService: UsuarioService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private rolService: RolService,
    private dialogService: NbDialogService) { }

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

  onChangePassword(): void {
    let form: FormGroup = new FormGroup({});
    form.setValidators(this.samePassword());
    this.dialog = this.dialogService.open(DialogPasswordChangeComponent, {
      context: {
        form: form,
        accept: () => {
          form.markAsTouched();
          if (form.valid) {
            this.dialog?.close();
            let formData: FormData = new FormData();
            formData.append("newPassword", Md5.init(form.value['newPassword']));
            formData.append("nick", this.user.nick!);
            formData.append("password", Md5.init(form.value['password']))
            this.loading = true;
            this.usuarioService.changePassword(formData).pipe(take(1)).subscribe(data => {
              if (data) {
                this.toastService.showConfirmation('Éxito', 'La contraseña ha sido modificada');
              } else {
                this.toastService.showError('Error', 'Contraseña actual no coincide');
              }
              this.loading = false;
            }, error => {
              this.toastService.showError('Error', 'No se ha podido conectar con el servidor');
              this.loading = false;
            });
          } else {
            let errors: string[] = AppUtilities.getErrorsFromForm(form);
            errors.forEach(msg => {
              this.toastService.showError('Error', msg.replace('newPassword2', 'nueva contraseña otra vez')
                .replace('newPassword', 'nueva contraseña').replace('password', 'contraseña actual'));
            });
            if (form.errors && form.errors['newPassword']) {
              this.toastService.showError('Error', 'La contraseña nueva no coincide en ambos campos');
            }
          }

        }
      }
    });
  }

  private samePassword(): ValidatorFn {
    return (control: any): ValidationErrors | null => {
      const isValid = (control.controls['newPassword'] && control.controls['newPassword2'] &&
        !control.controls['newPassword'].value && !control.controls['newPassword2'].value) || (control.controls['newPassword'] && control.controls['newPassword2'] &&
        control.controls['newPassword'].value && control.controls['newPassword2'].value &&
        control.controls['newPassword'].value.trim().length > 0 && control.controls['newPassword2'].value.trim().length > 0
        && control.controls['newPassword'].value.trim() === control.controls['newPassword2'].value.trim());
      return isValid ? null : { 'newPassword': true };
    }
  }
}