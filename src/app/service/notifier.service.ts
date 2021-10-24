import { EventEmitter, Injectable } from '@angular/core';

/**
 * Clase que actua como servicio de mensajes de la aplicación
 */
@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  public readonly userLogged: EventEmitter<Boolean> = new EventEmitter();

  constructor() { }

  public emitUserLogged(value: Boolean): void {
    this.userLogged.emit(value);
  }

}
