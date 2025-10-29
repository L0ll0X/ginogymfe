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
        
    })
      ).subscribe();
  }

  private populateForm(user: Utente) {
    if (!!user) {
      this.userForm = this.fb.group({
        name: [user.name , Validators.required],
        lastName: [user.lastName, Validators.required],
        email: [user.email, [Validators.required, Validators.email]],
        username: [user.username, [Validators.required]],
        password: [user.password, [Validators.required, Validators.minLength(8)]],
        roles: [user.roles, Validators.required],
        cellulare:[user.cellulare, Validators.required]

      });
    } else {
      this.userForm = this.fb.group({
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        roles: ['', Validators.required],
        cellulare:['', Validators.required]
      });
    }
  }

   onSubmit(): void {
    // if (this.userForm.valid) {
      const nuovoUtente = new Utente({
        id:0,
        name: this.userForm.value.name,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        username: this.userForm.value.username,
        password: this.userForm.value.password,
        cellulare: this.userForm.value.cellulare,
        roles: [this.userForm.value.roles] // 🔹 array di ruoli
      });

      this.userService.create$(nuovoUtente).subscribe({
        next: (response) => {
          console.log('Registrazione completata:', response);
          alert('Registrazione completata! Ora puoi accedere.');
          this.router.navigate(['/login']); // 👈 torna al login
        },
        error: (err) =>{
          console.error('Errore durante la registrazione :', err);
        alert('Errore durante la registrazione. Riprova'); 
        }
        });
    // } else {
    // this.userForm.markAllAsTouched();
    // }
  }

  goBack(): void {
    this.router.navigate(['/utenti']);
  }
  
}
