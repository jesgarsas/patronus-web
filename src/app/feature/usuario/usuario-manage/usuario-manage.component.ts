import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Md5 } from 'md5-typescript';
import { take } from 'rxjs/operators';
import { GenericDialogComponent } from 'src/app/component/generic-dialog/generic-dialog.component';
import { UsuarioDTO } from 'src/app/models/usuario/usuario-dto';
import { ToastService } from 'src/app/service/toast.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AppUtilities } from 'src/app/utils/app-uitilites';
import { UserDialogCreateComponent } from '../user-dialog/user-dialog-create/user-dialog-create.component';

@Component({
  selector: 'app-usuario-manage',
  templateUrl: './usuario-manage.component.html',
  styleUrls: ['./usuario-manage.component.scss']
})
export class UsuarioManageComponent implements OnInit {

  private dialog?: NbDialogRef<GenericDialogComponent>;
  public refresh: boolean = false;

  constructor(private usuarioService: UsuarioService,
    private dialogService: NbDialogService,
    private toastService: ToastService) { }

  ngOnInit() { }

  crearProfesor() {
    let form = new FormGroup({});
    this.dialog = this.dialogService.open(UserDialogCreateComponent, {
      context: {
        form: form,
        label: 'Crear nuevo profesor',
        rol: 2,
        accept: () => {
          this.createUser(form);
        }
      }
    })
  }

  crearAdmin() {
    let form = new FormGroup({});
    this.dialog = this.dialogService.open(UserDialogCreateComponent, {
      context: {
        form: form,
        label: 'Crear nuevo administrador',
        rol: 3,
        accept: () => {
          this.createUser(form);
        }
      }
    });
  }

  handleRefresh() {
    this.refresh = false;
  }

  private createUser(form: FormGroup) {
    if (form && form.valid) {
      let usuario: UsuarioDTO = this.mapFromForm(form);
      this.usuarioService.create(usuario).pipe(take(1)).subscribe((created) => {
        if (created) {
          this.toastService.showConfirmation('Éxito', 'Se ha creado con éxito');
          this.refresh = true;
        } else {
          this.toastService.showError('Error', 'No se ha podido crear el usuario');
        }
        this.dialog!.close();
      }, error => {
        this.toastService.showError('Error', 'No se ha podido crear el usuario');
        this.dialog!.close();
      });
    } else {
      let messages: string[] = AppUtilities.getErrorsFromForm(form);
      messages.forEach(msg => { this.toastService.showError('Error', msg); })
    }
  }
  
  private mapFromForm(form: FormGroup) {
    let dto: UsuarioDTO = new UsuarioDTO();
    dto.email = form.controls['email'] ? form.controls['email'].value : undefined;
    dto.nick = form.controls['nick'] ? form.controls['nick'].value : undefined;
    dto.rolId = form.controls['rol'] ? form.controls['rol'].value : 1;
    dto.password = form.controls['password'] ? Md5.init(form.controls['password'].value) : undefined;
    return dto;
  }

}
