import { FilterDto } from "../../filter/filter-dto";

export class UsuarioFilterDto extends FilterDto {
    constructor(
        public idGrupo?: number,
        public name?: string,
        public email?: string,
        public type?: number
    ) {
        super();
    }

    reset() {
        this.idGrupo = undefined;
        this.name = undefined;
        this.email = undefined;
        this.type = undefined;
    }
}
