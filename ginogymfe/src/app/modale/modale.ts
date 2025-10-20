import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmation',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Conferma</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="close()"></button>
    </div>
    <div class="modal-body">
      <p>Sei sicuro di voler eliminare questo elemento?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="confirm()">Procedi</button>
    </div>
  `,
})
export class ModalConfirmation {
  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close(true);  // Conferma
  }

  close() {
    this.activeModal.dismiss(false);  // Annulla
  }
}
