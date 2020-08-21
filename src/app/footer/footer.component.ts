import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  goldenDome: string = "assets/images/golden-dome.png";
  constructor() { }

  ngOnInit(): void {
  }

}
