import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterDto } from '../models/filter/filter-dto';
import { Page } from '../models/page/page';
import { EjercicioDTO } from '../models/patron/ejercicio-dto';
import { AppContants } from '../utils/app-constants';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  constructor(private http: HttpClient) { }

  public getAllByPageFilter(filter: FilterDto): Observable<Page> {
    return this.http.post<Page>(`${AppContants.URL_API_EJERCIO_PROFE}/all/filtered`, filter);
  }

  public getEjerciciosByUserPatron(id: number, userId: number) {
    return this.http.get<EjercicioDTO[]>(`${AppContants.URL_API_EJERCIO_ALL}/patron/${id}/usuario/${userId}`);
  }

  public save(ejercicio: EjercicioDTO) {
    return this.http.post(`${AppContants.URL_API_EJERCIO_PROFE}/save`, ejercicio);
  }

  public delete(id: number) {
    return this.http.delete(`${AppContants.URL_API_EJERCIO_PROFE}/delete/${id}`);
  }
}
