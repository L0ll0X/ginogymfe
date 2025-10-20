import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { GruppoMuscolare } from "../models/gruppo-muscolare";
import { url } from "../../../../environments/environment.dev";
import { Page } from "../../macchinario/services/macchinario.service";

export interface page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({ providedIn: 'root' })
export class GruppoMuscolareService {


constructor(private http: HttpClient) {
}

  

  
  getById$(id: number): Observable<GruppoMuscolare> {
    return this.http.get<GruppoMuscolare>(`${url.baseUrl}${url.gruppi_muscolari.base}/${id}`);
  }


get$(pageable: { page: number, size: number, sort: string } = { page: 0, size: 15, sort: 'nome,asc' }): Observable<Page<GruppoMuscolare>> {
    let params = new HttpParams()
    .set('page', pageable.page.toString())
    .set('size', pageable.size.toString())
    .set('sort', pageable.sort);
    return this.http.get<any>(`${url.baseUrl}${url.gruppi_muscolari.base}`, { params });
}


create$(gruppoMuscolare: GruppoMuscolare): Observable <GruppoMuscolare> {
    console.log(`${url.baseUrl}${url.gruppi_muscolari.base}`)
    return this.http.post<GruppoMuscolare>(`${url.baseUrl}${url.gruppi_muscolari.base}`, gruppoMuscolare);
  }


update$(gruppoMuscolare: GruppoMuscolare): Observable<GruppoMuscolare> {
    return this.http.put<GruppoMuscolare>(`${url.baseUrl}${url.gruppi_muscolari.base}/${gruppoMuscolare.id}`, gruppoMuscolare);
  }

  
  delete$(id: number): Observable<void> {
    return this.http.delete<void>(`${url.baseUrl}${url.gruppi_muscolari.base}/${id}`);
  }
}



