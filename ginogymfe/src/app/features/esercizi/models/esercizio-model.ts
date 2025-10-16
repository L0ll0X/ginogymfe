export class Esercizio { //vedi dto be

    id!: number;
    name!: string;
    gruppoMuscolare!: string;
    macchinario!: string;

    constructor(obj?:any) {
      Object.assign(this, obj);
    }

}