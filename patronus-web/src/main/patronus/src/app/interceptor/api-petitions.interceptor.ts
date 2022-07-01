import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppContants } from '../utils/app-constants';

@Injectable()
export class ApiPetitionsInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cookie = this.loginService.getUser();
    if (!cookie) {
      if (request.headers.get("login")) {
        return next.handle(request);
      }
      this.router.navigate([AppContants.LOGIN_PATH]);
      return EMPTY;
      
    }
    const headers = request.clone({
      headers: request.headers.set('Authorization', cookie!.token!)
    });
    return next.handle(headers);
  }
}
