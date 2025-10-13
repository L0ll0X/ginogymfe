import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Macchinario } from "../models/macchinario.model";

@Injectable({
    providedIn: 'root'
})

export class macchinarioService{

    baseURL = 'http://localhost:8080/macchinari';
    constructor(private http: HttpClient) {}

    get$(): Observable<Macchinario[]> {
        return this.http.get<Macchinario[]>(this.baseURL);
    }

    create$(macchinario: Macchinario): Observable<Macchinario> {
        return this.http.post<Macchinario>(this.baseURL, macchinario);
    }

    put$(macchinario: Macchinario): Observable<Macchinario> {
        return this.http.put<Macchinario>(`${this.baseURL}/${macchinario.id}`, macchinario);
    }




}