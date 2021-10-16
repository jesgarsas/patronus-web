import { LocaleDTO } from "../locale/locale-dto";

export class LeccionDTO {
    constructor(
        public id?: number,
        public locale?: LocaleDTO,
        public contenido?: string
    ) {}

}
