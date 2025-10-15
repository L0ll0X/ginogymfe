import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Macchinario } from "../models/macchinario.model";
import { url } from "../../../../environments/environment.dev";

@Injectable({
    providedIn: 'root'
})

export class MacchinarioService{

    constructor(private http: HttpClient) {}

    getMacchinarioById$(id: number): Observable<Macchinario> {
      return this.http.get<Macchinario>(`${url.baseUrl}${url.macchinari}`);
    }

    get$(): Observable<Macchinario[]> {
        return this.http.get<Macchinario[]>(`${url.baseUrl}${url.macchinari}`);
    }

    create$(macchinario: Macchinario): Observable<Macchinario> {
        console.log(`${url.baseUrl}${url.macchinari.base}`)
        return this.http.post<Macchinario>(`${url.baseUrl}${url.macchinari.base}`, macchinario);
    }

    put$(macchinario: Macchinario): Observable<Macchinario> {
        return this.http.put<Macchinario>(`${url.baseUrl}${url.macchinari}/${macchinario.id}`, macchinario);
    }




}