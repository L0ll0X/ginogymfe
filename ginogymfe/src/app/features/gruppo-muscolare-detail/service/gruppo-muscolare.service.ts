import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GruppoMuscolare } from "../models/gruppo-muscolare";

@Injectable({providedIn: 'root'})

export class GruppoMuscolareService {

private apiUrl = "";

constructor(private http: HttpClient) {
}

getGruppiMuscolari$(): Observable <GruppoMuscolare[]> {
    return this.http.get<GruppoMuscolare[]>(this.apiUrl);
}

create$(gruppoMuscolare: GruppoMuscolare): Observable <GruppoMuscolare> {
    return this.http.post<GruppoMuscolare>(this.apiUrl, gruppoMuscolare);
}

update$(gruppoMuscolare: GruppoMuscolare): Observable <GruppoMuscolare> {
    return this.http.put<GruppoMuscolare>(`${this.apiUrl}/${gruppoMuscolare.id}`, gruppoMuscolare);
}



}