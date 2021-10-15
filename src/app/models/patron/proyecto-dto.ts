
export class ProyectoDTO {
    constructor(
        public name: string,
        public type: string,
        public size: number,
        public id?: number,
        public link?: string,
        public pos?: number
    ) {}

    public static equals(proy: ProyectoDTO, otro: ProyectoDTO) {
        return proy && otro && proy.id === otro.id &&
            proy.name === otro.name && proy.size === otro.size &&
            proy.type === otro.type && proy.pos === otro.pos;
    }
}
