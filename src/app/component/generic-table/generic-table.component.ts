import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { SelectionType, TableColumn } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit, AfterViewInit {

  @Input() public rows: any[] = [];
  @Input() public columns: TableColumn[] = [];
  @Input() public actionsColumn: boolean = false;

  @Output() public onEdit: EventEmitter<any> = new EventEmitter();
  @Output() public onDelete: EventEmitter<any> = new EventEmitter();

  @ViewChild('acciones')
  public accionesTemplate!: TemplateRef<any>;

  public columnsTable: any[] = [];

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setColumnActions();
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
