import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Macchinario } from "../models/macchinario.model";
import { url } from "../../../../environments/environment.dev";

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
@Injectable({
  providedIn: 'root'
})
export class MacchinarioService {
    // macchinari:any[]=[];
    // macchinariSubject= new BehaviorSubject <any[]>(this.macchinari);
    // macchinari$=this.macchinariSubject.asObservable();

  constructor(private http: HttpClient) { }

  getMacchinarioById$(id: number): Observable<Macchinario> {
    return this.http.get<Macchinario>(`${url.baseUrl}${url.macchinari.base}/${id}`);
  }

  
  get$(pageable: { page: number, size: number, sort: string } = { page: 0, size: 10, sort: 'name,asc' }): Observable<Page<Macchinario>> {
    let params = new HttpParams()
      .set('page', pageable.page.toString())
      .set('size', pageable.size.toString())
      .set('sort', pageable.sort);
<<<<<<< HEAD
    

    return this.http.get<any>(`${url.baseUrl}${url.macchinari.base}`, { params }).pipe(
      tap(data => {
        this.macchinari = data.content;
        this.macchinariSubject.next(this.macchinari); 
      })
    );
  }


  create$(macchinario: Macchinario): Observable<Macchinario> {
    console.log("macchinario" , macchinario) 
    return this.http.post<Macchinario>(`${url.baseUrl}${url.macchinari.base}`, macchinario).pipe(
      tap(newMac => {
        this.macchinari.push(newMac);
        this.macchinariSubject.next(this.macchinari);
           })
    );
    
=======
      return this.http.get<any>(`${url.baseUrl}${url.macchinari.base}`, { params })
      //.pipe(
    //   tap(data => {
    //     this.macchinari = data.content;
    //     this.macchinariSubject.next(this.macchinari); // aggiorna lo stream
    //   })
    // );
  }

  create$(macchinario: Macchinario): Observable <Macchinario> {
      console.log(`${url.baseUrl}${url.macchinari.base}`)
      return this.http.post<Macchinario>(`${url.baseUrl}${url.macchinari.base}`, macchinario);
>>>>>>> origin/develop_martina
  }
  
  
  put$(macchinario: Macchinario): Observable<Macchinario> {
      return this.http.put<Macchinario>(`${url.baseUrl}${url.macchinari.base}/${macchinario.id}`, macchinario);
  }
  
  delete$(id: number): Observable<void> {
    return this.http.delete<void>(`${url.baseUrl}${url.macchinari.base}/${id}`);
  }

  // create$(macchinario: Macchinario): Observable<Macchinario> {
  //   return this.http.post<Macchinario>(`${url.baseUrl}${url.macchinari.base}`, macchinario).pipe(
  //     tap(newMac => {
  //       this.macchinari.push(newMac);
  //       this.macchinariSubject.next(this.macchinari);
  //          })
  //   );
    
  // }

  // put$(macchinario: Macchinario): Observable<Macchinario> {
  //   return this.http.put<Macchinario>(`${url.baseUrl}${url.macchinari.base}/${macchinario.id}`, macchinario).pipe(
  //     tap(updated => {
  //       const index = this.macchinari.findIndex(m => m.id === updated.id);
  //       if (index >= 0) {
  //         this.macchinari[index] = updated;
  //         this.macchinariSubject.next(this.macchinari);
  //       }
  //     })
  //   );
  
  // }
  // delete$(id: number): Observable<void> {
  //   return this.http.delete<void>(`${url.baseUrl}${url.macchinari.base}/${id}`).pipe(
  //     tap(() => {
  //       this.macchinari = this.macchinari.filter(m => m.id !== id);
  //       this.macchinariSubject.next(this.macchinari);
  //     })
  //   );
  // }
  

}
