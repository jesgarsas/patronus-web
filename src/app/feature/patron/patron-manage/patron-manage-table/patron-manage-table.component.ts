import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { TableColumn } from '@swimlane/ngx-datatable';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { GenericDialogDeleteComponent } from 'src/app/component/generic-dialog/generic-dialog-delete/generic-dialog-delete.component';
import { ConfigAction } from 'src/app/component/generic-table/model/config-action';
import { Page } from 'src/app/component/generic-table/model/page';
import { PatronDTO } from 'src/app/models/patron/patron-dto';
import { PatronService } from 'src/app/service/patron.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-patron-manage-table',
  templateUrl: './patron-manage-table.component.html',
  styleUrls: ['./patron-manage-table.component.scss']
})
export class PatronManageTableComponent implements OnInit {

  public columns: TableColumn[] = [];
  public rows: PatronDTO[] = [];
  public page: Page = new Page(0,10,0,1);
  public loading: boolean = false;
  public configActions: ConfigAction = new ConfigAction({ edit: true, delete: true });

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
      this.page.sort = value.sorts[0].dir;
      this.page.column = value.sorts[0].prop;
      this.page.pageNumber = 0;
      this.getPatrones();
    }
  }

  public onPage(value: any) {
    this.page.pageNumber = value.offset;
    this.getPatrones();
  }

  public onEdit(value: PatronDTO) {
    this.router.navigate(['/patron/administracion/crear'], { queryParams: { id: value.id }, queryParamsHandling: "merge" });
  }

  private getPatrones() {
    this.loading = true;
    this.patroneService.getAllByPageFilter(this.page).pipe(take(1)).subscribe((data: any) => {
      if (data) {
        this.rows = data.patrones;
        this.page.totalElements = data.totalElements;
        this.page.totalPages = data.totalPages;
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
    this.rows.map(row => {
      row.fechaCreacion = moment(row.fechaCreacion, 'YYYY-MM-DD').format('DD/MM/YYYY');
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
