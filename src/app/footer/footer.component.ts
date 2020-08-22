import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  goldenDome: string = "assets/images/golden-dome.png";
  buyMeCoffeeLink:string="https://www.buymeacoffee.com/bmerrick";
  constructor() { }

  ngOnInit(): void {
  }

}
