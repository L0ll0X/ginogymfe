export class Utente {
  id?: number;          
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  role?: string;
  abbonato?: boolean;
  cellulare?: string;    

  constructor(
  data?:any
    
  ) {
    Object.assign(this,data)
   
  }
}
