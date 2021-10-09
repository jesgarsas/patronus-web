import { Moment } from "moment";
import { AutorDTO } from "./autor-dto";
import { DescripcionDTO } from "./descripcion-dto";

export class PatronDTO {
    constructor(
        public id?: number,
        public nombre?: string,
        public fechaCreacion?: Moment,
        public autor?: AutorDTO,
        public descripcion?: DescripcionDTO,
    ) {}
}
