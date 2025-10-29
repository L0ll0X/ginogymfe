export class CreaEsercizioScheda { 

serie!: number;
ripetizioni!: number;
recupero!: number;
peso!: number;
idEsercizio!:number;
idWorkoutPlan!: number;

constructor(obj?:any) {
      Object.assign(this, obj);
    }

}

  