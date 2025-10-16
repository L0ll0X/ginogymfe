import { CreaEsercizio } from "./crea-esercizio.model";


export class ModificaEsercizio extends CreaEsercizio {
    id!: number;

    constructor(obj?: any) {
        super(obj);
        Object.assign(this, obj);
    }

}