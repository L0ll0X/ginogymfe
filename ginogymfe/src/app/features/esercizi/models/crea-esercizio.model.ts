
export class CreaEsercizio { 
    name!: string;
    IdGruppoMuscolare!: number;
    IdMacchinario!: number;

    constructor(obj?:any) {
      Object.assign(this, obj);
    }

}