import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { LoginService } from '../service/login.service';
import { AppUtilities } from '../utils/app-uitilites';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public loginService: LoginService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const user = this.loginService.getUser();
    // decode the token to get its payload
    if (user && user.token) {
      const tokenPayload = jwtDecode(user.token);
      return AppUtilities.checkAuthority((tokenPayload as any).authorities) >= expectedRole;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
