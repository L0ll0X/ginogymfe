import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Utente } from '../models/utenti.model';
import { UtenteService } from '../services/utente.service';

@Component({
  selector: 'app-utente-detail',
  standalone: false,
  templateUrl: './utente-detail.html',
  styleUrls: ['./utente-detail.css']
})
export class UtenteDetail {
  userForm!: FormGroup;
  userId?: number; //  serve per capire se è modifica o creazione
ruoloIdSelected!:number;
  constructor(
    private fb: FormBuilder,
    private acRoute: ActivatedRoute,
    private userService: UtenteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.acRoute.data
      .pipe(
        tap(({ user }) => {
          this.populateForm(user);
          if (user && user.id) {
            this.userId = user.id; //  salva l'id se è modifica
          }
        })
      )
      .subscribe();
  }

  private populateForm(user: Utente | null) {
    this.userForm = this.fb.group({
      username: [user?.username|| '', Validators.required],
      email: [user?.email || '', [Validators.required, Validators.email]],
      roles: [user?.roles || 'UTENTE', Validators.required],
      cellulare: [user?.cellulare || '', Validators.required],
    });
  
  } selectRole(event: Event) {
  const selectedValue = (event.target as HTMLSelectElement).value;
  this.userForm.patchValue({ roles: [selectedValue] }); // ← array!
}



  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      console.log('Form non valido. Compila tutti i campi richiesti.');
      return;
    }

    const utenteData = this.userForm.value;
      if (typeof utenteData.roles === 'string') {
    utenteData.roles = [utenteData.roles];
  }
    console.log(utenteData);
    if (this.userId) {
      //  Se c’è un ID, stai modificando → UPDATE
      this.userService.update$(this.userId, utenteData).subscribe({
        next: () => {
          console.log('Utente aggiornato con successo');
          this.router.navigate(['/utenti']); //  Torna alla lista
        },
        error: (err) => console.error('Errore aggiornamento utente:', err),
      });
    } else {
      //  Se NON c’è un ID, stai creando → CREATE
      this.userService.create$(utenteData).subscribe({
        next: () => {
          console.log('Utente creato con successo');
          this.router.navigate(['/utenti']); //  Torna alla lista
        },
        error: (err) => console.error('Errore creazione utente:', err),
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/utenti']);
  }
}
