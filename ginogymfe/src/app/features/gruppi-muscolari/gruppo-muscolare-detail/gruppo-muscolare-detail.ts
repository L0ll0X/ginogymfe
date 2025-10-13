import { Component } from '@angular/core';
import { GruppoMuscolare } from '../models/gruppo-muscolare';
import { GruppoMuscolareService } from '../service/gruppo-muscolare.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-gruppo-muscolare',
  standalone: false,
  templateUrl: './gruppo-muscolare-detail.html',
  styleUrl: './gruppo-muscolare-detail.css'
})

export class GruppoMuscolareDetail {

  gruppoMuscolare = new GruppoMuscolare()

  constructor(private gruppiMuscolariService: GruppoMuscolareService, private router: Router) {

  }

  ngOnInit(): void {
  
  }

  goBack() {
  this.router.navigate(['./home']);
  }

  submit() {
    if (this.gruppoMuscolare) {
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
