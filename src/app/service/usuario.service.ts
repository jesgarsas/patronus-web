import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterDto } from '../models/filter/filter-dto';
import { Page } from '../models/page/page';
import { Usuario } from '../models/usuario/usuario';
import { UsuarioDTO } from '../models/usuario/usuario-dto';
import { AppContants } from '../utils/app-constants';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  public getUserInformation(id: number, token: string): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${AppContants.URL_API_USUARIO_ALL}/${id}`, {params: {token: token}});
  }

  public changePassword(newPassword: FormData): Observable<Boolean> {
    return this.http.post<Boolean>(`${AppContants.URL_API_USUARIO_ALL}/changePassword`, newPassword);
  }

  public getByGroup(filter: FilterDto): Observable<Page> {
    return this.http.post<Page>(`${AppContants.URL_API_USUARIO_PROFE}/grupo`, filter);
  }

  public getByParam(type: number): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(`${AppContants.URL_API_USUARIO_PROFE}/type/${type}`);
  }

  public create(usuario: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(`${AppContants.URL_API_USUARIO_PROFE}/create`, usuario);
  }

  public createFromFile(form: FormData, id: number): Observable<String[]> {
    return this.http.post<String[]>(`${AppContants.URL_API_USUARIO_PROFE}/create-from-file/${id}`, form);
  }

  public delete(id: number): Observable<Boolean> {
    return this.http.delete<Boolean>(`${AppContants.URL_API_USUARIO_PROFE}/delete/${id}`);
  }
}
