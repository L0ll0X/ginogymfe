import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { SchedaModel } from '../models/scheda.model';
import { Page } from '../../macchinario/services/macchinario.service';
import { url } from "../../../../environments/environment.dev";
import { Esercizio } from '../../esercizi/models/esercizio-model';
import { Schede } from '../schede';

@Injectable({
  providedIn: 'root'
})
export class SchedaService {

  private apiUrl = `${url.baseUrl}${url.schede.base}`;

  schede: any[] = [];
  schedeSubject = new BehaviorSubject<Schede[]>([]);
  get schede$() { return this.schedeSubject.asObservable() }

  constructor(private http: HttpClient) { }

  getExercisesByWorkoutPlanId$(id: number) {
    return this.http.get<Esercizio[]>(`${this.apiUrl}/workoutplan-exercises/${id}`);
  }

  getById$(id: number): Observable<SchedaModel> {
    return this.http.get<SchedaModel>(`${this.apiUrl}/${id}`);
  }

  get$(pageable: { page: number, size: number, sort: string } = { page: 0, size: 5, sort: 'name,asc' }): Observable<Page<Schede>> {
    let params = new HttpParams()
      .set('page', pageable.page.toString())
      .set('size', pageable.size.toString())
      .set('sort', pageable.sort);

    return this.http.get<Page<Schede>>(`${url.baseUrl}${url.schede.base}`, { params }).pipe(
      tap(pageData => {
        // aggiorna lo stream con i contenuti della pagina
        this.schede = pageData.content;
        this.schedeSubject.next(this.schede);
      })
    );
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
