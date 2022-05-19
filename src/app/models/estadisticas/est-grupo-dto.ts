import { EstAlumnoDTO } from "./est-alumno-dto";

export class EstGrupoDTO {
  public id?: number;
  public nombre?: string;
  public total?: number;
  public aprobados?: number;
  public suspendidos?: number;
  public noResueltos?: number;
  public alumnos?: EstAlumnoDTO[] = [];
}