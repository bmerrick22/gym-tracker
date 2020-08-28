import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'Smitch Center Tracker';
  skyLine:string = "assets/images/skyline.jpg";
  constructor(){

  }
}
