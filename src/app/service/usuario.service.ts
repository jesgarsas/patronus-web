import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
