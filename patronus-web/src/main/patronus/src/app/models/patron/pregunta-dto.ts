import { OpcionDTO } from "./opcion-dto";

export class PreguntaDTO {
  constructor(public tipo?: string,
    public id?: number,
    public pregunta?: string,
    public opciones?: OpcionDTO[]) {

    }
}
