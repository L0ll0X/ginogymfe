export class CreaEsercizioScheda { 

serie!: number;
ripetizioni!: number;
recupero!: number;
peso!: number;
exerciseId!:number;
workoutPlanId!: number;

constructor(obj?:any) {
      Object.assign(this, obj);
    }

}

  