import { Component } from '@angular/core';
import { macchinarioService } from './services/macchinario.service';
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
    private macchinarioService: macchinarioService, 
    private router: Router, 
    private acroute: ActivatedRoute) { };

  ngOnInit(): void {
    // this.macchinari$ = this.macchinarioService.get$();
  }

  goToDetails() {
    this.router.navigate(['macchinario-details'], {relativeTo: this.acroute});   
  }

  updateMacchinario(macchinario: Macchinario) {
    this.router.navigate(['macchinario-details', macchinario.id], {relativeTo: this.acroute});
  }
  }

