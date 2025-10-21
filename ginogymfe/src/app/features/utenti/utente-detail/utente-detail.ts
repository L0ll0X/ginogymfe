import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Utente } from '../models/utenti.model';
import { UtenteService } from '../services/utente.service';

@Component({
  selector: 'app-utente-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './utente-detail.html',
  styleUrls: ['./utente-detail.css']
})
export class UtenteDetailComponent {
  userForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private acRoute: ActivatedRoute,
    private userService: UtenteService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['utenti', Validators.required]
    });

    this.acRoute.data
      .pipe(tap(({ user }) => this.populateForm(user)))
      .subscribe();
  }

  private populateForm(user: Utente): void {
    if (user) this.userForm.patchValue(user);
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      console.log('Form non valido. Compila tutti i campi richiesti.');
      return;
    }

    const nuovoUtente = new Utente(this.userForm.value);

    this.userService.create$(nuovoUtente).subscribe({
      next: (response) => {
        console.log('✅ Utente creato con successo:', response);
        alert('✅ Utente creato con successo!');
        this.userForm.reset();
      },
      error: (err) => {
        console.error('❌ Errore durante la creazione utente:', err);
        alert('❌ Errore durante la creazione dell’utente. Controlla la console.');
      }
    });
  }
}
