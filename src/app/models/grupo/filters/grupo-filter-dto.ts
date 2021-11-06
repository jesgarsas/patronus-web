import { FilterDto } from "../../filter/filter-dto";

export class GrupoFilterDto extends FilterDto {

    constructor(
        public nombre?: string,
        public profesor?: string,
        public alumnosCount?: number,

    ) { super(); }

    public reset() {
        this.nombre = undefined;
        this.profesor = undefined;
        this.alumnosCount = undefined;
    }
}
