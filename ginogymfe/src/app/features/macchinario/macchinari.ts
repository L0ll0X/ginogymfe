import { Component, OnInit } from '@angular/core';
import { MacchinarioService, Page} from './services/macchinario.service';
import { Macchinario } from './models/macchinario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-macchinario',
  standalone:false,
  templateUrl: './macchinari.html',
  styleUrl: './macchinari.css'
})
export class Macchinari implements OnInit {

  macchinari$!: Observable<Macchinario[]>;

  totalElements = 0;
  totalPages = 0;
  page = 0;
  size = 10;
  sort = 'nome,asc';

  constructor(
    private macchinarioService: MacchinarioService,
    private router: Router,
    private acroute: ActivatedRoute

  ) { 
  }

  
  ngOnInit(): void {
    this.macchinari$ = this.macchinarioService.macchinari$;
    this.macchinarioService.get$({ page: this.page, size: this.size, sort: this.sort }).subscribe();

  }

  goToCreate() {
    this.router.navigate(['./details'], { relativeTo: this.acroute });
  }

  goToDetail(id: number) {
    this.router.navigate([`./details/${id}`], { relativeTo: this.acroute });
  }

  deleteMacchinario(id: number): void {
    this.macchinarioService.delete$(id).subscribe({
      next: () => {
      console.log(`Macchinario ${id} eliminato`);
      
     
      },
      error: err => console.error('Errore eliminazione', err)
    });
  }
}


