import { EsercizioSchedaRequest } from "../lista-esercizi-scheda-utente/models/esercizio-scheda-request.model";
import { EsercizioScheda } from "../lista-esercizi-scheda-utente/models/esercizio-scheda-utente.model";


export class SchedaModel {
  id!: number;
  userId?: number;      
  startDate: string = '';    
  endDate: string= '';
  exerciseDetails?: EsercizioSchedaRequest[];

  constructor(obj?: any) {
        Object.assign(this, obj);
    }
}

export class CreateSchedaWithDetailRequest extends SchedaModel{

    constructor(data?:any){
      super(data);
      Object.assign(this, data)
      if (!this.exerciseDetails) {
          this.exerciseDetails = [];
    }
}
}
