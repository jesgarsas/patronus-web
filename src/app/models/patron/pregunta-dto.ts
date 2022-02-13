import { OpcionDTO } from "./opcion-dto";

export class PreguntaDTO {
  constructor(public tipo?: string,
    public texto?: string,
    public opciones?: OpcionDTO[]) {

    }
}
