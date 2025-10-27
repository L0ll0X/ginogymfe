export class Macchinario{

    id!: number;
    name!: string;
    description!:string;
    imageBase64?: string; 
  

    constructor(obj?:any) {
      Object.assign(this, obj);
    }

}