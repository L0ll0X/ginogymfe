export class Macchinario{

    id!: number;
    name!: string;
    description!:string;

    constructor(obj?:any) {
      Object.assign(this, obj);
    }

}