import { Esercizio } from "../../../esercizi/models/esercizio-model";
import { SchedaModel } from "../../models/scheda.model";


export class EsercizioScheda {

serie!: number;
ripetizioni!: number;
recupero!: number;
peso!: number;
id!: number;
exercise!: Esercizio;
scheda!: SchedaModel;

 constructor(obj?:any) {
   Object.assign(this, obj);
}

}