import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumn } from '@swimlane/ngx-datatable';
import { take } from 'rxjs/operators';
import { ConfigAction } from 'src/app/component/generic-table/model/config-action';
import { EjercicioDTO } from 'src/app/models/patron/ejercicio-dto';
import { PatronDTO } from 'src/app/models/patron/patron-dto';
import { ProyectoDTO } from 'src/app/models/patron/proyecto-dto';
import { Usuario } from 'src/app/models/usuario/usuario';
import { EjercicioService } from 'src/app/service/ejercicio.service';
import { LoginService } from 'src/app/service/login.service';
import { PatronService } from 'src/app/service/patron.service';
import { ResultadoService } from 'src/app/service/resultado.service';
import { ToastService } from 'src/app/service/toast.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { VisitadoService } from 'src/app/service/visitado.service';
import { AppContants } from 'src/app/utils/app-constants';
import { AppUtilities } from 'src/app/utils/app-uitilites';


@Component({
  selector: 'app-patron-details',
  templateUrl: './patron-details.component.html',
  styleUrls: ['./patron-details.component.scss']
})
export class PatronDetailsComponent implements OnInit {

  readonly alumnosConfigActions: ConfigAction = new ConfigAction({ show: true });
  readonly profesorConfigActions: ConfigAction = new ConfigAction({ edit: true, delete: true, show: true });

  public idPatron: number = -1;
  public patron: PatronDTO | undefined = undefined;
  public mobile: boolean = false;
  public configActions: ConfigAction = this.alumnosConfigActions;

  isAlumno: boolean = true;
  columns: TableColumn[] = [];
  rows: ProyectoDTO[] = [];
  loading: boolean = false;
  private usuario?: Usuario;

  constructor(
    private patronService: PatronService,
    private route: ActivatedRoute,
    private ejercicioService: EjercicioService,
    private loginService: LoginService,
    private router: Router,
    private toastService: ToastService,
    private resultadoService: ResultadoService,
    private visitadoService: VisitadoService
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeInteface();
  }

  ngOnInit(): void {
    this.resizeInteface();

    this.usuario = this.loginService.getUser();
    if (this.usuario) {
      this.isAlumno = this.usuario.rolId === AppContants.ROL_ALUMNO;
      if (!this.isAlumno) {
        this.configActions = this.profesorConfigActions;
      }
    }

    if (this.isAlumno) {
      this.buildColumnsAlumno();
    } else {
      this.buildColumnsProfesor();
    }

    this.route.queryParams.pipe(take(1)).subscribe(params => {
      this.idPatron = params.id;
      // Put as visited the group
      this.visitadoService.save(this.idPatron).pipe(take(1)).subscribe((_) => { });
    });

    this.patronService.getByIdAndLocale(this.idPatron, 1).pipe(take(1)).subscribe(data => {
      this.patron = data;
      this.transformProyectos();
    });

    this.getEjercicioTable();
    
  }

  public createEjercicio() {
    this.router.navigate([AppContants.EJERCICIO_CREAR_PATH.substr(1)], { queryParams: { idPatron: this.idPatron}});
  }
  
  public onEditEjercicio(row: any) {
    this.router.navigate([AppContants.EJERCICIO_CREAR_PATH], {queryParams: { idPatron: this.idPatron, idEjercicio: row.id}});
  }
  
  public onDeleteEjercicio(row: any) {
    this.ejercicioService.delete(row.id!).pipe(take(1)).subscribe((result) => {
      if (result) {
        this.toastService.showConfirmation('??xito', 'Borrado con ??xito');
        this.getEjercicioTable();
      }
    }, error => {
      this.toastService.showError('Error', 'No se pudo borrar el ejercicio');
    })
  }

  public onShowEjercicio(row: EjercicioDTO) {
    if (!this.isAlumno) {
      this.router.navigate([AppContants.EJERCICIO_ESTAD??STICAS_PATH], { queryParams: { ejercicioId: row.id}});
    } else {
      this.resultadoService.checkIntentos(row.id!).pipe(take(1)).subscribe((res) => {
        if (res) {
          this.router.navigate([AppContants.EJERCICIO_PATH], { queryParams: { ejercicioId: row.id}});
        } else {
          this.toastService.showError('Acceso no disponible', 'Ya has realizado el m??ximo de intentos');
        }
      })
    }
  }

  public onSortEjercicio(event: any) {}

  private buildColumnsAlumno() {
    this.columns = [
      { prop: 'nombre', name: 'Nombre', resizeable: false, sortable: false, minWidth: 200, draggable: false, flexGrow: 2 },
      { prop: 'nota', name: 'Nota', resizeable: false, sortable: false, draggable: false, flexGrow: 1 },
      { prop: 'realizados', name: 'N?? realizado', resizeable: false, sortable: false, draggable: false, flexGrow: 1 },
      { prop: 'intentos', name: 'Intentos', resizeable: false, sortable: false, draggable: false, flexGrow: 1 },
      { prop: 'fechaCreacion', name: 'Fecha creaci??n', resizeable: false, sortable: false, draggable: false, flexGrow: 1 }
    ];
  }

  private buildColumnsProfesor() {
    this.columns = [
      { prop: 'nombre', name: 'Nombre', resizeable: false, sortable: false, minWidth: 200, draggable: false, flexGrow: 2 },
      { prop: 'intentos', name: 'Intentos', resizeable: false, sortable: false, draggable: false, flexGrow: 1 },
      { prop: 'fechaCreacion', name: 'Fecha creaci??n', resizeable: false, sortable: false, draggable: false, flexGrow: 1 }
    ];
  }

  private transformData() {
    this.rows.map((row: EjercicioDTO) => {
      row.fechaCreacion = AppUtilities.fomatDateToDDMMYYYY(row.fechaCreacion);
      row.nombre = AppUtilities.firstLetterUpper(row.nombre!);
      row.intentos = !row.intentos || row.intentos === 0 ? 'Ilimitados' : row.intentos;
      row.nota = row.nota || row.nota === 0 ? Math.round((row.nota as number + Number.EPSILON) * 100) / 100 : '-';
    });
  }

  private resizeInteface() {
    this.mobile = window.innerWidth <= AppContants.minWidthPhone;
  }

  private getEjercicioTable() {
    
    if (this.usuario) {
      this.ejercicioService.getEjerciciosByUserPatron(this.idPatron, this.usuario.id!).pipe(take(1)).subscribe(data => {
        this.rows = data;
        this.transformData();
      });
    }
  }
  
  private transformProyectos() {
    if (this.patron && this.patron.proyectos) {
      this.patron.proyectos.map(proyecto => {
        proyecto.size = proyecto.size ? Math.round(((proyecto.size! / 1024) + Number.EPSILON) * 100) / 100 : 0;
      })
    }
  }
}
