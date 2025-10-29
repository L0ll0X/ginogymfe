export class EsercizioSchedaRequest{
    
    serie!: number;
    ripetizioni!: number;
    recupero!: number;
    peso!: number;
    id!: number;
    idEsercizio!:number;    
    idWorkoutPlan!: number;

    constructor(obj?:any) {
   Object.assign(this, obj);
}
}