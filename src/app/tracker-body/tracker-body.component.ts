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
      Welcome to Irish GymSense! IGS tracks the availability of work out slots for the Smith Center Gym in the Duncan Student Center. 
      Must be a member of the ND community, and only one email notification per person. If you like my work, support me with a beer  :)
    `;
    //Assign the variables to the bound html content
    this.textHeader = header;
    this.textBody = body;
  }


}
