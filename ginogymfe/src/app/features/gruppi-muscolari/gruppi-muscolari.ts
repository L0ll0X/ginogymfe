import { Component } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { GruppoMuscolare } from './models/gruppo-muscolare';
import { GruppoMuscolareService } from './service/gruppo-muscolare.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../macchinario/services/macchinario.service';

@Component({
  selector: 'app-gruppi-muscolari',
  standalone: false,
  templateUrl: './gruppi-muscolari.html',
  styleUrl: './gruppi-muscolari.css'
})
export class GruppiMuscolari {

  gruppiMuscolariSubject = new BehaviorSubject<GruppoMuscolare[]>([]);
  get gruppiMuscolari$(){ return this.gruppiMuscolariSubject.asObservable()}


  totalElements = 0;
  totalPages = 0;
  page = 0;
  size = 10;
  sort = 'name,asc';
  constructor(
    private gruppoMuscolareService: GruppoMuscolareService,
    private router: Router,
    private acroute: ActivatedRoute) { };

  ngOnInit(): void {
     this.loadGruppiMuscolari();
  }

  private loadGruppiMuscolari(){
     this.gruppoMuscolareService.get$({ page: this.page, size: this.size, sort: this.sort }).pipe(
      map((grupppi: Page<GruppoMuscolare>) =>{
        return grupppi.content
      }),
      tap((gruppi: GruppoMuscolare[]) => {
        this.gruppiMuscolariSubject.next(gruppi);
      })
    ).subscribe();
  }

  goToCreate() {
    this.router.navigate(['./details'], { relativeTo: this.acroute });
  }

  goToDetail(id: number) {
    this.router.navigate(['./details', id], { relativeTo: this.acroute });
  }

  deleteGruppoMuscolare(id: number) {
  if (confirm('Sei sicuro di voler eliminare questo gruppo muscolare?')) {
    this.gruppoMuscolareService.delete$(id).pipe(
      tap((_) =>{
        this.loadGruppiMuscolari();
      })
    ).subscribe();
  }
}


}
