import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private readonly roles: any = {
    1: 'Alumno',
    2: 'Profesor',
    3: 'Admin'
  }

  constructor() { }

  public translateRol(id: number): string {
    return this.roles[id];
  }
}
