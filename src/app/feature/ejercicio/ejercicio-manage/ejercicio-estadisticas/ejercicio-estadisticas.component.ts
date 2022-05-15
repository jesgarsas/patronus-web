import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { take } from 'rxjs/operators';
import { EjercicioService } from 'src/app/service/ejercicio.service';
import { LoginService } from 'src/app/service/login.service';
import { ResultadoService } from 'src/app/service/resultado.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-ejercicio-estadisticas',
  templateUrl: './ejercicio-estadisticas.component.html',
  styleUrls: ['./ejercicio-estadisticas.component.scss']
})
export class EjercicioEstadisticasComponent implements OnInit {

  private ejercicioId?: number;

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

  private onSetUp(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: Params) => {
      this.ejercicioId = params.ejercicioId;
      if (!this.ejercicioId) {
        this.router.navigate(['/']);
      } else {
        this.getEstadisticas();
      }
    });
  }

  private getEstadisticas() {
    // Add code here
    this.respuestaService.getEstadisticas(this.ejercicioId!, [1,2,3]).pipe(take(1)).subscribe((dto) => {
      console.log(dto);
    });
  }
}
