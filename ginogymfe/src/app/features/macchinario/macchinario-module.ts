import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MacchinarioDetails } from './macchinario-details/macchinario-details';
import { Macchinari } from './macchinari';
import { MacchinarioResolver } from './services/macchinario.resolver';


@NgModule({
  declarations: [
   Macchinari,
  MacchinarioDetails
  ],
  imports: [
    
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: Macchinari,
        
      },
          {
            path: 'details',
            component: MacchinarioDetails,
            resolve: {macchinario: MacchinarioResolver}
    
          },
           {
        path: 'details/:id', 
        component: MacchinarioDetails,
        resolve: { macchinario: MacchinarioResolver }
      }
        
    ]),
    HttpClientModule,
    NgbModule,
    FormsModule

  ],
  providers: [

  ]
})
export class MacchinarioModule { }
