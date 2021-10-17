import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { TableColumn } from '@swimlane/ngx-datatable';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { GenericDialogCancelComponent } from 'src/app/component/generic-dialog/generic-dialog-cancel/generic-dialog-cancel.component';
import { GenericDialogDeleteComponent } from 'src/app/component/generic-dialog/generic-dialog-delete/generic-dialog-delete.component';
import { ConfigAction } from 'src/app/component/generic-table/model/config-action';
import { LocaleDTO } from 'src/app/models/locale/locale-dto';
import { AutorDTO } from 'src/app/models/patron/autor-dto';
import { PatronDTO } from 'src/app/models/patron/patron-dto';
import { ProyectoDTO } from 'src/app/models/patron/proyecto-dto';
import { PatronService } from 'src/app/service/patron.service';
import { ToastService } from 'src/app/service/toast.service';
import { AppContants } from 'src/app/utils/app-constants';

@Component({
  selector: 'app-patron-manage-creation',
  templateUrl: './patron-manage-creation.component.html',
  styleUrls: ['./patron-manage-creation.component.scss']
})
export class PatronManageCreationComponent implements OnInit {

  form!: FormGroup;
  patron: PatronDTO = new PatronDTO();
  headerTitle: string = 'Crear patrón nuevo';
  columns: TableColumn[] = [];
  rows: ProyectoDTO[] = [];
  files: File[] = [];
  posFile: number = 0;
  configActions!: ConfigAction;

  titleFormName: string = 'title';
  contenidoFormName: string = 'contenido';
  descripcionFormName: string = 'descripcion';
  proyectosFormName: string = 'proyectos';

  editorConfig: AngularEditorConfig = AppContants.editorConfig;
  fileConfig: string = AppContants.validFormatFile;

  private nextPos: number = 0;
  private dialog?: NbDialogRef<GenericDialogCancelComponent>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private patronService: PatronService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.buildForm();
    this.buildColumns();

    // Recoger los datos del grupo que nos pasan
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      if (params.id) {
        this.getPatron(params.id);
      }
    });
  }

  onDelete(event: ProyectoDTO) {
    let index: number = -1;
    this.rows.map((value, i) => { if (ProyectoDTO.equals(value, event)) { index = i; } });
    if (index >= 0) { this.rows.splice(index, 1); this.files.splice(index, 1); };
    this.rows = [... this.rows];
  }

  onSave() {
    this.setValuesDTO();
    this.savePatron();
  }

  onBack() {
    this.dialog = this.dialogService.open(GenericDialogCancelComponent, {
      context: {
        accept: () => {
          this.router.navigate(['/patron/administracion']);
          this.dialog!.close();
        }
      }
    });
  }

  handleFileInput(target: any) {
    if (target.files) {
      for (let i = 0; i < target.files.length; i++) {
        this.files.push(target.files.item(i));
        this.transformFile(target.files.item(i));
      }
      this.rows = [...this.rows];
    }
  }

  private getPatron(id: any) {
    this.patronService.getByIdAndLocale(id, 1).pipe(take(1)).subscribe(data => {
      if (data) {
        this.patron = data;
        this.setValuesForm();
      } else {
        this.toastService.showError('Error', 'No se ha podido cargar el patrón');
      }
    }, error => {
      this.toastService.showError('Error', 'No se ha podido conectar con el servidor');
    })
  }

  private setValuesForm() {
    this.form.controls[this.titleFormName].setValue(this.patron.nombre);
    this.form.controls[this.descripcionFormName].setValue(this.patron.descripciones ? this.patron.descripciones[0].descripcion : undefined);
    this.form.controls[this.contenidoFormName].setValue(this.patron.lecciones ? this.patron.lecciones[0].contenido : undefined);

    if (this.patron.proyectos) {
      this.patron.proyectos.map(proyecto => { this.rows.push(proyecto); });
      this.rows = [...this.rows];
    }
  }

  private transformFile(file: File) {
    let proy = new ProyectoDTO();
    proy.pos = this.posFile;
    proy.name = file.name;
    proy.size = file.size;
    proy.type = file.type;
    this.rows.push(proy);
  }

  private setValuesDTO() {
    // Cambiar por autor cuando este el modulo
    if (!this.patron.id) {
      this.patron.autor = new AutorDTO(3, 'pepe');
      this.patron.fechaCreacion = moment();
      this.patron.lecciones = [{ locale: LocaleDTO.spanish, contenido: this.form.value[this.contenidoFormName] }];
      this.patron.descripciones = [{ locale: LocaleDTO.spanish, descripcion: this.form.value[this.descripcionFormName] }];
    } else {
      this.patron.lecciones![0].contenido = this.form.value[this.contenidoFormName];
      this.patron.descripciones![0].descripcion = this.form.value[this.descripcionFormName];
    }
    this.patron.nombre = this.form.value[this.titleFormName];
  }

  private savePatron() {
    let formData: FormData = new FormData();
    formData.append('patron', new Blob([JSON.stringify(this.patron)], { type: 'application/json' }));
    for (let file of this.files) {
      formData.append(`files`, file);
    }

    this.patronService.save(this.patron, formData).pipe(take(1)).subscribe((data) => {
      if (data) {
        this.router.navigate(['/patron/administracion']);
        this.toastService.showConfirmation('Éxito', 'Se ha guardado con éxito');
      } else {
        this.toastService.showError('Error', 'No se ha podido guardar el patrón');
      }
    }, (error) => {
      if (error) {
        this.toastService.showError('Error', 'No se ha podido guardar el patrón');
      }
    });
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
      { prop: 'name', name: 'Nombre', resizeable: false, sortable: false, minWidth: 200, draggable: false, flexGrow: 2 },
      { prop: 'type', name: 'Tipo', resizeable: false, sortable: false, draggable: false, flexGrow: 1 },
      { prop: 'size', name: 'Tamaño', resizeable: false, sortable: false, draggable: false, flexGrow: 1 },
    ];
  }
}
