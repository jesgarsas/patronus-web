import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppContants } from '../utils/app-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatronService {

  constructor(private http: HttpClient) { }

  public getAllByLocale(idLocale: number): Observable<any> {
    return this.http.get(`${AppContants.URL_API_PATRON}/all/${idLocale}`);
  }

  public getByIdAndLocale(id: number, idLocale: number) {
    return this.http.get(`${AppContants.URL_API_PATRON}/${id}/${idLocale}`);
  }
}
