import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
 
  visibility: BehaviorSubject<boolean>;
 
  constructor() { this.visibility = new BehaviorSubject(false); }
  show() { this.visibility.next(true); }
  hide() { this.visibility.next(false); }
}

//tutorial followed by On The Code artice by Umut Esen