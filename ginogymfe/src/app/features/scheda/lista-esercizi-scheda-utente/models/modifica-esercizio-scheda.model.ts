import { CreaEsercizioScheda } from "./crea-esercizio-scheda.model";

export class ModificaEsercizioScheda extends CreaEsercizioScheda {
    id!: number;

    constructor(obj?: any) {
        super(obj);
        Object.assign(this, obj);
    }
}