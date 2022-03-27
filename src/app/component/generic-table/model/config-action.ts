export class ConfigAction {

    public edit: boolean;
    public delete: boolean;
    public show: boolean

    constructor(config: { edit?: boolean, delete?: boolean, show?: boolean }) {
        this.edit = config.edit ? true : false;
        this.delete = config.delete ? true : false;
        this.show = config.show ? true : false;
    }
}