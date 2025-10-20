
export class CreaEsercizio { 
    name!: string;
    muscleGroupId!: number;
    machineId!: number;

    constructor(obj?:any) {
      Object.assign(this, obj);
    }

}