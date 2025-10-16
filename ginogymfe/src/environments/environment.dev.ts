import { get } from "node:http";

export const url ={
    baseUrl: 'http://localhost:8080/api/',
    gruppi_muscolari: {
        base:'musclegroups',
        get: '',
        update:'',
        create:'',
        delete:''
    },
    macchinari: {
        base:'machines',
        get: '',
        update:'',
        create:'',
        delete:''
    },
    utenti:{
        base:"users"
    }
    
}