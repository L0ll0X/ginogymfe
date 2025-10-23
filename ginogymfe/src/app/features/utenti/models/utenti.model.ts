export class Utente {
  id!: number; 
  username!: string;
  email!: string;
  password!: string;
  roles?: string[];
  abbonato?: boolean;
  cellulare?: string;    

  constructor(
  data?:any
    
  ) {
    Object.assign(this,data)
   
  }
}
