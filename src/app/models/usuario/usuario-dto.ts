export class UsuarioDTO {

    public id?: number;
    public nick?: string;
    public password?: string;
    public email?: string;
    public rolId?: number;
    public profesor?: string;
    public profesorEmail?: string;
    public grupo?: string;
    public grupos?: string[] = [];
    
    constructor() {}
}
