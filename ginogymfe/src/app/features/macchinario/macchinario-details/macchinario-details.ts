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

  // const macchinario = 

  //   if (macchinario) {
  //     this.macchinarioService.put$(this.macchinario).pipe(
  //       tap((machinario: Macchinario) => {
  //         this.router.navigate(['../macchinario']);
  //       })
  //     ).subscribe()
  //   } else {
  //     this.macchinarioService.create$(this.macchinario).pipe(
  //       tap((macchinario: Macchinario) => {
  //         this.router.navigate(['../macchinario']);
  //       })
  //     ).subscribe();
  //   }
  // }


  }

}
