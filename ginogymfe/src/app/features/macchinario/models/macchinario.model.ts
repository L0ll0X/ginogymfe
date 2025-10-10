export class Macchinario{

    id!: number;
    nome!: string;

    constructor(obj?:any) {
      Object.assign(this, obj);
    }

}