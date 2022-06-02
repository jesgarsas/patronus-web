import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectionType, TableColumn } from '@swimlane/ngx-datatable';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { HomeEstadisticasDto } from 'src/app/models/home/home-estadisticas-dto';
import { LastEjercicioDto } from 'src/app/models/home/last-ejercicio-dto';
import { LastPatronVisitadoDto } from 'src/app/models/home/last-patron-visitado-dto';
import { Usuario } from 'src/app/models/usuario/usuario';
import { LoginService } from 'src/app/service/login.service';
import { ResultadoService } from 'src/app/service/resultado.service';
import { VisitadoService } from 'src/app/service/visitado.service';
import { AppContants } from 'src/app/utils/app-constants';
import { AppUtilities } from 'src/app/utils/app-uitilites';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.component.html',
  styleUrls: ['./home-alumno.component.scss']
})
export class HomeAlumnoComponent implements OnInit {

  usuario?: Usuario;

  loadingPatrones: boolean = true;
  columnsPatrones: TableColumn[] = [];
  rowsPatrones: LastPatronVisitadoDto[] = [];
  selectionTypePatrones: SelectionType = SelectionType.single;

  loadingEjer: boolean = true;
  columnsEjer: TableColumn[] = [];
  rowsEjer: LastEjercicioDto[] = [];
  selectionTypeEjer: SelectionType = SelectionType.single;

  estadisticas: HomeEstadisticasDto = new HomeEstadisticasDto();

  constructor(private visitadoService: VisitadoService,
    private loginService: LoginService,
    private router: Router,
    private respuestaService: ResultadoService) { }

  ngOnInit(): void {
    this.usuario = this.loginService.getUser();
    this.setUpTablePatrones();
    this.setUpTableEjer();
    this.setUpChart();
  }

  setUpChart() {
    this.getEstadisticas();
  }

  setUpTablePatrones() {
    this.buildColumnsPatrones();
    this.getPatronesVisitados();
  }

  setUpTableEjer() {
    this.buildColumnsEjer();
    this.getPatronesEjer();
  }

  onSelectPatron(value: any) {
    if (value && value.selected && value.selected[0]) {
      this.router.navigate([AppContants.PATRON_DETALLES_PATH.substring(1)], { queryParams: { id: value.selected[0].idPatron}, });
    }
  }

  private getEstadisticas() {
    this.respuestaService.getEstadisticasHome().pipe(take(1)).subscribe((data) => {
      data.serie = [
        {
          name: 'Realizados',
          value: data.realizados
        },
        {
          name: 'No realizados',
          value: data.noRealizados
        }
      ]
      this.estadisticas = data;
    });
  }

  private getPatronesVisitados() {
    if (this.usuario) {
      this.visitadoService.get(this.usuario!.id!).pipe(take(1)).subscribe((data) => {
        this.transformItems(data);
        this.rowsPatrones = data;
        this.loadingPatrones = false;
      }, _ => this.loadingPatrones = false);
    } else {
      this.loadingPatrones = false;
    }
  }

  private getPatronesEjer() {
    if (this.usuario) {
      this.respuestaService.getLastEjercicio().pipe(take(1)).subscribe((data) => {
        this.rowsEjer = [data];
        this.transformDataEjer();
        this.loadingEjer = false;
      }, _ => this.loadingEjer = false);
    } else {
      this.loadingEjer = false;
    }
  }

  private transformItems(data: LastPatronVisitadoDto[]) {
    if (data) {
      data.map(patron => {
        let date = moment(patron.fecha);
        patron.fecha = patron.fecha && moment.isMoment(date) ? date.format('DD/MM/YYYY HH:mm') : '-';
        patron.name =  patron.name ? patron.name.substr(0,1).toUpperCase() + patron.name.substring(1) : 'Sin título'; 
      });
    }
  }

  private buildColumnsPatrones() {
    this.columnsPatrones = [
      { prop: 'name', name: 'Nombre', resizeable: false, sortable: false, draggable: false, flexGrow: 2 },
      { prop: 'fecha', name: 'Fecha', resizeable: false, sortable: false, draggable: false, flexGrow: 1 },
    ];
  }

  private buildColumnsEjer() {
    this.columnsEjer = [
      { prop: 'nombre', name: 'Nombre', resizeable: false, sortable: false, draggable: false, flexGrow: 2 },
      { prop: 'nota', name: 'Nota', resizeable: false, sortable: false, draggable: false, flexGrow: 1 },
      { prop: 'intento', name: 'Intento', resizeable: false, sortable: false, draggable: false, flexGrow: 1 },
      { prop: 'fecha', name: 'Fecha', resizeable: false, sortable: false, draggable: false, flexGrow: 1 }
    ];
  }

  private transformDataEjer() {
    this.rowsEjer.map((row: LastEjercicioDto) => {
      row.fecha = AppUtilities.fomatDateToDDMMYYYY(row.fecha);
      row.nombre = AppUtilities.firstLetterUpper(row.nombre!);
      row.intento = !row.intento || row.intento === 0 ? 'Ilimitados' : row.intento;
      row.nota = row.nota || row.nota === 0 ? Math.round((row.nota as number + Number.EPSILON) * 100) / 100 : '-';
    });
  }
}
