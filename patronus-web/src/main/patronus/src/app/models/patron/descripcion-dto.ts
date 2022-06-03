import { LocaleDTO } from "../locale/locale-dto";

export class DescripcionDTO {
    constructor(
       public id?: number,
       public descripcion?: string,
       public locale?: LocaleDTO 
    ) {}
}
