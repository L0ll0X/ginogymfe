import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Utente } from '../models/utenti.model';
import { UtenteService } from '../services/utente.service';

@Component({
  selector: 'app-utente-detail',
  standalone: false,
  templateUrl: './utente-detail.html',
  styleUrl: './utente-detail.css'
})
export class UtenteDetail {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private acRoute: ActivatedRoute, private userService: UtenteService) { }

  ngOnInit(): void {
    this.acRoute.data.pipe(
      tap(({ user }) => {
        this.populateForm(user);
      })
    ).subscribe();
  }

  private populateForm(user: Utente) {
    if (!!user) {
      this.userForm = this.fb.group({
        firstName: [user.firstName , Validators.required],
        lastName: [user.lastName, Validators.required],
        email: [user.email, [Validators.required, Validators.email]],
        password: [user.password, [Validators.required, Validators.minLength(8)]],
        role: ['utenti', Validators.required]
      });
    } else {
      this.userForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        role: ['utenti', Validators.required]
      });
    }

  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form valido. Dati pronti per il backend:', this.userForm.value);
      this.userService.create$(new Utente({
        firstName:this.userForm.controls['firstName'].value, 
        lastName:this.userForm.controls['lastName']?.value,  
        email:this.userForm.controls['email'].value, 
        password:this.userForm.controls['password'].value, 
        role:this.userForm.controls['role'].value
      }))
      .subscribe()
    } else {
      console.log('Form non valido. Compila tutti i campi richiesti.');
      this.userForm.markAllAsTouched();

    }
  }
}
