export class Utente {
  id!: number; 
  firstName!: string;
  lastName!: string;
  username!: string;
  email!: string;
  password!: string;
  roles!: string [];
  // abbonato?: boolean;
  cellulare!: string;  

  constructor(data?: any) {
    Object.assign(this, data);
    this.roles = data?.roles || [];
  }

  get role(): string {
    return this.roles.length ? this.roles[0] : '';
  }

}
