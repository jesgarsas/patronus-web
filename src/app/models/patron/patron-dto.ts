import { Moment } from "moment";
import { AutorDTO } from "./autor-dto";
import { DescripcionDTO } from "./descripcion-dto";
import { LeccionDTO } from "./leccion-dto";
import { ProyectoDTO } from "./proyecto-dto";

export class PatronDTO {

    constructor(
        public id?: number,
        public nombre?: string,
        public patron?: PatronDTO,
        public fechaCreacion?: Moment | string,
        public autor?: AutorDTO,
        public descripciones?: DescripcionDTO[],
        public lecciones?: LeccionDTO[],
        public proyectos?: ProyectoDTO[],
        public proyectosCount?: number,
        public leccionesCount?: number
    ) {
    }
}
