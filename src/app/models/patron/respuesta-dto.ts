import { LocaleDTO } from "../locale/locale-dto";
import { PreguntaDTO } from "./pregunta-dto";

export class RespuestaDto {
  public id?: number;
  public idEjercicio?: number;
	public locale?: LocaleDTO;
	public preguntas?: PreguntaDTO[];
}
