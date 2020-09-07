import { Component, OnInit } from '@angular/core';
import { faClock, faCheckCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-email-success',
  templateUrl: './email-success.component.html',
  styleUrls: ['./email-success.component.css']
})
export class EmailSuccessComponent implements OnInit {
  emailSuccessIcon = faCheckCircle;
  constructor() { }

  ngOnInit(): void {
  }

}
