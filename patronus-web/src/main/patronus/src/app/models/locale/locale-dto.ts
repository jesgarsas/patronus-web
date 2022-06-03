export class LocaleDTO {
    constructor(
        public id?: number,
        public code?: string
    ) {}

    public static spanish: LocaleDTO = { id: 1, code: 'es' };
}
