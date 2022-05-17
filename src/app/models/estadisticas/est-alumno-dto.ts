import { Moment } from "moment";
import { EstPreguntaDTO } from "./est-pregunta-dto";

export class EstAlumnoDTO {
  public nombre?: string;
  public email?: string;
  public nota?: number;
  public fecha?: Moment;
  public ejercicios?: EstPreguntaDTO[] = [];
}