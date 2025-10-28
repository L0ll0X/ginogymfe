export class EsercizioSchedaRequest{
    
    serie!: number;
    ripetizioni!: number;
    recupero!: number;
    peso!: number;
    id!: number;
    exerciseId!:number;
    schedaId!: number;

    constructor(obj?:any) {
   Object.assign(this, obj);
}
}