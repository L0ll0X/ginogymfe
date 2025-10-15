import { Component } from '@angular/core';
import { MacchinarioService } from './services/macchinario.service';
import { Macchinario } from './models/macchinario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-macchinario',
  standalone: false,
  templateUrl: './macchinari.html',
  styleUrl: './macchinari.css'
})
export class Macchinari {

  macchinari$!: Observable<Macchinario[]>

  constructor(
    private macchinarioService: MacchinarioService,
    private router: Router,
    private acroute: ActivatedRoute) { };

  ngOnInit(): void {
    // this.macchinari$ = this.macchinarioService.get$();
  }

  goToCreate() {
    this.router.navigate(['./details'], { relativeTo: this.acroute });
  }

  goToDetail(id: number) {
    this.router.navigate(['./details', id], { relativeTo: this.acroute });
  }
}

