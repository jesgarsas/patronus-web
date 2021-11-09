import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { TableColumn } from '@swimlane/ngx-datatable';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { GenericDialogCancelComponent } from 'src/app/component/generic-dialog/generic-dialog-cancel/generic-dialog-cancel.component';
import { GenericDialogDeleteComponent } from 'src/app/component/generic-dialog/generic-dialog-delete/generic-dialog-delete.component';
import { ConfigAction } from 'src/app/component/generic-table/model/config-action';
import { GrupoDTO } from 'src/app/models/grupo/grupo-dto';
import { Page } from 'src/app/models/page/page';
import { PatronFilterDto } from 'src/app/models/patron/filters/patron-filter-dto';
import { PatronDTO } from 'src/app/models/patron/patron-dto';
import { UsuarioFilterDto } from 'src/app/models/usuario/filter/usuario-filter-dto';
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

  public columns: TableColumn[] = [];
  public page: Page = new Page();
  private filter: UsuarioFilterDto = new UsuarioFilterDto();
  public configActions: ConfigAction = new ConfigAction({ delete: true});

  form: FormGroup = new FormGroup({});
  grupo: GrupoDTO = new GrupoDTO();
  headerTitle: string = 'Crear grupo nuevo';
  loading: boolean = false;
  close: boolean = true;

  nombreFormName: string = 'nombre';
  profesorFormName: string = 'profesor';

  profesorLabel: string | undefined;

  private dialog?: NbDialogRef<GenericDialogCancelComponent> ;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private grupoService: GrupoService,
    public usuarioService: UsuarioService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    // Recoger los datos del grupo que nos pasan
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      if (params.id) {
        this.getGrupo(params.id);
      }
    });
    this.buildColumns();
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
    this.loading = true;
    this.grupoService.getOne(id).pipe(take(1)).subscribe(data => {
      if (data) {
        this.grupo = data;
        this.setValuesForm();
        this.getAlumnos();
        this.loading = false;
      } else {
        this.toastService.showError('Error', 'No se ha podido cargar el patrón');
        this.loading = false;
        this.router.navigate(['/grupo/administracion']);
      }
    }, error => {
      this.toastService.showError('Error', 'No se ha podido conectar con el servidor');
      this.loading = false;
      this.router.navigate(['/grupo/administracion']);
    })
  }

  private setValuesForm() {
    this.form.controls[this.nombreFormName].setValue(this.grupo.nombre);
    this.form.controls[this.profesorFormName].setValue(this.grupo.profesor);
    this.profesorLabel = `${this.grupo.profesor!.id} - ${AppUtilities.firstLetterUpper(this.grupo.profesor!.nick!)}`;
  }

  private setValuesDTO() {
    this.grupo.nombre = this.form.value[this.nombreFormName];
    this.grupo.profesor = this.form.value[this.profesorFormName];
  }

  private saveGrupo() {
    this.loading = true;
    this.grupoService.save(this.grupo).pipe(take(1)).subscribe((data) => {
      if (data) {
        this.toastService.showConfirmation('Éxito', 'Se ha guardado con éxito');
        this.loading = false;
        this.router.navigate(['/grupo/administracion']);
      } else {
        this.toastService.showError('Error', 'No se ha podido guardar el grupo');
        this.loading = false;
      }
    }, (error) => {
      if (error) {
        this.toastService.showError('Error', 'No se ha podido guardar el grupo');
        this.loading = false;
      }
    });
  }

  public onDelete(value: PatronDTO) {
    // this.dialog = this.dialogService.open(GenericDialogDeleteComponent, {
    //   context: {
    //     accept: () => {
    //       this.deletePatron(value);
    //     }
    //   }
    // });
  }

  private deletePatron(value: PatronDTO) {
    // if (value.id) {
    //   this.patroneService.deleteById(value.id).pipe(take(1)).subscribe((data) => {
    //     if (data) {
    //       this.getAlumnos();
    //       this.toastService.showConfirmation('Éxito', 'Se ha borrado con éxito');
    //     } else {
    //       this.toastService.showError('Error', 'No se ha podido borrar el patrón');
    //     }
    //     this.dialog!.close();
    //   }, (error) => {
    //     if (error) {
    //       this.toastService.showError('Error', 'No se ha podido borrar el patrón');
    //     }
    //     this.dialog!.close();
    //   });
    // }
  }

  public onSort(value: any) {
    if (value.sorts && value.sorts[0]) {
      this.filter.sort = value.sorts[0].dir;
      this.filter.column = value.sorts[0].prop;
      this.filter.pageNumber = 0;
      this.getAlumnos();
    }
  }

  public onPage(value: any) {
    this.filter.pageNumber = value.offset;
    this.getAlumnos();
  }

  private getAlumnos() {
    this.loading = true;
    this.filter.idGrupo = this.grupo.id;
    if (this.grupo.id) {
      this.usuarioService.getByGroup(this.filter).pipe(take(1)).subscribe((data) => {
        if (data) {
          this.page = data;
          this.transformData();
        }
        this.loading = false;
      },
        (error) => {
          this.loading = false;
          this.toastService.showError('Error', 'No se ha podido conectar con el servidor');
        });
    }
  }

  private transformData() {
    // this.page.content.map((row: PatronDTO) => {
    //   row.fechaCreacion = moment(row.fechaCreacion, 'YYYY-MM-DD').format('DD/MM/YYYY');
    //   row.autor!.nick = AppUtilities.firstLetterUpper(row.autor!.nick!);
    //   row.nombre = AppUtilities.firstLetterUpper(row.nombre!);
    // });
  }

  private buildColumns() {
    this.columns = [
      { prop: 'id', name: 'Identificador', resizeable: false, draggable: false, sortable: true, flexGrow: 1 },
      { prop: 'nick', name: 'Nombre', resizeable: false, sortable: true, minWidth: 200, draggable: false, flexGrow: 2 },
      { prop: 'email', name: 'Email', resizeable: false, sortable: true, draggable: false, flexGrow: 1 }
    ];
  }
}
