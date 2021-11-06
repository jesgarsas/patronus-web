import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterDto } from '../models/filter/filter-dto';
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

}
