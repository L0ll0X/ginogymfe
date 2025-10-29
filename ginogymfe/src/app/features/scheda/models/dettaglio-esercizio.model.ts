export class DettaglioEsercizio {

    id!: number;
    serie!: number;
    ripetizioni!: number;
    recupero!: number;
    peso!: number;
    exerciseId!: number;
    dayOfWeekId!: number;    
    idWorkoutPlan!: number;
    
    constructor(obj?:any) {
      Object.assign(this, obj);
    }

}
