import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { SelectionType, TableColumn } from '@swimlane/ngx-datatable';
import { ConfigAction } from './model/config-action';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit, AfterViewInit {

  @Input() public rows: any[] = [];
  @Input() public columns: TableColumn[] = [];
  @Input() public actionsColumn: boolean = false;
  @Input() public paginator: boolean = false;
  @Input() public size: number | undefined = 10;
  @Input() public configActions: ConfigAction = new ConfigAction({});
  @Input() public loading: boolean = false;

  @Output() public onEdit: EventEmitter<any> = new EventEmitter();
  @Output() public onDelete: EventEmitter<any> = new EventEmitter();

  @ViewChild('acciones')
  public accionesTemplate!: TemplateRef<any>;

  public columnsTable: any[] = [];
  public heigthFooter: number = 0;

  constructor() { }

  ngOnInit(): void {
    if (this.paginator) {
      this.size = 10;
      this.heigthFooter = 50;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.actionsColumn) {
        this.setColumnActions();
      }
      this.setColumnsToTable();
    });
  }

  public onEditClick(value: any) {
    this.onEdit.emit(value);
  }

  public onDeleteClick(value: any) {
    this.onDelete.emit(value);
  }

  private setColumnsToTable() {
    this.columnsTable = this.columns;
  }

  private setColumnActions() {
    this.columns.push({ name: 'Acciones', sortable: false, cellTemplate: this.accionesTemplate, flexGrow: 1, headerClass: 'header-blue' });
  }

}
