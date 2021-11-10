import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrupoManageCreationComponent } from './feature/grupo/grupo-manage/grupo-manage-creation/grupo-manage-creation.component';
import { GrupoManageComponent } from './feature/grupo/grupo-manage/grupo-manage.component';
import { LoginComponent } from './feature/login/login.component';
import { LogoutComponent } from './feature/logout/logout.component';
import { NoPermisionComponent } from './feature/no-permision/no-permision.component';
import { PatronDetailsComponent } from './feature/patron/patron-details/patron-details.component';
import { PatronManageCreationComponent } from './feature/patron/patron-manage/patron-manage-creation/patron-manage-creation.component';
import { PatronManageComponent } from './feature/patron/patron-manage/patron-manage.component';
import { PatronSearchComponent } from './feature/patron/patron-search/patron-search.component';
import { UsuarioDetailsComponent } from './feature/usuario/usuario-details/usuario-details.component';
import { AuthGuardService as AuthGuard} from './guard/auth-guard.service';
import { AppContants } from './utils/app-constants';

const routes: Routes = [
  { path: AppContants.BUSCADOR_PATH.substr(1), component: PatronSearchComponent },
  { path: AppContants.PATRON_DETALLES_PATH.substr(1), component: PatronDetailsComponent },
  { path: AppContants.PATRON_ADMINISTRAR_PATH.substr(1), component: PatronManageComponent, canActivate: [AuthGuard], data: { expectedRole: AppContants.ROL_PROFESOR } },
  { path: AppContants.PATRON_CREAR_PATH.substr(1), component: PatronManageCreationComponent, canActivate: [AuthGuard], data: { expectedRole: AppContants.ROL_PROFESOR } },
  { path: AppContants.LOGIN_PATH.substr(1), component: LoginComponent },
  { path: AppContants.LOGOUT_PATH.substr(1), component: LogoutComponent },
  { path: AppContants.NO_PERMISION_PATH.substr(1), component: NoPermisionComponent },
  { path: AppContants.USUARIO_DETALLES_PATH.substr(1), component: UsuarioDetailsComponent},
  { path: AppContants.GRUPO_ADMINISTRAR_PATH.substr(1), component: GrupoManageComponent},
  { path: AppContants.GRUPO_CREAR_PATH.substr(1), component: GrupoManageCreationComponent},
  { path: AppContants.GRUPO_DETALLES_PATH.substr(1), component: GrupoManageCreationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
