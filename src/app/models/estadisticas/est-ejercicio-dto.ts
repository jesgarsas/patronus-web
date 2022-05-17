import { EstGrupoDTO } from "./est-grupo-dto";

export class EstEjercicioDTO {
  public id?: number;
  public nombre?: string;
  public grupos?: EstGrupoDTO[] = [];
  public numeroPreguntas?: number = 0;
}