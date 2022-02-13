import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, destroyPlatform, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import * as moment from 'moment';
import { GenericDialogCancelComponent } from 'src/app/component/generic-dialog/generic-dialog-cancel/generic-dialog-cancel.component';
import { GenericDialogDeleteComponent } from 'src/app/component/generic-dialog/generic-dialog-delete/generic-dialog-delete.component';
import { UserDialogCreateComponent } from 'src/app/feature/usuario/user-dialog/user-dialog-create/user-dialog-create.component';
import { UserDialogImportComponent } from 'src/app/feature/usuario/user-dialog/user-dialog-import/user-dialog-import.component';
import { LocaleDTO } from 'src/app/models/locale/locale-dto';
import { EjercicioDTO } from 'src/app/models/patron/ejercicio-dto';
import { OpcionDTO } from 'src/app/models/patron/opcion-dto';
import { PatronDTO } from 'src/app/models/patron/patron-dto';
import { PreguntaDTO } from 'src/app/models/patron/pregunta-dto';
import { LoginService } from 'src/app/service/login.service';
import { ToastService } from 'src/app/service/toast.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AppContants } from 'src/app/utils/app-constants';

@Component({
  selector: 'app-ejercicio-manage-creation',
  templateUrl: './ejercicio-manage-creation.component.html',
  styleUrls: ['./ejercicio-manage-creation.component.scss']
})
export class EjercicioManageCreationComponent implements OnInit {

  @Input() patronId: number = 0;

  form!: FormGroup;

  readonly nombreFormName: string = 'nombre';
  readonly patronFormName: string = 'patron';
  readonly intentosFormName: string = 'intentos';
  readonly preguntasFormName: string = 'preguntas';
  readonly opcionesFormName: string = 'opciones';
  readonly textoFormName: string = 'texto';
  readonly tipoFormName: string = 'tipo';
  readonly correcta: string = 'correcta';

  private dialog?: NbDialogRef<GenericDialogCancelComponent> | NbDialogRef<UserDialogCreateComponent> | NbDialogRef<GenericDialogDeleteComponent>
    | NbDialogRef<UserDialogImportComponent>;
  private autorId: number | undefined;

  constructor(private dialogService: NbDialogService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: LoginService) {
    this.autorId = this.userService.getUser()?.id;

  }

  ngOnInit(): void {
    this.form = new FormGroup({});
    this.form.addControl(this.preguntasFormName, new FormArray([]));
  }

  addPregunta() {
    if (this.form && this.form.value[this.preguntasFormName]) {
      let preguntaForm = new FormGroup({});
      preguntaForm.addControl(this.textoFormName, new FormControl(undefined));
      preguntaForm.addControl(this.opcionesFormName, new FormArray([
        this.createOptionForm(),
        this.createOptionForm(),
      ]));
      (this.form.controls[this.preguntasFormName] as FormArray).value.push(preguntaForm);
    }
  }

  addOptionForm(form: FormArray) {
    form.push(this.createOptionForm());
  }

  onSave() {
    let dto: EjercicioDTO = this.transformDTO();
    console.log(dto);
  }

  onBack() {
    this.dialog = this.dialogService.open(GenericDialogCancelComponent, {
      context: {
        accept: () => {
          this.router.navigate([AppContants.PATRON_DETALLES_PATH], { queryParams: { id: this.patronId }, queryParamsHandling: 'merge' });
          this.dialog!.close();
        }
      }
    });
  }

  deletePregunta(index: number) {
    if (this.form && this.form.value[this.preguntasFormName] && this.form.value[this.preguntasFormName].length > index) {
      (this.form.controls[this.preguntasFormName] as FormArray).value.splice(index, 1);

    }
  }

  deleteOpcion(pregunta: FormGroup, index: number) {
    if (pregunta && pregunta.controls[this.opcionesFormName] && pregunta.controls[this.opcionesFormName].value.length > index) {
      (pregunta.controls[this.opcionesFormName] as FormArray).removeAt(index);
    }
  }

  private createOptionForm() {
    let form = new FormGroup({});
    form.addControl(this.textoFormName, new FormControl(undefined));
    form.addControl(this.correcta, new FormControl(undefined));
    return form;
  }

  private transformDTO(): EjercicioDTO {
    let dto = new EjercicioDTO();

    if (this.form && this.form.controls) {
      dto.patron = new PatronDTO();
      dto.patron!.id = this.patronId;
      dto.intentos = this.form.value[this.intentosFormName];
      dto.nombre = this.form.value[this.nombreFormName];
      dto.locale = LocaleDTO.spanish;
      dto.idAutor = this.autorId;
      dto.fechaCreacion = moment();
      dto.preguntas = [];

      // Transform preguntas
      this.transformPreguntas(dto);

    }

    return dto;
  }

  private transformPreguntas(dto: EjercicioDTO) {
    if (this.form.value[this.preguntasFormName]) {
      this.form.value[this.preguntasFormName].forEach((pregunta: FormGroup) => {
        let preguntaDTO: PreguntaDTO = new PreguntaDTO();
        preguntaDTO.texto = pregunta.value[this.textoFormName];
        preguntaDTO.tipo = pregunta.value[this.tipoFormName];
        preguntaDTO.opciones = [];

        // Transform opciones
        this.transformOpciones(pregunta, preguntaDTO);

        dto.preguntas?.push(preguntaDTO);
      });

    }
  }

  private transformOpciones(pregunta: FormGroup, preguntaDTO: PreguntaDTO) {
    if (pregunta.controls[this.opcionesFormName]) {
      (pregunta.controls[this.opcionesFormName] as FormArray).controls.forEach((opcion) => {
        let opcionDTO: OpcionDTO = new OpcionDTO();
        opcionDTO.texto = opcion.value[this.textoFormName];
        opcionDTO.correcta = opcion.value[this.correcta] ? opcion.value[this.correcta] : false;

        preguntaDTO.opciones?.push(opcionDTO);
      });
    }
  }
}
