import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { GenericDialogCancelComponent } from 'src/app/component/generic-dialog/generic-dialog-cancel/generic-dialog-cancel.component';
import { GrupoDTO } from 'src/app/models/grupo/grupo-dto';
import { UsuarioDTO } from 'src/app/models/usuario/usuario-dto';
import { GrupoService } from 'src/app/service/grupo.service';
import { ToastService } from 'src/app/service/toast.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AppUtilities } from 'src/app/utils/app-uitilites';

@Component({
  selector: 'app-grupo-manage-creation',
  templateUrl: './grupo-manage-creation.component.html',
  styleUrls: ['./grupo-manage-creation.component.scss']
})
export class GrupoManageCreationComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  grupo: GrupoDTO = new GrupoDTO();
  headerTitle: string = 'Crear grupo nuevo';
  loading: boolean = false;

  nombreFormName: string = 'nombre';
  profesorFormName: string = 'profesor';

  private dialog?: NbDialogRef<GenericDialogCancelComponent>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private grupoService: GrupoService,
    public usuarioService: UsuarioService,
    private toastService: ToastService) { }

  ngOnInit(): void {
  }

  onSave() {
    this.form.markAllAsTouched();
    if (this.form && this.form.valid) {
      this.setValuesDTO();
      this.saveGrupo();
    } else {
      this.getMessageError();
    }
  }

  onBack() {
    this.dialog = this.dialogService.open(GenericDialogCancelComponent, {
      context: {
        accept: () => {
          this.router.navigate(['/grupo/administracion']);
          this.dialog!.close();
        }
      }
    });
  }

  transformProfesores(data: any): void {
    if (data) {
      data.label = `${data.id} - ${AppUtilities.firstLetterUpper(data.nick)}`;
    }
  }

  private getMessageError() {
    let messages: string[] = AppUtilities.getErrorsFromForm(this.form);
    messages.forEach(msg => { this.toastService.showError('Error', msg); })
  }

  private getGrupo(id: any) {
    // this.loading = true;
    // this.patronService.getByIdAndLocale(id, 1).pipe(take(1)).subscribe(data => {
    //   if (data) {
    //     this.patron = data;
    //     this.setValuesForm();
    //     this.loading = false;
    //   } else {
    //     this.toastService.showError('Error', 'No se ha podido cargar el patrón');
    //     this.loading = false;
    //     this.router.navigate(['/patron/administracion']);
    //   }
    // }, error => {
    //   this.toastService.showError('Error', 'No se ha podido conectar con el servidor');
    //   this.loading = false;
    //   this.router.navigate(['/patron/administracion']);
    // })
  }

  private setValuesForm() {
    // this.form.controls[this.titleFormName].setValue(this.patron.nombre);
    // this.form.controls[this.descripcionFormName].setValue(this.patron.descripciones ? this.patron.descripciones[0].descripcion : undefined);
    // this.form.controls[this.contenidoFormName].setValue(this.patron.lecciones ? this.patron.lecciones[0].contenido : undefined);

    // if (this.patron.proyectos) {
    //   this.patron.proyectos.map(proyecto => { this.rows.push(proyecto); });
    //   this.rows = [...this.rows];
    // }
  }

  private setValuesDTO() {
  }

  private saveGrupo() {
    // let formData: FormData = new FormData();
    // formData.append('patron', new Blob([JSON.stringify(this.patron)], { type: 'application/json' }));
    // for (let file of this.files) {
    //   formData.append(`files`, file);
    // }
    // this.loading = true;
    // this.patronService.save(this.patron, formData).pipe(take(1)).subscribe((data) => {
    //   if (data) {
    //     this.toastService.showConfirmation('Éxito', 'Se ha guardado con éxito');
    //     this.loading = false;
    //     this.router.navigate(['/patron/administracion']);
    //   } else {
    //     this.toastService.showError('Error', 'No se ha podido guardar el patrón');
    //     this.loading = false;
    //   }
    // }, (error) => {
    //   if (error) {
    //     this.toastService.showError('Error', 'No se ha podido guardar el patrón');
    //     this.loading = false;
    //   }
    // });
  }
}
