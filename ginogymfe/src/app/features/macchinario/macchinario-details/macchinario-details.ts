import { Component, OnInit } from '@angular/core';
import { MacchinarioService } from '../services/macchinario.service';
import { Macchinario } from '../models/macchinario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-macchinario-details',
  standalone: false,
  templateUrl: './macchinario-details.html',
  styleUrl: './macchinario-details.css'
})
export class MacchinarioDetails implements OnInit {

  macchinario!: Macchinario;

  constructor(
    private macchinarioService: MacchinarioService,
    private router: Router,
    private acRoute: ActivatedRoute
  ) {
    this.macchinario = {} as Macchinario;
  }

  ngOnInit(): void {
    this.acRoute.data.pipe(
      tap(({ macchinario }) => {
        if (macchinario) {
          this.macchinario = macchinario;
        }
      })
    ).subscribe();
  }

  goBack() {
    this.router.navigate(['/macchinari']);
  }

  /** 📸 Metodo per caricare immagine e convertirla in Base64 */
  async onFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.toBase64(file).then((value: string) => {
      this.macchinario.imageBase64 = value.split(',')[1];
    });


  }

  toBase64 = async (file: File | Blob) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

  /** 💾 Salva o modifica macchinario */
  submit() {
    if (this.macchinario.id) {
      this.macchinarioService.put$(this.macchinario).subscribe({
        next: (response) => {
          console.log('Modifica avvenuta con successo', response);
          this.router.navigate(['/macchinari']);
        },
        error: (error) => {
          console.error('Modifica fallita', error);
        },
      });
    } else {
      this.macchinarioService.create$(this.macchinario).subscribe({
        next: (response) => {
          console.log('Creazione avvenuta con successo', response);
          this.router.navigate(['/macchinari']);
        },
        error: (error) => {
          console.error('Creazione fallita', error);
        }
      });
    }
  }

}
