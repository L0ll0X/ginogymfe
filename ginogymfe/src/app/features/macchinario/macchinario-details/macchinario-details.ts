import { Component } from '@angular/core';
import { macchinarioService } from '../services/macchinario.service';
import { Macchinario } from '../models/macchinario.model';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs';


@Component({
  selector: 'app-macchinario-details',
  standalone: false,
  templateUrl: './macchinario-details.html',
  styleUrl: './macchinario-details.css'
})
export class MacchinarioDetails {

  macchinario = new Macchinario();

  constructor(private macchinarioService: macchinarioService, private router: Router) {
  }

  submit() {
  if (this.macchinario) {
    this.macchinarioService.put$(this.macchinario).subscribe({
      next: (response) => {
        console.log('Modifica avvenuta con successo', response);
      },
      error: (error) => {
        console.error('Modifica fallita', error);
      }
    }); // <-- Missing closing parenthesis and semicolon for subscribe()
  } else {
    this.macchinarioService.create$(this.macchinario).subscribe({ // <-- Extra dot and missing parenthesis/semicolon
      next: (response) => {
        console.log('Creazione avvenuta con successo', response);
      },
      error: (error) => {
        console.error('Creazione fallita', error);
      }
    });
  }
 }

}
