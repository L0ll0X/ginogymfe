import { DettagliEsercizio } from "../app/features/dettagli-esercizio/dettagli-esercizio";

export const url ={
    baseUrl: 'http://localhost:8080/api/',
    gruppi_muscolari: {
        base:'musclegroups'
    },
    macchinari: {
        base:'machines'
    },
    esercizi: {
        base: 'exercises'
    },
    utenti:{
        base:"users"
    },
    DettagliEsercizio: {
        base: 'exerciseDetails'
    }
    
}