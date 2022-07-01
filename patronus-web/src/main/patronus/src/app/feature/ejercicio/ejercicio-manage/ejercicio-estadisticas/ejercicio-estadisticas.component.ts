import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { GenericAutocompleteComponent } from 'src/app/component/generic-autocomplete/generic-autocomplete.component';
import { EstEjercicioDTO } from 'src/app/models/estadisticas/est-ejercicio-dto';
import { EstSerie, EstSerieItem } from 'src/app/models/estadisticas/est-serie';
import { GrupoService } from 'src/app/service/grupo.service';
import { LoginService } from 'src/app/service/login.service';
import { ResultadoService } from 'src/app/service/resultado.service';
import { AppContants } from 'src/app/utils/app-constants';

@Component({
  selector: 'app-ejercicio-estadisticas',
  templateUrl: './ejercicio-estadisticas.component.html',
  styleUrls: ['./ejercicio-estadisticas.component.scss']
})
export class EjercicioEstadisticasComponent implements OnInit {

  public estadisticas?: EstEjercicioDTO = new EstEjercicioDTO();
  public estSerie?: EstSerie = new EstSerie();
  public estSeries?: EstSerie[] = [];
  public showGrupos: number[] = [];
  public userGroups: number[] = [];
  public loading: boolean = false;

  public form: FormGroup = new FormGroup({});

  public grupoFormName: string = 'grupo';

  private ejercicioId?: number;

  @ViewChild('gruposAuto') public grupoAutocomplete?: GenericAutocompleteComponent;

  constructor(private router: Router,
    private loginService: LoginService,
    private route: ActivatedRoute,
    public grupoService: GrupoService,
    private respuestaService: ResultadoService) { }

  ngOnInit(): void {
    this.loading = true;
    this.onSetUp();
  }

  onTagRemove(event: any): void {
    let id = event.text ? +event.text.split(' - ')[0] : -1;
    id = !isNaN(id) ? id : -1;

    if (this.showGruposSelec() && id !== -1) {
      let array: any[] = this.form.controls[this.grupoFormName].value;
      let index = -1;
      for (let key in array) {
        if (array[key].id === id) {
          index = +key;
          break;
        }
      }
      if (index !== -1) {
        let itemDeleted = array.splice(index, 1);
        this.form.controls[this.grupoFormName].setValue(array);
        this.grupoAutocomplete?.deleteItemFromList(itemDeleted[0] as never);
      }
    }
  }

  showGruposSelec() {
    return this.form.controls[this.grupoFormName] && this.form.controls[this.grupoFormName].value instanceof Array
      && this.form.controls[this.grupoFormName].value.length > 0;
  }

  clearTags() {
    this.form.controls[this.grupoFormName].setValue([]);
    this.grupoAutocomplete?.clearMultipleList();
  }

  private onSetUp(): void {
    this.setUpForm();
    this.route.queryParams.pipe(take(1)).subscribe((params: Params) => {
      this.ejercicioId = params.ejercicioId;
      if (!this.ejercicioId) {
        this.router.navigate([AppContants.BASE_PATH]);
      } else {
        this.loginService.getGrupos().pipe().subscribe(list => {
          this.showGrupos = list;
          this.userGroups = list;
          this.getEstadisticas();
        }, _ => { this.loading = false; }); 
      }
    });
  }

  private setUpForm() {
    this.form = new FormGroup({});
    this.form.addControl(this.grupoFormName, new FormControl(undefined));

    // Iniciar listener para los filtros
    this.form.valueChanges.subscribe(data => {
      if (data) {
        if (data[this.grupoFormName]) {
          this.showGrupos = [];
          (data[this.grupoFormName] as any[]).map(g => this.showGrupos.push(g.id));
          this.getEstadisticas();
        }
      }
    })
  }

  private getEstadisticas() {
    // Add code here
    if (this.showGrupos) {
      this.loading = true;
      this.respuestaService.getEstadisticas(this.ejercicioId!, this.showGrupos!).pipe(take(1)).subscribe((dto) => {
        this.estadisticas = dto;
        this.transformSerie();
        this.loading = false;
      }, _ => { this.loading = false; });
    } else {
      this.estadisticas!.grupos = [];
      this.loading = false;
    }
  }

  private transformSerie() {
    this.estSerie = new EstSerie();
    this.estSeries = [];

    if (this.showGrupos) {
      if (this.showGrupos.length === 1 &&  this.estadisticas?.grupos!.length === 1) {
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
