import { Component, OnInit } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { take } from 'rxjs/operators';
import { PatronDTO } from 'src/app/models/patron/patron-dto';
import { PatronService } from 'src/app/service/patron.service';

@Component({
  selector: 'app-patron-manage-table',
  templateUrl: './patron-manage-table.component.html',
  styleUrls: ['./patron-manage-table.component.scss']
})
export class PatronManageTableComponent implements OnInit {

  public columns: TableColumn[] = [];
  public rows: any[] = [];

  constructor(private patroneService: PatronService) { }

  ngOnInit(): void {
    this.buildColumns();
    this.getPatrones();
  }

  private getPatrones() {
    this.patroneService.getAllByLocale(1).pipe(take(1)).subscribe(data => {
      this.rows = data;
      this.transformData();
   });
  }

  private transformData() {
    this.rows.map(row => {
      row.leccion = row.leccion ? 1 : 0;
      row.proyectos = row.proyectos ? row.proyectos : { length: 0}; 
    });
  }
  
  private buildColumns() {
    this.columns = [
      { prop: 'nombre', name: 'Nombre', resizeable: false, minWidth: 200, draggable: false, flexGrow: 2, headerClass: 'header-blue' },
      { prop: 'fechaCreacion', name: 'Fecha de creación', resizeable: false, draggable: false, flexGrow: 1, headerClass: 'header-blue' },
      { prop: 'autor.nick', name: 'Autor', resizeable: false, draggable: false, flexGrow: 1, headerClass: 'header-blue' },
      { prop: 'leccion', name: 'Nº Lecciones', resizeable: false, draggable: false, flexGrow: 1, headerClass: 'header-blue' },
      { prop: 'proyectos.length', name: 'Nº Proyectos', resizeable: false, draggable: false, flexGrow: 1, headerClass: 'header-blue' }
    ];
  }

}
