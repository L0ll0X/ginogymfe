/// <reference types="@angular/localize" />
//import 'zone.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app-module';
import { error } from 'console';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
