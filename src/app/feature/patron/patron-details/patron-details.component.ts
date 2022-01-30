import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableColumn } from '@swimlane/ngx-datatable';
import { take } from 'rxjs/operators';
import { EjercicioDTO } from 'src/app/models/patron/ejercicio-dto';
import { PatronDTO } from 'src/app/models/patron/patron-dto';
import { ProyectoDTO } from 'src/app/models/patron/proyecto-dto';
import { EjercicioService } from 'src/app/service/ejercicio.service';
import { LoginService } from 'src/app/service/login.service';
import { PatronService } from 'src/app/service/patron.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AppContants } from 'src/app/utils/app-constants';
import { AppUtilities } from 'src/app/utils/app-uitilites';


@Component({
  selector: 'app-patron-details',
  templateUrl: './patron-details.component.html',
  styleUrls: ['./patron-details.component.scss']
})
export class PatronDetailsComponent implements OnInit {

  public idPatron: number = -1;
  public patron: PatronDTO | undefined = undefined;
  public mobile: boolean = false;

  columns: TableColumn[] = [];
  rows: ProyectoDTO[] = [];
  loading: boolean = false;

  constructor(
    private patronService: PatronService,
    private route: ActivatedRoute,
    private ejercicioService: EjercicioService,
    private loginService: LoginService
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeInteface();
  }

  ngOnInit(): void {
    this.resizeInteface();
    this.buildColumns();

    this.route.queryParams.pipe(take(1)).subscribe(params => {
      this.idPatron = params.id;
    });

    this.patronService.getByIdAndLocale(this.idPatron, 1).pipe(take(1)).subscribe(data => {
      this.patron = data;
    });

    this.getEjercicioTable();
    
  }

  public createEjercicio() {}
  
  public onEditEjercicio(event: any) {}
  
  public onDeleteEjercicio(event: any) {}

  public onSortEjercicio(event: any) {}

  private buildColumns() {
    this.columns = [
      { prop: 'nombre', name: 'Nombre', resizeable: false, sortable: false, minWidth: 200, draggable: false, flexGrow: 2 },
      { prop: 'realizados', name: 'Nº realizado', resizeable: false, sortable: false, draggable: false, flexGrow: 1 },
      { prop: 'intentos', name: 'Intentos', resizeable: false, sortable: false, draggable: false, flexGrow: 1 },
      { prop: 'fechaCreacion', name: 'Fecha creación', resizeable: false, sortable: false, draggable: false, flexGrow: 1 }
    ];
  }

  private transformData() {
    this.rows.map((row: EjercicioDTO) => {
      row.fechaCreacion = AppUtilities.fomatDateToDDMMYYYY(row.fechaCreacion);
      row.nombre = AppUtilities.firstLetterUpper(row.nombre!);
      row.intentos = !row.intentos || row.intentos === 0 ? 'Ilimitados' : row.intentos;
    });
  }

  private resizeInteface() {
    this.mobile = window.innerWidth <= AppContants.minWidthPhone;
  }

  private getEjercicioTable() {
    let user = this.loginService.getUser();
    if (user) {
      this.ejercicioService.getEjerciciosByUserPatron(this.idPatron, user.id!).pipe(take(1)).subscribe(data => {
        this.rows = data;
        this.transformData();
      });
    }
  }
}
