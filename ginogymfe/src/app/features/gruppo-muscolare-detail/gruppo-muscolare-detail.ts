import { Component } from '@angular/core';
import { GruppoMuscolare } from './models/gruppo-muscolare';
import { GruppoMuscolareService } from './service/gruppo-muscolare.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gruppo-muscolare',
  standalone: false,
  templateUrl: './gruppo-muscolare-detail.html',
  styleUrl: './gruppo-muscolare-detail.css'
})

export class GruppoMuscolareDetail {

  model = new GruppoMuscolare()

  constructor(private gruppiMuscolariService: GruppoMuscolareService, private router: Router) {

  }

  ngOnInit(): void {
  
  }

  goBack() {
  this.router.navigate(['./home']);
}

  submit() {
    this.gruppiMuscolariService.create$(this.model)
  }


}
