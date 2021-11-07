import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterDto } from '../models/filter/filter-dto';
import { GrupoDTO } from '../models/grupo/grupo-dto';
import { Page } from '../models/page/page';
import { AppContants } from '../utils/app-constants';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private http: HttpClient) { }

  public getAllByPageFilter(filter: FilterDto): Observable<Page> {
    return this.http.post<Page>(`${AppContants.URL_API_GRUPO_ALL}/all/filtered`, filter);
  }

  public delete(id: number): Observable<Boolean> {
    return this.http.delete<Boolean>(`${AppContants.URL_API_GRUPO_PROFE}/delete/${id}`);
  }

  public getOne(id: number): Observable<GrupoDTO> {
    return this.http.get<GrupoDTO>(`${AppContants.URL_API_GRUPO_PROFE}/${id}`);
  }

  public save(dto: GrupoDTO): Observable<GrupoDTO> {
    return this.http.post<GrupoDTO>(`${AppContants.URL_API_GRUPO_PROFE}/save`, dto);
  }
}
