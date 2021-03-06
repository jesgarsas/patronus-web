import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario/usuario';
import { AppContants } from '../utils/app-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    private cookies: CookieService) { }

  public login(form: FormData): Observable<Usuario> {
    return this.http.post<Usuario>(`${AppContants.URL_API_USUARIO}/login`, form, { headers: { login: "true" } });
  }

  public getUser(): Usuario | undefined {
    let cookie = this.cookies.get("usuario");
    return cookie ? JSON.parse(this.cookies.get("usuario")) : undefined;
  }

  public setUser(usuario: Usuario) {
    this.cookies.deleteAll("usuario");
    let user: string = JSON.stringify(usuario);
    this.cookies.set("usuario", user, { expires: 1, sameSite: 'Lax' });
  }

  public logout() {
    this.cookies.deleteAll("usuario");
  }

  public getGrupos(): Observable<number[]> {
    return this.http.get<number[]>(`${AppContants.URL_API_USUARIO_ALL}/grupos`);
  }
}
