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
    private acroute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.acroute.data.pipe(
      tap(({macchinario}) =>{
        this.macchinario = macchinario;
      })
    ).subscribe();
  }



  submit() {
  if (this.macchinario.id) {
    this.macchinarioService.put$(this.macchinario).subscribe({
      next: (response:any) => {
        console.log('Modifica avvenuta con successo', response);
      },
      error: (error:any) => {
        console.error('Modifica fallita', error);
      },
    }); 
    this.router.navigate(['macchinari']);
  } else {
    this.macchinarioService.create$(this.macchinario).subscribe({ 
      next: (response:any) => {
        console.log('Creazione avvenuta con successo', response);
      },
      error: (error:any) => {
        console.error('Creazione fallita', error);
      }
    });
     this.router.navigate(['macchinari']);
  }
 }

goBack(){
  this.router.navigate(['macchinari']);
}

}
