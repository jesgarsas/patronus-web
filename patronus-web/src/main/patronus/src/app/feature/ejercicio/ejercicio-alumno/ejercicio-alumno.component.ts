import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { take } from 'rxjs/operators';
import { GenericDialogCancelComponent } from 'src/app/component/generic-dialog/generic-dialog-cancel/generic-dialog-cancel.component';
import { EjercicioDTO } from 'src/app/models/patron/ejercicio-dto';
import { OpcionDTO } from 'src/app/models/patron/opcion-dto';
import { PreguntaDTO } from 'src/app/models/patron/pregunta-dto';
import { RespuestaDto } from 'src/app/models/patron/respuesta-dto';
import { EjercicioService } from 'src/app/service/ejercicio.service';
import { LoginService } from 'src/app/service/login.service';
import { ResultadoService } from 'src/app/service/resultado.service';
import { ToastService } from 'src/app/service/toast.service';
import { AppContants } from 'src/app/utils/app-constants';

@Component({
  selector: 'app-ejercicio-alumno',
  templateUrl: './ejercicio-alumno.component.html',
  styleUrls: ['./ejercicio-alumno.component.scss']
})
export class EjercicioAlumnoComponent implements OnInit {

  public ejercicioId?: number;
  public ejercicio?: EjercicioDTO;
  private dialog?: NbDialogRef<GenericDialogCancelComponent>;

  constructor(private dialogService: NbDialogService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: LoginService,
    private ejercicioService: EjercicioService,
    private respuestaService: ResultadoService) { }

  ngOnInit(): void {
    this.onSetUp();
  }

  onSave(): void {
    let respuesta: RespuestaDto = new RespuestaDto();
    respuesta.locale = this.ejercicio?.locale;
    respuesta.idEjercicio = this.ejercicio?.id;
    respuesta.preguntas = this.ejercicio?.preguntas;

    // Enviar respuesta al core y volver al patron
    this.respuestaService.save(respuesta).pipe(take(1)).subscribe((res) => {
      if (res) {
        this.toastService.showConfirmation('Éxito', 'Respuesta enviada');
        this.router.navigate([AppContants.PATRON_DETALLES_PATH], { queryParams: { id: this.ejercicio!.patron?.id }});
      } else {
        this.toastService.showError('Error', 'Error en el envío');
      }
    }, (error) => {
      this.toastService.showError('Error', 'El servidor no esta disponible');
    });

  }

  onBack(): void {
    this.dialog = this.dialogService.open(GenericDialogCancelComponent, {
      context: {
        accept: () => {
          this.router.navigate([AppContants.PATRON_DETALLES_PATH], { queryParams: { id: this.ejercicio!.patron?.id } });
          this.dialog!.close();
        }
      }
    });
  }

  onClickOption(opcion: OpcionDTO) {
    opcion.correcta = !opcion.correcta;
  }

  private onSetUp(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: Params) => {
      this.ejercicioId = params.ejercicioId;
      if (!this.ejercicioId) {
        this.router.navigate([AppContants.BASE_PATH]);
      } else {
        this.getEjercicio();
      }
    });
  }

  private getEjercicio() {
    this.respuestaService.checkIntentos(this.ejercicioId!).pipe(take(1)).subscribe((res) => {
      if (!res) {
        this.toastService.showError('Acceso no disponible', 'Ya has realizado el máximo de intentos');
        this.router.navigate([AppContants.BASE_PATH]);
      }
    });
    this.ejercicioService.getAsAlumnoById(this.ejercicioId!).pipe(take(1)).subscribe((ejercicio: EjercicioDTO) => {
      if (ejercicio) {
        this.ejercicio = ejercicio;
      }
    }, (error: HttpErrorResponse) => {
      this.toastService.showError('Error', error.message);
    });
  }
}
