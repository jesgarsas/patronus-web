export class ConfigAction {

    public edit: boolean;
    public delete: boolean;

    constructor(config: { edit?: boolean, delete?: boolean }) {
        this.edit = config.edit ? true : false;
        this.delete = config.delete ? true : false;
    }
}