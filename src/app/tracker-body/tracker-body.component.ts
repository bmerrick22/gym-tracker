import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-tracker-body',
  templateUrl: './tracker-body.component.html',
  styleUrls: ['./tracker-body.component.css']
})
export class TrackerBodyComponent implements OnInit {
  timeSlots = [];
  textHeader:string;
  textBody:string;

  constructor() { 
    this.buildText();
  }

  ngOnInit(): void {}

  buildText(){
    //Set temporary variables for the strings
    let header:string = "Irish GymSense";
    let body:string = ` 
      Welcome to Irish GymSense! Irish GymSense tracks the availability for work out slots at the Smith Center. 
      Only ND emails are allowed and only email notification per person. If you like my work, support me with a beer :)
    `;
    //Assign the variables to the bound html content
    this.textHeader = header;
    this.textBody = body;
  }


}
