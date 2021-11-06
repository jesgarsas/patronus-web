import { UsuarioDTO } from "../usuario/usuario-dto";

export class GrupoDTO {

    public id?: number;

    public nombre?: string;

    public profesor?: UsuarioDTO;

    public alumnosCount?: number;

    constructor() {}
    
}
