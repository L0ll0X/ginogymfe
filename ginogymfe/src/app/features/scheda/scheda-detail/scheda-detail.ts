import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchedaModel } from '../models/scheda.model';
import { SchedaService } from '../services/scheda.service';
@Component({
  standalone:false,
  selector: 'app-scheda',
  templateUrl: './scheda-detail.html',
  styleUrls: ['./scheda-detail.css']
})
export class SchedaDetail implements OnInit {
  scheda = new SchedaModel();

  constructor(
    private route: ActivatedRoute,
    private schedaService: SchedaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.schedaService.getById(+id).subscribe(data => this.scheda = data);
    }
  }

  submit() {
    console.log('Submit cliccato', this.scheda);
    if (this.scheda.id) {
      this.schedaService.put$(this.scheda).subscribe(() => alert('Scheda aggiornata!'));
    } else {
      this.schedaService.create$(this.scheda).subscribe(() => alert('Scheda creata!'));
    }
  }

  goBack() {
    window.history.back();
  }
}
