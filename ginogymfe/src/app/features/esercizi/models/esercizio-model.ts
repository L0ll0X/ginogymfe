import { GruppoMuscolare } from "../../gruppi-muscolari/models/gruppo-muscolare";
import { Macchinario } from "../../macchinario/models/macchinario.model";

export class Esercizio { //vedi dto be

    id!: number;
    name!: string;
    muscleGroup!: GruppoMuscolare;
    machine!: Macchinario;

    constructor(obj?:any) {
      Object.assign(this, obj);
    }

}