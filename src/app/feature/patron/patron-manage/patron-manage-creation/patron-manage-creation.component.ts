import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TableColumn } from '@swimlane/ngx-datatable';
import { ConfigAction } from 'src/app/component/generic-table/model/config-action';
import { ProyectoDTO } from 'src/app/models/patron/proyecto-dto';
import { AppContants } from 'src/app/utils/app-constants';

@Component({
  selector: 'app-patron-manage-creation',
  templateUrl: './patron-manage-creation.component.html',
  styleUrls: ['./patron-manage-creation.component.scss']
})
export class PatronManageCreationComponent implements OnInit {

  form!: FormGroup;
  headerTitle: string = 'Crear patrón nuevo';
  columns: TableColumn[] = [];
  rows: ProyectoDTO[] = [];
  configActions!: ConfigAction;

  titleFormName: string = 'title';
  contenidoFormName: string = 'contenido';
  descripcionFormName: string = 'descripcion';
  proyectosFormName: string = 'proyectos';

  private nextPos: number = 0;

  editorConfig: AngularEditorConfig = AppContants.editorConfig;

  constructor() { }

  ngOnInit(): void {
    this.buildForm();
    this.buildColumns();
  }

  onDelete(event: ProyectoDTO) {
    console.log(event);
    let index: number = -1;
    this.rows.map((value, i) => { if (ProyectoDTO.equals(value, event)) { index = i; } });
    if (index >= 0) { this.rows.splice(index, 1) };
    this.rows = [... this.rows];
  }


  private transformData() {
    this.rows.map(row => {
      row.pos = this.nextPos++;
    })
  }

  private buildForm() {
    this.form = new FormGroup({});
    this.form.addControl(this.titleFormName, new FormControl());
    this.form.addControl(this.descripcionFormName, new FormControl());
    this.form.addControl(this.contenidoFormName, new FormControl());
    this.form.addControl(this.proyectosFormName, new FormControl());
  }

  private buildColumns() {
    this.configActions = new ConfigAction({ delete: true });
    this.columns = [
      { prop: 'name', name: 'Nombre', resizeable: false, sortable: true, minWidth: 200, draggable: false, flexGrow: 2 },
      { prop: 'type', name: 'Tipo', resizeable: false, sortable: true, draggable: false, flexGrow: 1 },
      { prop: 'size', name: 'Tamaño', resizeable: false, sortable: true, draggable: false, flexGrow: 1 },
    ];
  }
}
