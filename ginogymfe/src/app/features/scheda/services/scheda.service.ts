import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SchedaModel } from '../models/scheda.model';
import { Page } from '../../macchinario/services/macchinario.service';
import { url } from "../../../../environments/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class SchedaService {
  private apiUrl = `${url.baseUrl}${url.schede.base}`;

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<SchedaModel> {
    return this.http.get<SchedaModel>(`${this.apiUrl}/${id}`);
  }

  get$(pageable: { page: number, size: number, sort: string } = { page: 0, size: 10, sort: 'name,asc' }): Observable<Page<SchedaModel>> {
    let params = new HttpParams()
      .set('page', pageable.page.toString())
      .set('size', pageable.size.toString())
      .set('sort', pageable.sort);
    return this.http.get<Page<SchedaModel>>(this.apiUrl, { params });
  }

  create$(scheda: SchedaModel): Observable<SchedaModel> {
    console.log(`${this.apiUrl}`);
    return this.http.post<SchedaModel>(this.apiUrl, scheda);
  }

  put$(scheda: SchedaModel): Observable<SchedaModel> {
    return this.http.put<SchedaModel>(`${this.apiUrl}/${scheda.id}`, scheda);
  }

  delete$(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
