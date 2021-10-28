import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { TableColumn } from '@swimlane/ngx-datatable';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { GenericDialogDeleteComponent } from 'src/app/component/generic-dialog/generic-dialog-delete/generic-dialog-delete.component';
import { ConfigAction } from 'src/app/component/generic-table/model/config-action';
import { Page } from 'src/app/models/page/page';
import { PatronFilterDto } from 'src/app/models/patron/filters/patron-filter-dto';
import { PatronDTO } from 'src/app/models/patron/patron-dto';
import { PatronService } from 'src/app/service/patron.service';
import { ToastService } from 'src/app/service/toast.service';
import { AppUtilities } from 'src/app/utils/app-uitilites';

@Component({
  selector: 'app-patron-manage-table',
  templateUrl: './patron-manage-table.component.html',
  styleUrls: ['./patron-manage-table.component.scss']
})
export class PatronManageTableComponent implements OnInit {

  public columns: TableColumn[] = [];
  public page: Page = new Page();
  private filter: PatronFilterDto = new PatronFilterDto();
  public loading: boolean = false;
  public configActions: ConfigAction = new ConfigAction({ edit: true, delete: true });
  public form: FormGroup = new FormGroup({});

  private dialog?: NbDialogRef<GenericDialogDeleteComponent>;

  constructor(private patroneService: PatronService,
    private dialogService: NbDialogService,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit(): void {
    this.buildColumns();
    this.getPatrones();
  }

  public onDelete(value: PatronDTO) {
    this.dialog = this.dialogService.open(GenericDialogDeleteComponent, {
      context: {
        accept: () => {
          this.deletePatron(value);
        }
      }
    });
  }

  private deletePatron(value: PatronDTO) {
    if (value.id) {
      this.patroneService.deleteById(value.id).pipe(take(1)).subscribe((data) => {
        if (data) {
          this.getPatrones();
          this.toastService.showConfirmation('Éxito', 'Se ha borrado con éxito');
        } else {
          this.toastService.showError('Error', 'No se ha podido borrar el patrón');
        }
        this.dialog!.close();
      }, (error) => {
        if (error) {
          this.toastService.showError('Error', 'No se ha podido borrar el patrón');
        }
        this.dialog!.close();
      });
    }
  }

  public onSort(value: any) {
    if (value.sorts && value.sorts[0]) {
      this.filter.sort = value.sorts[0].dir;
      this.filter.column = value.sorts[0].prop;
      this.filter.pageNumber = 0;
      this.getPatrones();
    }
  }

  public onFilter() {
    if (this.form) {
      this.filter.name = this.form.value['nombre'];
      this.filter.autor = this.form.value['autor'];
      this.filter.dateIni = this.form.value['dateIni'];
      this.filter.dateFin = this.form.value['dateFin'];
    }
    this.getPatrones();
  }

  public eraseForm() {
    this.form.reset();
    this.filter.reset();
    this.getPatrones();
  }

  public onPage(value: any) {
    this.filter.pageNumber = value.offset;
    this.getPatrones();
  }

  public onEdit(value: PatronDTO) {
    this.router.navigate(['/patron/administracion/crear'], { queryParams: { id: value.id }, queryParamsHandling: "merge" });
  }

  private getPatrones() {
    this.loading = true;
    this.patroneService.getAllByPageFilter(this.filter).pipe(take(1)).subscribe((data: Page) => {
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
    this.page.content.map((row: PatronDTO) => {
      row.fechaCreacion = moment(row.fechaCreacion, 'YYYY-MM-DD').format('DD/MM/YYYY');
      row.autor!.nick = AppUtilities.firstLetterUpper(row.autor!.nick!);
      row.nombre = AppUtilities.firstLetterUpper(row.nombre!);
    });
  }

  private buildColumns() {
    this.columns = [
      { prop: 'nombre', name: 'Nombre', resizeable: false, sortable: true, minWidth: 200, draggable: false, flexGrow: 2 },
      { prop: 'fechaCreacion', name: 'Fecha de creación', resizeable: false, sortable: true, draggable: false, flexGrow: 1 },
      { prop: 'autor.nick', name: 'Autor', resizeable: false, draggable: false, sortable: false, flexGrow: 1 },
      { prop: 'leccionesCount', name: 'Nº Lecciones', resizeable: false, draggable: false, sortable: false, flexGrow: 1 },
      { prop: 'proyectosCount', name: 'Nº Proyectos', resizeable: false, draggable: false, sortable: false, flexGrow: 1 }
    ];
  }

}
