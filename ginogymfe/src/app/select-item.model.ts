import { GruppoMuscolare } from "./features/gruppi-muscolari/models/gruppo-muscolare";
import { Macchinario } from "./features/macchinario/models/macchinario.model";

export class SelectItem {
    id!: number;
    name!: string;
    description!: string;
    machine!: Macchinario;
    muscleGroup!: GruppoMuscolare;


    constructor(obj?: any) {
        Object.assign(this, obj);
    }
}