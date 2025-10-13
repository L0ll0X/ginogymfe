import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-utente-detail',
  standalone: false,
  templateUrl: './utente-detail.html',
  styleUrl: './utente-detail.css'
})
export class UtenteDetail {
userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

ngOnInit(): void {
  this.userForm = this.fb.group({
    firstName: ['', Validators.required],
     lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['utenti', Validators.required] 
  });
}
onSubmit(): void {
  if (this.userForm.valid)  {
 console.log('Form valido. Dati pronti per il backend:', this.userForm.value);
    } else {
      console.log('Form non valido. Compila tutti i campi richiesti.');
      this.userForm.markAllAsTouched();

  }
 }
}
