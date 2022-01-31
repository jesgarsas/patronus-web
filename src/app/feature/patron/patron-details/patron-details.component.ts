import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableColumn } from '@swimlane/ngx-datatable';
import { take } from 'rxjs/operators';
import { EjercicioDTO } from 'src/app/models/patron/ejercicio-dto';
import { PatronDTO } from 'src/app/models/patron/patron-dto';
import { ProyectoDTO } from 'src/app/models/patron/proyecto-dto';
import { Usuario } from 'src/app/models/usuario/usuario';
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

  isAlumno: boolean = true;
  columns: TableColumn[] = [];
  rows: ProyectoDTO[] = [];
  loading: boolean = false;
  private usuario?: Usuario;

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

    this.usuario = this.loginService.getUser();
    if (this.usuario) {
      this.isAlumno = this.usuario.rolId === AppContants.ROL_ALUMNO;
    }

    if (this.isAlumno) {
      this.buildColumnsAlumno();
    } else {
      this.buildColumnsProfesor();
    }

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

  private buildColumnsAlumno() {
    this.columns = [
      { prop: 'nombre', name: 'Nombre', resizeable: false, sortable: false, minWidth: 200, draggable: false, flexGrow: 2 },
      { prop: 'nota', name: 'Nota', resizeable: false, sortable: false, draggable: false, flexGrow: 1 },
      { prop: 'realizados', name: 'Nº realizado', resizeable: false, sortable: false, draggable: false, flexGrow: 1 },
      { prop: 'intentos', name: 'Intentos', resizeable: false, sortable: false, draggable: false, flexGrow: 1 },
      { prop: 'fechaCreacion', name: 'Fecha creación', resizeable: false, sortable: false, draggable: false, flexGrow: 1 }
    ];
  }

  private buildColumnsProfesor() {
    this.columns = [
     
    ];
  }

  private transformData() {
    this.rows.map((row: EjercicioDTO) => {
      row.fechaCreacion = AppUtilities.fomatDateToDDMMYYYY(row.fechaCreacion);
      row.nombre = AppUtilities.firstLetterUpper(row.nombre!);
      row.intentos = !row.intentos || row.intentos === 0 ? 'Ilimitados' : row.intentos;
      row.nota = row.nota ? row.nota : '-';
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
}
