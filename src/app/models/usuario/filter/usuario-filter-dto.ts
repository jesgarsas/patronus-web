import { FilterDto } from "../../filter/filter-dto";

export class UsuarioFilterDto extends FilterDto {
    constructor(
        public idGrupo?: number
    ) {
        super();
    }
}
