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
import { EjercicioDTO } from 'src/app/models/patron/ejercicio-dto';
import { PatronDTO } from 'src/app/models/patron/patron-dto';
import { EjercicioService } from 'src/app/service/ejercicio.service';
import { ToastService } from 'src/app/service/toast.service';
import { AppContants } from 'src/app/utils/app-constants';
import { AppUtilities } from 'src/app/utils/app-uitilites';

@Component({
  selector: 'app-ejercicio-manage-table',
  templateUrl: './ejercicio-manage-table.component.html',
  styleUrls: ['./ejercicio-manage-table.component.scss']
})
export class EjercicioManageTableComponent implements OnInit {

  public columns: TableColumn[] = [];
  public page: Page = new Page();
  private filter: GrupoFilterDto = new GrupoFilterDto();
  public loading: boolean = false;
  public configActions: ConfigAction = new ConfigAction({ edit: true, delete: true, show: true });
  public form: FormGroup = new FormGroup({});

  private dialog?: NbDialogRef<GenericDialogDeleteComponent>;

  constructor(private ejercicioService: EjercicioService,
    private dialogService: NbDialogService,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit(): void {
    this.buildColumns();
    this.getEjercicios();
  }

  public onSort(value: any) {
    if (value.sorts && value.sorts[0]) {
      this.filter.sort = value.sorts[0].dir;
      this.filter.column = value.sorts[0].prop;
      this.filter.pageNumber = 0;
      this.getEjercicios();
    }
  }

  public onFilter() {
    if (this.form) {
      this.filter.nombre = this.form.value['nombre'];
      this.filter.profesor = this.form.value['profesor'];
      this.filter.patron = this.form.value['patron'];
      this.getEjercicios();
    }
  }

  public eraseForm() {
    this.form.reset();
    this.filter.reset();
    this.getEjercicios();
  }

  public onPage(value: any) {
    this.filter.pageNumber = value.offset;
    this.getEjercicios();
  }

  public onEdit(row: PatronDTO) {
    this.router.navigate([AppContants.EJERCICIO_CREAR_PATH], {queryParams: { idPatron: row.patron!.id, idEjercicio: row.id}});
  }

  public onDelete(row: PatronDTO) {
    this.ejercicioService.delete(row.id!).pipe(take(1)).subscribe((result) => {
      if (result) {
        this.toastService.showConfirmation('Éxito', 'Borrado con éxito');
        this.getEjercicios();
      }
    }, error => {
      this.toastService.showError('Error', 'No se pudo borrar el ejercicio');
    })
  }

  private buildColumns(): void {
    this.columns = [
      { prop: 'nombre', name: 'Nombre', resizeable: false, sortable: true, minWidth: 200, draggable: false, flexGrow: 2 },
      { prop: 'fechaCreacion', name: 'Fecha creación', resizeable: false, draggable: false, sortable: true, flexGrow: 1 },
      { prop: 'patron.nombre', name: 'Patrón', resizeable: false, draggable: false, sortable: true, flexGrow: 1 },
      { prop: 'nombreAutor', name: 'Autor', resizeable: false, draggable: false, sortable: true, flexGrow: 1 },
      { prop: 'numPreguntas', name: 'Nº Preguntas', resizeable: false, draggable: false, sortable: false, flexGrow: 1 }
    ];
  }

  private getEjercicios(): void {
    this.ejercicioService.getAllByPageFilter(this.filter).pipe(take(1)).subscribe((data: Page) => {
      if (data) {
        this.page = data;
        this.transformData();
      }
      this.loading = false;
    },
      (error: any) => {
        this.loading = false;
        this.toastService.showError('Error', 'No se ha podido conectar con el servidor');
      });
  }

  private transformData() {
    this.page.content.map((row: EjercicioDTO) => {
      row.nombre = AppUtilities.firstLetterUpper(row.nombre!);
      row.fechaCreacion = AppUtilities.fomatDateToDDMMYYYY(row.fechaCreacion!);
      row.nombreAutor = AppUtilities.firstLetterUpper(row.nombreAutor!);
      row.patron!.nombre = AppUtilities.firstLetterUpper(row.patron?.nombre!);
    });
  }

}
