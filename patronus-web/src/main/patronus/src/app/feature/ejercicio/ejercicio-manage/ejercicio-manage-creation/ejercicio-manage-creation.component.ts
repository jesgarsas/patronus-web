import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, destroyPlatform, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { GenericDialogCancelComponent } from 'src/app/component/generic-dialog/generic-dialog-cancel/generic-dialog-cancel.component';
import { GenericDialogDeleteComponent } from 'src/app/component/generic-dialog/generic-dialog-delete/generic-dialog-delete.component';
import { UserDialogCreateComponent } from 'src/app/feature/usuario/user-dialog/user-dialog-create/user-dialog-create.component';
import { UserDialogImportComponent } from 'src/app/feature/usuario/user-dialog/user-dialog-import/user-dialog-import.component';
import { LocaleDTO } from 'src/app/models/locale/locale-dto';
import { EjercicioDTO } from 'src/app/models/patron/ejercicio-dto';
import { OpcionDTO } from 'src/app/models/patron/opcion-dto';
import { PatronDTO } from 'src/app/models/patron/patron-dto';
import { PreguntaDTO } from 'src/app/models/patron/pregunta-dto';
import { EjercicioService } from 'src/app/service/ejercicio.service';
import { LoginService } from 'src/app/service/login.service';
import { PatronService } from 'src/app/service/patron.service';
import { ToastService } from 'src/app/service/toast.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AppContants } from 'src/app/utils/app-constants';
import { AppUtilities } from 'src/app/utils/app-uitilites';
import { EjercicioManageCreationValidators } from './ejercicio-manage-creation.validators';

@Component({
  selector: 'app-ejercicio-manage-creation',
  templateUrl: './ejercicio-manage-creation.component.html',
  styleUrls: ['./ejercicio-manage-creation.component.scss']
})
export class EjercicioManageCreationComponent implements OnInit {

  readonly nombreFormName: string = 'nombre';
  readonly patronFormName: string = 'patron';
  readonly intentosFormName: string = 'intentos';
  readonly preguntasFormName: string = 'preguntas';
  readonly opcionesFormName: string = 'opciones';
  readonly textoFormName: string = 'cuerpo de pregunta';
  readonly texto2FormName: string = 'cuerpo de opción';
  readonly tipoFormName: string = 'tipo';
  readonly correcta: string = 'correcta';
  readonly idFormName: string = 'id';

  readonly editHeader: string = 'Editar ejercicio'
  readonly crearHeader: string = 'Crear nuevo ejercicio'
  
  @Input() patronId: number = 0;
  ejercioId: number | undefined = undefined;

  form!: FormGroup;
  headerTitle: string = this.crearHeader;

  private dialog?: NbDialogRef<GenericDialogCancelComponent> | NbDialogRef<UserDialogCreateComponent> | NbDialogRef<GenericDialogDeleteComponent>
    | NbDialogRef<UserDialogImportComponent>;
  private autorId: number | undefined;

  constructor(private dialogService: NbDialogService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: LoginService,
    private patronService: PatronService,
    private ejercicioService: EjercicioService) {
    this.autorId = this.userService.getUser()?.id;

  }

  ngOnInit(): void {
    this.form = new FormGroup({});
    this.form.addControl(this.preguntasFormName, new FormArray([], [EjercicioManageCreationValidators.minUnaPreguntaValidator()]));
    this.route.queryParams.pipe(take(1)).subscribe((params: Params) => {
      this.patronId = params.idPatron;
      if (!this.patronId) {
        this.router.navigate([AppContants.BASE_PATH]);
      }
      this.getPatronTitulo();
      this.ejercioId = params.idEjercicio;
      if (this.ejercioId) {
        this.headerTitle = this.editHeader;
        this.trasnformEjercicioToForm(this.ejercioId!);
      }
      
    })
  }

  addPregunta() {
    if (this.form && this.form.value[this.preguntasFormName]) {
      let preguntaForm = new FormGroup({});
      preguntaForm.addControl(this.textoFormName, new FormControl(undefined, Validators.required));
      preguntaForm.addControl(this.idFormName, new FormControl(undefined));
      preguntaForm.addControl(this.opcionesFormName, new FormArray([], [EjercicioManageCreationValidators.minDosOpcionesValidator(), 
        EjercicioManageCreationValidators.minUnaOpcionCorrectaValidator()]));
      (preguntaForm.controls[this.opcionesFormName] as FormArray).push(this.createOptionForm());
      (preguntaForm.controls[this.opcionesFormName] as FormArray).push(this.createOptionForm());
      (this.form.controls[this.preguntasFormName] as FormArray).push(preguntaForm);
    }
  }

  addOptionForm(form: FormArray) {
    form.push(this.createOptionForm());
  }

