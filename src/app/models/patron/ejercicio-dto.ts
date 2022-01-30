import { Moment } from "moment";
import { LocaleDTO } from "../locale/locale-dto";
import { PatronDTO } from "./patron-dto";
import { PreguntaDTO } from "./pregunta-dto";

export class EjercicioDTO {
    public id?: number;
	public locale?: LocaleDTO;
	public nombre?: string;
	public fechaCreacion?: Moment | string;
	public nombreAutor?: string;	
	public idAutor?: number;
	public preguntas?: PreguntaDTO;
	public numPreguntas?: number;
	public patron?: PatronDTO;
	public intentos?: number | string;
	public realizados?: number;
}
