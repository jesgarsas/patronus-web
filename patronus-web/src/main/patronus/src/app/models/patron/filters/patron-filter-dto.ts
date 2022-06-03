import { Moment } from "moment";
import { FilterDto } from "../../filter/filter-dto";

export class PatronFilterDto extends FilterDto {
    constructor(
        public name?: string,
        public dateIni?: Moment,
        public dateFin?: Moment,
        public autor?: string
    ) { super(); }

    public reset() {
        this.name = undefined;
        this.dateIni = undefined;
        this.dateFin = undefined;
        this.autor = undefined;
    }
}
