import { EsercizioScheda } from "../lista-esercizi-scheda-utente/models/esercizio-scheda-utente.model";


export class SchedaModel {
  id!: number;
  userId?: number;      
  startDate: string = '';    
  endDate: string= '';
  

  constructor(obj?: any) {
        Object.assign(this, obj);
    }
}

export class CreateSchedaWithDetailRequest extends SchedaModel{
    exerciseDetails: EsercizioScheda[] = []

    constructor(data?:any){
      super(data);
      Object.assign(this, data)
    }
}
