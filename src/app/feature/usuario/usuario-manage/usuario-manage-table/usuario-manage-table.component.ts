import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { TableColumn } from '@swimlane/ngx-datatable';
import { take } from 'rxjs/operators';
import { GenericDialogDeleteComponent } from 'src/app/component/generic-dialog/generic-dialog-delete/generic-dialog-delete.component';
import { ConfigAction } from 'src/app/component/generic-table/model/config-action';
import { GrupoFilterDto } from 'src/app/models/grupo/filters/grupo-filter-dto';
import { GrupoDTO } from 'src/app/models/grupo/grupo-dto';
import { Page } from 'src/app/models/page/page';
import { PatronDTO } from 'src/app/models/patron/patron-dto';
import { UsuarioFilterDto } from 'src/app/models/usuario/filter/usuario-filter-dto';
import { UsuarioDTO } from 'src/app/models/usuario/usuario-dto';
import { GrupoService } from 'src/app/service/grupo.service';
import { ToastService } from 'src/app/service/toast.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AppContants } from 'src/app/utils/app-constants';
import { AppUtilities } from 'src/app/utils/app-uitilites';

@Component({
  selector: 'app-usuario-manage-table',
  templateUrl: './usuario-manage-table.component.html',
  styleUrls: ['./usuario-manage-table.component.scss']
})
export class UsuarioManageTableComponent implements OnInit {


  public columns: TableColumn[] = [];
  public page: Page = new Page();
  private filter: UsuarioFilterDto = new UsuarioFilterDto();
  public loading: boolean = false;
  public configActions: ConfigAction = new ConfigAction({ edit: true, delete: true });
  public form: FormGroup = new FormGroup({});
  public roles: any[] = [
    {
      value: 1,
      label: 'Alumno'
    },
    {
      value: 2,
      label: 'Profesor'
    },
    {
      value: 3,
      label: 'Administrador'
    }
  ];

  private dialog?: NbDialogRef<GenericDialogDeleteComponent>;

  constructor(private usuarioService: UsuarioService,
    private dialogService: NbDialogService,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit(): void {
    this.buildColumns();
    this.getUsuarios();
  }

  public onDelete(value: GrupoDTO) {
    this.dialog = this.dialogService.open(GenericDialogDeleteComponent, {
      context: {
        accept: () => {
          this.usuarioService.delete(value.id!).pipe(take(1)).subscribe((isDeleted) => {
            if (isDeleted) {
              this.getUsuarios();
              this.toastService.showConfirmation('Éxito', 'Se ha borrado con éxito');
            } else {
              this.toastService.showError('Error', 'No se ha podido borrar el grupo');
            }
            this.dialog!.close();
          }, error => {
            this.toastService.showError('Error', 'No se ha podido borrar el grupo');
            this.dialog!.close();
          })
        }
      }
    });
  }

  public onSort(value: any) {
    if (value.sorts && value.sorts[0]) {
      this.filter.sort = value.sorts[0].dir;
      this.filter.column = value.sorts[0].prop;
      this.filter.pageNumber = 0;
      this.getUsuarios();
    }
  }

  public onFilter() {
    if (this.form) {
      this.filter.name = this.form.value['name'];
      this.filter.email = this.form.value['email'];
      this.filter.type = this.form.value['type'];
      this.getUsuarios();
    }
  }

  public eraseForm() {
    this.form.reset();
    this.filter.reset();
    this.getUsuarios();
  }

  public onPage(value: any) {
    this.filter.pageNumber = value.offset;
    this.getUsuarios();
  }

  public onEdit(value: PatronDTO) {
    this.router.navigate([AppContants.GRUPO_DETALLES_PATH], { queryParams: { id: value.id }, queryParamsHandling: "merge" });
  }

  private buildColumns(): void {
    this.columns = [
      { prop: 'nombre', name: 'Nombre', resizeable: false, sortable: true, minWidth: 200, draggable: false, flexGrow: 2 },
      { prop: 'email', name: 'Email', resizeable: false, draggable: false, sortable: true, flexGrow: 2 },
      { prop: 'type', name: 'Tipo', resizeable: false, draggable: false, sortable: true, flexGrow: 1 },
    ];
  }

  private getUsuarios(): void {
    this.usuarioService.getAllByPageFilter(this.filter).pipe(take(1)).subscribe((data: Page) => {
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
  
  private transformData() {
    this.page.content.map((row: any) => {
      row.nombre! = AppUtilities.firstLetterUpper(row.nick!);
      if (row.rolId === 1) {
        row.type! = 'Alumno';
      } else if (row.rolId === 2) {
        row.type! = 'Profesor';
      } else if (row.rolId === 3) {
        row.type! = 'Administrador';
      } else {
        row.type! = '-';
      }
    });
  }

}
