import { Component } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { GruppoMuscolare } from './models/gruppo-muscolare';
import { GruppoMuscolareService } from './service/gruppo-muscolare.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../macchinario/services/macchinario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmation } from '../../modale/modale';

@Component({
  selector: 'app-gruppi-muscolari',
  standalone: false,
  templateUrl: './gruppi-muscolari.html',
  styleUrl: './gruppi-muscolari.css'
})
export class GruppiMuscolari {

  gruppiMuscolari$!: Observable<GruppoMuscolare[]>;


  totalElements = 0;
  totalPages = 0;
  page = 0;
  size = 15;
  sort = 'name,asc';
  constructor(
    private gruppoMuscolareService: GruppoMuscolareService,
    private router: Router,
    private modalService: NgbModal,
    private acroute: ActivatedRoute) { };

  ngOnInit(): void {
    this.gruppiMuscolari$ = this.gruppoMuscolareService.gruppiMuscolari$;
    this.gruppoMuscolareService.get$({ page: this.page, size: this.size, sort: this.sort }).subscribe();
  }

  goToCreate() {
    this.router.navigate(['./details'], { relativeTo: this.acroute });
  }

  goToDetail(id: number) {
    this.router.navigate(['./details', id], { relativeTo: this.acroute });
  }
  
  deleteGruppoMuscolare(id: number) {
  if (confirm('Sei sicuro di voler eliminare questo gruppo muscolare?')) {
    this.gruppoMuscolareService.delete$(id).subscribe({
      next: () => {
      console.log(`GruppoMuscolare ${id} eliminato`);
      },
      error: err => console.error('Errore eliminazione', err)
    });
  }
  }
}



