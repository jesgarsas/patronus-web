import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeEstadisticasDto } from '../models/home/home-estadisticas-dto';
import { LastEjercicioDto } from '../models/home/last-ejercicio-dto';
import { RespuestaDto } from '../models/patron/respuesta-dto';
import { AppContants } from '../utils/app-constants';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {

  constructor(private http: HttpClient) { }

  public save(resultado: RespuestaDto) {
    return this.http.post(`${AppContants.URL_API_RESULTADO_ALL}/save`, resultado);
  }

  public checkIntentos(ejericioId: number) {
    return this.http.get(`${AppContants.URL_API_RESULTADO_ALL}/checkIntentos/${ejericioId}`);
  }

  public getEstadisticas(ejericioId: number, grupos: number[]) {
    let url: URL = new URL(`${AppContants.URL_API_RESULTADO_PROFE}/estadisticas/ejercicio/${ejericioId}`);
    url.searchParams.append('idGrupos', grupos.toString());
    return this.http.get(url.toString());
  }

  public getLastEjercicio(): Observable<LastEjercicioDto> {
    return this.http.get<LastEjercicioDto>(`${AppContants.URL_API_RESULTADO_ALL}/ultimo/`);
  }

  public getEstadisticasHome(): Observable<HomeEstadisticasDto> {
    return this.http.get<HomeEstadisticasDto>(`${AppContants.URL_API_RESULTADO_ALL}/estadisticas/`);
  }
}
