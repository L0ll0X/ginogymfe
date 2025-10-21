import { Component, OnInit } from '@angular/core';
import { MacchinarioService } from '../services/macchinario.service';
import { Macchinario } from '../models/macchinario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';


@Component({
  selector: 'app-macchinario-details',
  standalone: false,
  templateUrl: './macchinario-details.html',
  styleUrl: './macchinario-details.css'
})
export class MacchinarioDetails implements OnInit{

  macchinario!:Macchinario;

  constructor(
    private macchinarioService: MacchinarioService, 
    private router: Router, 
    private acRoute: ActivatedRoute) {
    this.macchinario = {} as Macchinario;
  }

  ngOnInit(): void {
    this.acRoute.data.pipe(
      tap(({macchinario}) => {
          if (macchinario) {
              this.macchinario = macchinario; 
          }
      })
    ).subscribe();
  }
 
  goBack(){
    this.router.navigate(['/macchinari']);
  }

  submit() {
  if (this.macchinario.id) {
    this.macchinarioService.put$(this.macchinario).subscribe({
      next: (response) => {
        console.log('Modifica avvenuta con successo', response);
        this.router.navigate(['/macchinari']);
      },
      error: (error) => {
        console.error('Modifica fallita', error);
      },
    }); 
  } else {
    this.macchinarioService.create$(this.macchinario).subscribe({ 
      next: (response) => {
        console.log('Creazione avvenuta con successo', response);
        this.router.navigate(['/macchinari']);
      },
      error: (error) => {
        console.error('Creazione fallita', error);
      }
    });
  }
 }


}
