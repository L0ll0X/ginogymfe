export class Utente {
  id!: number; 
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  role?: string;

  constructor(nome: string, cognome: string, email: string, password: string, ruolo: string) {
    this.firstName = nome;
    this.lastName = cognome;
    this.email = email;
    this.password = password;
    this.role = ruolo;
  }
}
