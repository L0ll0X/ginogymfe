import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modale-errore',
  standalone: false,
  templateUrl: './modale-errore.html',
  styleUrl: './modale-errore.css'
})
export class ModaleErrore {

  @Input() title: string = 'Errore';
  @Input() message: string = 'Si è verificato un errore.';

  constructor(public activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.close(); // chiude la modale
  }

}
