export class Page {

    public totalElements: number;
    public size: number;
    public pageNumber: number;
    public totalPages: number;
    public sort?: string;
    public column?: string;

    constructor(
        totalElements: number,
        size: number,
        pageNumber: number,
        totalPages: number
    ) {
        this.totalElements = totalElements;
        this.size = size;
        this.pageNumber = pageNumber;
        this.totalPages = totalPages;
    }
}