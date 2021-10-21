export class FilterDto {

    public size: number = 10;
    public pageNumber: number = 0;
    public sort?: string;
    public column?: string;

    constructor() {}
}
