import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { TableColumn } from '@swimlane/ngx-datatable';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { GenericDialogDeleteComponent } from 'src/app/component/generic-dialog/generic-dialog-delete/generic-dialog-delete.component';
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
  public rows: any[] = [];

  private dialog?: NbDialogRef<GenericDialogDeleteComponent>;

  constructor(private patroneService: PatronService,
    private dialogService: NbDialogService,
    private toastService: ToastService) { }

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

  public onEdit(value: PatronDTO) {

  }

  private getPatrones() {
    this.patroneService.getAllByLocale(1).pipe(take(1)).subscribe((data: PatronDTO[]) => {
      if (data) {
        this.rows = data;
        this.transformData();
      }
    });
  }

  private transformData() {
    this.rows.map(row => {
      row.leccion = row.leccion ? 1 : 0;
      row.proyectos = row.proyectos ? row.proyectos : { length: 0 };
      row.fechaCreacion = moment(row.fechaCreacion, 'YYYY-MM-DD').format('DD/MM/YYYY');
    });
  }

  private buildColumns() {
    this.columns = [
      { prop: 'nombre', name: 'Nombre', resizeable: false, sortable: true, minWidth: 200, draggable: false, flexGrow: 2 },
      { prop: 'fechaCreacion', name: 'Fecha de creación', resizeable: false, sortable: true, draggable: false, flexGrow: 1 },
      { prop: 'autor.nick', name: 'Autor', resizeable: false, draggable: false, sortable: true, flexGrow: 1 },
      { prop: 'leccion', name: 'Nº Lecciones', resizeable: false, draggable: false, sortable: true, flexGrow: 1 },
      { prop: 'proyectos.length', name: 'Nº Proyectos', resizeable: false, draggable: false, sortable: true, flexGrow: 1 }
    ];
  }

}
