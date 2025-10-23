export class DettaglioEsercizio {

    id!: number;
    serie!: number;
    ripetizioni!: number;
    recupero!: number;
    peso!: number;
    idEsercizio!: number;
    idGiornoSettimana!: number;
    
    constructor(obj?:any) {
      Object.assign(this, obj);
    }

}
