import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { SelectionType, TableColumn } from '@swimlane/ngx-datatable';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { LastPatronVisitadoDto } from 'src/app/models/home/last-patron-visitado-dto';
import { Usuario } from 'src/app/models/usuario/usuario';
import { LoginService } from 'src/app/service/login.service';
import { VisitadoService } from 'src/app/service/visitado.service';
import { AppContants } from 'src/app/utils/app-constants';

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

  constructor(private visitadoService: VisitadoService,
    private loginService: LoginService,
    private router: Router,
    private menuService: NbMenuService) { }

  ngOnInit(): void {
    this.usuario = this.loginService.getUser();
    this.setUpTablePatrones();
  }

  setUpTablePatrones() {
    this.buildColumnsPatrones();
    this.getPatronesVisitados();
  }

  onSelectPatron(value: any) {
    if (value && value.selected && value.selected[0]) {
      this.router.navigate([AppContants.PATRON_DETALLES_PATH.substring(1)], { queryParams: { id: value.selected[0].idPatron}, });
    }
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
}
