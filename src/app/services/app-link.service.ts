import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppLink } from '../models/app-link.model';
import * as links from '../../assets/data/links.json';

@Injectable({
  providedIn: 'root'
})
export class AppLinkService {

  constructor() { }

  get(): Observable<AppLink[]> {    
    let links$ = of(JSON.parse(JSON.stringify(links)));
    return links$;
  }
}
