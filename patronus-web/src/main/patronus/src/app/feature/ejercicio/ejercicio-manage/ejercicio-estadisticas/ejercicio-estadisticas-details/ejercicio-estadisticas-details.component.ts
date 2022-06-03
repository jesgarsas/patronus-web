import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { SortDirection, TableColumn } from '@swimlane/ngx-datatable';
import * as moment from 'moment';
import { Moment } from 'moment';
import { EstEjercicioDTO } from 'src/app/models/estadisticas/est-ejercicio-dto';
import { EstGrupoDTO } from 'src/app/models/estadisticas/est-grupo-dto';

@Component({
  selector: 'app-ejercicio-estadisticas-details',
  templateUrl: './ejercicio-estadisticas-details.component.html',
  styleUrls: ['./ejercicio-estadisticas-details.component.scss']
})
export class EjercicioEstadisticasDetailsComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() public detalles?: EstEjercicioDTO;
  @Input() public grupo?: EstGrupoDTO;

  @ViewChild('column') public headerColTemplate?: TemplateRef<any>;

  public columns?: any[] = [];
  public sorts: any[] = [];
  public rows?: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.buildColumns();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.detalles && changes.detalles.currentValue) {
      this.buildColumns();
      this.buildRows();
    }
  }

  public buildColumns() {
    this.columns = [
      { prop: 'nombre', name: 'Nombre', resizeable: false, sortable: true, minWidth: 200, draggable: false, flexGrow: 2 },
      { prop: 'notaS', name: 'Nota', resizeable: false, draggable: false, sortable: true, flexGrow: 1 },
      { prop: 'fechaS', name: 'Fecha', resizeable: false, draggable: false, sortable: true, flexGrow: 1 },
    ];
    for (let index = 0; index < this.detalles?.numeroPreguntas!; index++) {
      this.columns.push({ prop: 'ejercicio' + (index + 1), name: 'Ejercicio ' + (index + 1), resizeable: false, draggable: false, sortable: true, flexGrow: 1, headerTemplate: this.headerColTemplate })
    }
    this.sorts[0] = { prop: 'nombre', dir: SortDirection.asc};
  }

  public buildRows() {
    this.rows = [];
    for (let alumno of this.grupo!.alumnos!) {
      (alumno as any).notaS = this.formatNumber(alumno.nota!);
      (alumno as any).fechaS = this.formatDate(alumno.fecha!);
      for (let index = 0; index < this.detalles?.numeroPreguntas!; index++) {
        (alumno as any)['ejercicio' + (index + 1)] = alumno.ejercicios![index] !== undefined ? this.formatCorrecta(alumno.ejercicios![index].correcta!) : '-';
      }
      this.rows.push(alumno);
    }
  }

  public isEjercicioColumn(col: TableColumn) {
    return col && col.prop && (col.prop as String).includes('ejercicio');
  }

  public isEjercicioContestado(col: TableColumn, row: any): boolean {
    if (col && col.prop) {
      return row[col.prop] !== undefined && row[col.prop] !== '-';
    }
    return false;
  }
  public isEjercicioCorrect(col: TableColumn, row: any): string {
    if (col && col.prop) {
      if (row[col.prop] === 'true') {
        return 'checkmark-outline';
      } else if (row[col.prop] === 'false') {
        return 'close-outline';
      } else {
        return 'minus-outline';
      }
    }
    return 'minus-outline';
  }

  public isEjercicioColor(col: TableColumn, row: any): string {
    if (col && col.prop) {
      if (row[col.prop] === 'true') {
        return 'success';
      } else if (row[col.prop] === 'false') {
        return 'danger';
      } else {
        return 'basic';
      }
    }
    return 'primary';
  }

  public getPreguntaText(name: string): any {
    let index = name.indexOf(' ');
    let subs: string = name.substring(index + 1);
    if (!isNaN(+subs)) {
      return this.detalles!.preguntas![+subs - 1];
    }
    return undefined;
  }

  private formatNumber(num: number): string {
    return num || num === 0 ? (Math.round((num + Number.EPSILON) * 100) / 100).toString() : '-';
  }

  private formatDate(date: Moment): string {
    return date ? moment(date).format('DD/MM/yyy HH:mm') : '-';
  }

  private formatCorrecta(value: boolean) {
    if (value) {
      return 'true'
    } else {
      return 'false'
    }
  }
}
