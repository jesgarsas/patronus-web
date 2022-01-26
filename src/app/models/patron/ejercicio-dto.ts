import { Moment } from "moment";
import { LocaleDTO } from "../locale/locale-dto";
import { PreguntaDTO } from "./pregunta-dto";

export class EjercicioDTO {
    public id?: number;
	public locale?: LocaleDTO;
	public nombre?: string;
	public fechaCreacion?: Moment;
	public nombreAutor?: Moment;	
	public idAutor?: number;
	public preguntas?: PreguntaDTO;
	public numPreguntas?: number;
}
