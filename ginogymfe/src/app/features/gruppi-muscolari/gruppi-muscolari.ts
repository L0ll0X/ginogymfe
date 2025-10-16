import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GruppoMuscolare } from './models/gruppo-muscolare';
import { GruppoMuscolareService } from './service/gruppo-muscolare.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gruppi-muscolari',
  standalone: false,
  templateUrl: './gruppi-muscolari.html',
  styleUrl: './gruppi-muscolari.css'
})
export class GruppiMuscolari {

  gruppiMuscolari$!: Observable<GruppoMuscolare[]>

  constructor(
    private gruppoMuscolareService: GruppoMuscolareService,
    private router: Router,
    private acroute: ActivatedRoute) { };

  ngOnInit(): void {
    this.gruppiMuscolari$ = this.gruppoMuscolareService.get$();
  }

  goToCreate() {
    this.router.navigate(['./details'], { relativeTo: this.acroute });
  }

  goToDetail(id: number) {
    this.router.navigate(['./details', id], { relativeTo: this.acroute });
  }

}
