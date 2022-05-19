import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { take } from 'rxjs/operators';
import { EstEjercicioDTO } from 'src/app/models/estadisticas/est-ejercicio-dto';
import { EstGrupoDTO } from 'src/app/models/estadisticas/est-grupo-dto';
import { EstSerie, EstSerieItem } from 'src/app/models/estadisticas/est-serie';
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

  public estadisticas?: EstEjercicioDTO;
  public estSerie?: EstSerie = new EstSerie();
  public estSeries?: EstSerie[] = [];
  public showGrupos: number[] = [3,2,1];

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
    this.respuestaService.getEstadisticas(this.ejercicioId!, this.showGrupos!).pipe(take(1)).subscribe((dto) => {
      this.estadisticas = dto;
      this.transformSerie();
    });
  }

  private transformSerie() {
    this.estSerie = new EstSerie();
    this.estSeries = [];
    
    if (this.showGrupos) {
      if (this.showGrupos.length === 1) {
        this.estSerie.serie?.push(new EstSerieItem('Aprobados', this.estadisticas?.grupos![0].aprobados));
        this.estSerie.serie?.push(new EstSerieItem('Suspendidos', this.estadisticas?.grupos![0].suspendidos));
        this.estSerie.serie?.push(new EstSerieItem('No realizado', this.estadisticas?.grupos![0].noResueltos));
      } else {
        this.showGrupos.forEach(group => {
          for (let est of this.estadisticas!.grupos!) {
            if (est.id === group) {
              let serie = new EstSerie();
              serie.serie?.push(new EstSerieItem('Aprobados', est.aprobados));
              serie.serie?.push(new EstSerieItem('Suspendidos', est.suspendidos));
              serie.serie?.push(new EstSerieItem('No realizado', est.noResueltos));
              if (est.total !== 0) {
                this.estSeries?.push(serie);
              }
            }
          }
        });
      }
    }
  }
}
