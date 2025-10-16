import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GruppoMuscolare } from "../models/gruppo-muscolare";
import { url } from "../../../../environments/environment.dev";

@Injectable({providedIn: 'root'})

export class GruppoMuscolareService {

constructor(private http: HttpClient) {
}

getGruppiMuscolariById$(id:number): Observable <GruppoMuscolare> {
    return this.http.get<GruppoMuscolare>(`${url.baseUrl}${url.gruppi_muscolari.base}`);
}

get$(): Observable<GruppoMuscolare[]> {
    return this.http.get<GruppoMuscolare[]>(`${url.baseUrl}${url.gruppi_muscolari.base}`);
}

getAll$(): Observable<GruppoMuscolare[]> {
    return this.http.get<GruppoMuscolare[]>(`${url.baseUrl}${url.gruppi_muscolari.base}`);
}

create$(gruppoMuscolare: GruppoMuscolare): Observable<GruppoMuscolare> {
    return this.http.post<GruppoMuscolare>(`${url.baseUrl}/${url.gruppi_muscolari.base}`, gruppoMuscolare);
}

update$(gruppoMuscolare: GruppoMuscolare): Observable<GruppoMuscolare> {
    return this.http.put<GruppoMuscolare>(`${url.baseUrl}/${url.gruppi_muscolari.base}/${gruppoMuscolare.id}`, gruppoMuscolare);
}



}