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
import { GrupoService } from 'src/app/service/grupo.service';
import { ToastService } from 'src/app/service/toast.service';
import { AppContants } from 'src/app/utils/app-constants';
import { AppUtilities } from 'src/app/utils/app-uitilites';

@Component({
  selector: 'app-grupo-manage-table',
  templateUrl: './grupo-manage-table.component.html',
  styleUrls: ['./grupo-manage-table.component.scss']
})
export class GrupoManageTableComponent implements OnInit {

  public columns: TableColumn[] = [];
  public page: Page = new Page();
  private filter: GrupoFilterDto = new GrupoFilterDto();
  public loading: boolean = false;
  public configActions: ConfigAction = new ConfigAction({ edit: true, delete: true });
  public form: FormGroup = new FormGroup({});

  private dialog?: NbDialogRef<GenericDialogDeleteComponent>;

  constructor(private grupoService: GrupoService,
    private dialogService: NbDialogService,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit(): void {
    this.buildColumns();
    this.getGrupos();
  }

  public onDelete(value: GrupoDTO) {
    this.dialog = this.dialogService.open(GenericDialogDeleteComponent, {
      context: {
        accept: () => {
          this.grupoService.delete(value.id!).pipe(take(1)).subscribe((isDeleted) => {
            if (isDeleted) {
              this.getGrupos();
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
      this.getGrupos();
    }
  }

  public onFilter() {
    if (this.form) {
      this.filter.nombre = this.form.value['nombre'];
      this.filter.profesor = this.form.value['profesor'];
      this.getGrupos();
    }
  }

  public eraseForm() {
    this.form.reset();
    this.filter.reset();
    this.getGrupos();
  }

  public onPage(value: any) {
    this.filter.pageNumber = value.offset;
    this.getGrupos();
  }

  public onEdit(value: PatronDTO) {
    this.router.navigate([AppContants.GRUPO_DETALLES_PATH], { queryParams: { id: value.id }, queryParamsHandling: "merge" });
  }

  private buildColumns(): void {
    this.columns = [
      { prop: 'nombre', name: 'Nombre', resizeable: false, sortable: true, minWidth: 200, draggable: false, flexGrow: 2 },
      { prop: 'profesor.nick', name: 'Profesor', resizeable: false, draggable: false, sortable: true, flexGrow: 1 },
      { prop: 'alumnosCount', name: 'Nº Alumnos', resizeable: false, draggable: false, sortable: false, flexGrow: 1 }
    ];
  }

  private getGrupos(): void {
    this.grupoService.getAllByPageFilter(this.filter).pipe(take(1)).subscribe((data: Page) => {
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
    this.page.content.map((row: GrupoDTO) => {
      row.profesor!.nick = AppUtilities.firstLetterUpper(row.profesor!.nick!);
    });
  }

}
