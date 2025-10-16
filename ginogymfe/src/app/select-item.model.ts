export class SelectItem {
    id!: number;
    name!: string;
    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}