  onSave() {
    if (this.form.valid) {
      let dto: EjercicioDTO = this.transformDTO();
      this.ejercicioService.save(dto).pipe(take(1)).subscribe((patronId) => {
        if (patronId) {
          this.toastService.showConfirmation('Guardado', 'Ejercicio guardado');
          this.router.navigate([AppContants.PATRON_DETALLES_PATH], {queryParams: { id: this.patronId }});
        }
      }, (error) => {
        this.toastService.showError('Error', 'Error en el guardado');
      });
    } else {
      let errors: string[] = AppUtilities.getErrorsFromForm(this.form);
      errors.forEach(error => {
        this.toastService.showError('Error', error);
      });
    }
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
      (this.form.controls[this.preguntasFormName] as FormArray).removeAt(index);
    }
  }

  deleteOpcion(pregunta: FormGroup, index: number) {
    if (pregunta && pregunta.controls[this.opcionesFormName] && pregunta.controls[this.opcionesFormName].value.length > index) {
      (pregunta.controls[this.opcionesFormName] as FormArray).removeAt(index);
    }
  }

  getPreguntasForm(): any[] {
    return (this.form.controls[this.preguntasFormName] as FormArray).controls;
  }

  anyPreguntas(): boolean {
    return this.form.controls[this.preguntasFormName] && (this.form.controls[this.preguntasFormName] as FormArray).controls.length > 0;
  }

  private trasnformEjercicioToForm(ejercicioId: number) {
    this.ejercicioService.getById(ejercicioId).pipe(take(1)).subscribe((ejercicio) => {
      if (ejercicio) {
        this.form.controls[this.nombreFormName].setValue(ejercicio.nombre);
        this.form.controls[this.intentosFormName].setValue(ejercicio.intentos);
        this.transformPreguntasToForm(ejercicio);
        
        if (!this.patronId) {
          this.toastService.showError("Error", "El ejercicio no esxite");
          this.router.navigate([AppContants.BASE_PATH]);
        }
      }
    }, (error) => {
      this.toastService.showError("Error", "Error en cargar el ejercicio");
    });
  }

  private transformPreguntasToForm(ejercicio: EjercicioDTO) {
    if (ejercicio.preguntas) {
      let preguntas = ejercicio.preguntas;
      for (let index in preguntas) {
        this.addPregunta();
        let formP: FormGroup = ((this.form.controls[this.preguntasFormName] as FormArray).controls[index] as FormGroup);
        formP.controls[this.textoFormName].setValue(preguntas[index].pregunta);
        formP.controls[this.idFormName].setValue(preguntas[index].id);
        this.transformOpcionToForm(preguntas[index].opciones!, formP);
      }
    }
  }

  private transformOpcionToForm(opciones: OpcionDTO[], form: FormGroup) {
    if (opciones) {
      let formOs: FormArray = form.controls[this.opcionesFormName] as FormArray;
      for (let index in opciones) {
        if (formOs.controls.length === +index) {
          this.addOptionForm(formOs);
        }
        let formO: FormGroup = formOs.controls[index] as FormGroup;
        let opcion: OpcionDTO = opciones[index];
        formO.controls[this.texto2FormName].setValue(opcion.texto);
        formO.controls[this.correcta].setValue(opcion.correcta);
        formO.controls[this.idFormName].setValue(opcion.id);
      }
    }
  }

  private createOptionForm(): FormGroup {
    let form = new FormGroup({});
    form.addControl(this.texto2FormName, new FormControl(undefined, Validators.required));
    form.addControl(this.correcta, new FormControl(undefined));
    form.addControl(this.idFormName, new FormControl(undefined));
    return form;
  }

  private transformDTO(): EjercicioDTO {
    let dto = new EjercicioDTO();
    if (this.ejercioId) {
      dto.id = this.ejercioId;
    }
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
      (this.form.controls[this.preguntasFormName] as FormArray).controls.forEach((pregunta: any) => {
        let preguntaDTO: PreguntaDTO = new PreguntaDTO();
        preguntaDTO.pregunta = pregunta.controls[this.textoFormName].value;
        preguntaDTO.id = pregunta.controls[this.idFormName].value;
        // preguntaDTO.tipo = pregunta.controls[this.tipoFormName].value;
        preguntaDTO.opciones = [];

        // Transform opciones
        this.transformOpciones(pregunta, preguntaDTO);

        dto.preguntas?.push(preguntaDTO);
      });

    }
  }

  private transformOpciones(pregunta: FormGroup, preguntaDTO: PreguntaDTO) {
    if (pregunta.controls[this.opcionesFormName]) {
      
      (pregunta.controls[this.opcionesFormName] as FormArray).controls.forEach((opcion, index) => {
        let opcionDTO: OpcionDTO = new OpcionDTO();
        opcionDTO.texto = opcion.value[this.texto2FormName];
        opcionDTO.correcta = opcion.value[this.correcta] ? opcion.value[this.correcta] : false;
        opcionDTO.opcion = index;
        opcionDTO.id = opcion.value[this.idFormName];
        preguntaDTO.opciones?.push(opcionDTO);
      });
    }
  }

  private getPatronTitulo() {
    this.patronService.getByIdAndLocale(this.patronId, LocaleDTO.spanish.id!).pipe(take(1)).subscribe((patron: PatronDTO) => {
      if (patron && patron.id) {
        this.form.controls[this.patronFormName].setValue(patron.nombre);
      } else {
        this.router.navigate([AppContants.BASE_PATH]);
      }
    });
  }
}
