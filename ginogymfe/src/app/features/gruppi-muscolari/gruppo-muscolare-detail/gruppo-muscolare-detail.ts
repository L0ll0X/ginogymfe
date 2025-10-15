import { Component } from '@angular/core';
import { GruppoMuscolare } from '../models/gruppo-muscolare';
import { GruppoMuscolareService } from '../service/gruppo-muscolare.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-gruppo-muscolare',
  standalone: false,
  templateUrl: './gruppo-muscolare-detail.html',
  styleUrl: './gruppo-muscolare-detail.css'
})

export class GruppoMuscolareDetail {

  gruppoMuscolare!:GruppoMuscolare;

 
constructor(
    private gruppiMuscolariService: GruppoMuscolareService, 
    private router: Router,
    private route: ActivatedRoute 
  ) {
    
    this.gruppoMuscolare = {} as GruppoMuscolare;
  }
  ngOnInit(): void {
    this.route.data.pipe(
      tap(({gruppoMuscolare}) => {
          if (gruppoMuscolare) {
              this.gruppoMuscolare = gruppoMuscolare; 
          }
      })
    ).subscribe();
  }

  goBack() {
  this.router.navigate(['/gruppi-muscolari']);
  }

  submit() {
    if (this.gruppoMuscolare.id) {
      this.gruppiMuscolariService.update$(this.gruppoMuscolare).subscribe({
        next: (response) => {
          console.log('Gruppo Muscolare aggiornato:', response);
      },
      error: (err) => {
        console.error('Errore: ')
      }
      });
      } else {
        this.gruppiMuscolariService.create$(this.gruppoMuscolare).subscribe({
           next: (response) => {
          console.log('Gruppo Muscolare aggiunto:', response);
      },
      error: (err) => {
        console.error('Errore: ')
      }
      });
  }
}


}
