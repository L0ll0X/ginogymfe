import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtenteService } from '../services/utente.service';

@Component({
  selector: 'app-aggiungi-utente',
  templateUrl: './aggiungi-utente.component.html',
  styleUrls: ['./aggiungi-utente.component.css']
})
export class AggiungiUtenteComponent implements OnInit {
  userForm!: FormGroup;
  submitting = false;
  isEditMode = false; // ✅ indica se siamo in modalità "modifica"
  userId?: number;

  constructor(
    private fb: FormBuilder,
    private userService: UtenteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ✅ inizializza il form
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['UTENTE', Validators.required]
    });

    // ✅ controlla se è modalità "modifica"
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.userId = +id;
        this.caricaDatiUtente(+id);
      }
    });
  }

  // ✅ carica i dati utente nel form (solo in modalità modifica)
  caricaDatiUtente(id: number): void {
    this.userService.getUserById$(id).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        });
        // la password la lasciamo vuota
        this.userForm.get('password')?.setValue('');
      },
      error: (err) => {
        console.error('Errore nel caricamento utente:', err);
        alert('Errore nel caricamento utente.');
      }
    });
  }

  // ✅ invia il form
  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const payload = this.userForm.value;

    if (this.isEditMode && this.userId) {
      // modalità MODIFICA
      this.userService.update$(this.userId, payload).subscribe({
        next: () => {
          alert('Utente modificato con successo!');
          this.router.navigate(['/utenti']);
        },
        error: (err) => {
          this.submitting = false;
          console.error('Errore modifica:', err);
          alert('Errore durante la modifica.');
        }
      });
    } else {
      // modalità AGGIUNTA
      this.userService.create$(payload).subscribe({
        next: () => {
          alert('Utente creato con successo!');
          this.router.navigate(['/utenti']);
        },
        error: (err) => {
          this.submitting = false;
          console.error('Errore creazione:', err);
          alert('Errore durante la creazione.');
        }
      });
    }
  }

  // ✅ bottone "Torna alla lista"
  tornaAllaLista(): void {
    this.router.navigate(['/utenti']);
  }
}
