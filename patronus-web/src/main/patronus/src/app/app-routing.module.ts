import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjercicioAlumnoComponent } from './feature/ejercicio/ejercicio-alumno/ejercicio-alumno.component';
import { EjercicioEstadisticasComponent } from './feature/ejercicio/ejercicio-manage/ejercicio-estadisticas/ejercicio-estadisticas.component';
import { EjercicioManageCreationComponent } from './feature/ejercicio/ejercicio-manage/ejercicio-manage-creation/ejercicio-manage-creation.component';
import { EjercicioManageComponent } from './feature/ejercicio/ejercicio-manage/ejercicio-manage.component';
import { GrupoManageCreationComponent } from './feature/grupo/grupo-manage/grupo-manage-creation/grupo-manage-creation.component';
import { GrupoManageComponent } from './feature/grupo/grupo-manage/grupo-manage.component';
import { HomeComponent } from './feature/home/home.component';
import { LoginComponent } from './feature/login/login.component';
import { LogoutComponent } from './feature/logout/logout.component';
import { NoPermisionComponent } from './feature/no-permision/no-permision.component';
import { PatronDetailsComponent } from './feature/patron/patron-details/patron-details.component';
import { PatronManageCreationComponent } from './feature/patron/patron-manage/patron-manage-creation/patron-manage-creation.component';
import { PatronManageComponent } from './feature/patron/patron-manage/patron-manage.component';
import { PatronSearchComponent } from './feature/patron/patron-search/patron-search.component';
import { UsuarioDetailsComponent } from './feature/usuario/usuario-details/usuario-details.component';
import { UsuarioManageComponent } from './feature/usuario/usuario-manage/usuario-manage.component';
import { AuthGuardService as AuthGuard} from './guard/auth-guard.service';
import { AppContants } from './utils/app-constants';

const routes: Routes = [ 
  { path: AppContants.HOME_PATH.substr(1), component: HomeComponent, data: {title: 'Inicio'} },
  { path: AppContants.BUSCADOR_PATH.substr(1), component: PatronSearchComponent, data: {title: 'Buscador'} },
  { path: AppContants.BUSCADOR_PATH.substr(1), component: PatronSearchComponent, data: {title: 'Buscador'}  },
  { path: AppContants.PATRON_DETALLES_PATH.substr(1), component: PatronDetailsComponent, data: {title: 'Patrón'}  },
  { path: AppContants.PATRON_ADMINISTRAR_PATH.substr(1), component: PatronManageComponent, canActivate: [AuthGuard], data: { expectedRole: AppContants.ROL_PROFESOR, title: 'Patrones' } },
  { path: AppContants.PATRON_CREAR_PATH.substr(1), component: PatronManageCreationComponent, canActivate: [AuthGuard], data: { expectedRole: AppContants.ROL_PROFESOR, title: 'Crear patrón' }},
  { path: AppContants.LOGIN_PATH.substr(1), component: LoginComponent, data: {title: 'Login'}},
  { path: AppContants.LOGOUT_PATH.substr(1), component: LogoutComponent, data: {title: 'Logout'}},
  { path: AppContants.NO_PERMISION_PATH.substr(1), component: NoPermisionComponent, data: {title: 'No permitido'} },
  { path: AppContants.USUARIO_DETALLES_PATH.substr(1), component: UsuarioDetailsComponent, data: {title: 'Perfil de usuario'}},
  { path: AppContants.GRUPO_ADMINISTRAR_PATH.substr(1), component: GrupoManageComponent, canActivate: [AuthGuard], data: { expectedRole: AppContants.ROL_PROFESOR, title: 'Grupos'} },
  { path: AppContants.GRUPO_CREAR_PATH.substr(1), component: GrupoManageCreationComponent, canActivate: [AuthGuard], data: { expectedRole: AppContants.ROL_PROFESOR,title: 'Crear grupo' } },
  { path: AppContants.GRUPO_DETALLES_PATH.substr(1), component: GrupoManageCreationComponent, canActivate: [AuthGuard], data: { expectedRole: AppContants.ROL_PROFESOR, title: 'Detalles grupo' } },
  { path: AppContants.USUARIO_ADMINISTRAR_PATH.substr(1), component: UsuarioManageComponent, canActivate: [AuthGuard], data: { expectedRole: AppContants.ROL_ADMINISTRADOR, title: 'Lista usuarios' } },
  { path: AppContants.EJERCICIO_ADMINISTRAR_PATH.substr(1), component: EjercicioManageComponent, canActivate: [AuthGuard], data: { expectedRole: AppContants.ROL_PROFESOR, title: 'Lista ejercicios'} },
  { path: AppContants.EJERCICIO_DETALLES_PATH.substr(1), component: EjercicioManageCreationComponent, canActivate: [AuthGuard], data: { expectedRole: AppContants.ROL_PROFESOR, title: 'Detalles ejercicio' } },
  { path: AppContants.EJERCICIO_CREAR_PATH.substr(1), component: EjercicioManageCreationComponent, canActivate: [AuthGuard], data: { expectedRole: AppContants.ROL_PROFESOR, title: 'Crear ejercicio' } },
  { path: AppContants.EJERCICIO_PATH.substr(1), component: EjercicioAlumnoComponent, canActivate: [AuthGuard], data: { expectedRole: AppContants.ROL_ALUMNO, title: 'Ejercicio' } },
  { path: AppContants.EJERCICIO_ESTADÍSTICAS_PATH.substr(1), component: EjercicioEstadisticasComponent, canActivate: [AuthGuard], data: { expectedRole: AppContants.ROL_PROFESOR, title: 'Estadísticas ejercicio' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
