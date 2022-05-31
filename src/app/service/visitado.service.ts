import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LastPatronVisitadoDto } from '../models/home/last-patron-visitado-dto';
import { AppContants } from '../utils/app-constants';

@Injectable({
  providedIn: 'root'
})
export class VisitadoService {

  constructor(private http: HttpClient) { }
  
  public save(patronId: number): Observable<boolean> {
    return this.http.post<boolean>(`${AppContants.URL_API_VISITADO_ALL}/${patronId}`, null);
  }

  public get(userId: number): Observable<LastPatronVisitadoDto[]> {
    return this.http.get<LastPatronVisitadoDto[]>(`${AppContants.URL_API_VISITADO_ALL}/get/${userId}`);
  }
}
