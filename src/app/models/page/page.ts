import { FilterDto } from "src/app/models/filter/filter-dto";

export class Page {

    public totalElements: number = 0;
    public totalPages: number = 1;
    public content: any[] = [];

    constructor() {}
}