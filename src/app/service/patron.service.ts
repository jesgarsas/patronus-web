import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppContants } from '../utils/app-constants';
import { Observable } from 'rxjs';
import { PatronDTO } from '../models/patron/patron-dto';
import { take } from 'rxjs/operators';
import { Page } from '../component/generic-table/model/page';

@Injectable({
  providedIn: 'root'
})
export class PatronService {

  constructor(private http: HttpClient) { }

  public getAllByLocale(idLocale: number): Observable<PatronDTO[]> {
    return this.http.get<PatronDTO[]>(`${AppContants.URL_API_PATRON}/all/${idLocale}`);
  }
  
  public getAllByPageFilter(filter: Page) {
    return this.http.post<PatronDTO[]>(`${AppContants.URL_API_PATRON}/all/filtered`, filter);
  }

  public getByIdAndLocale(id: number, idLocale: number): Observable<PatronDTO> {
    return this.http.get<PatronDTO>(`${AppContants.URL_API_PATRON}/${id}/${idLocale}`);
  }

  public deleteById(id: number): Observable<any> {
    return this.http.delete(`${AppContants.URL_API_PATRON}/${id}`);
  }

  public save(patron: PatronDTO, form: FormData) {
    return this.http.post(`${AppContants.URL_API_PATRON}/save`, form);
  }
}
