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
      Welcome to Irish GymSense! IGS tracks the availability of workout slots at the Smith Center Gym in the Duncan Student Center. 
      IGS limits users to only one email notification per week and is only available to members of the Notre Dame community.
      If you like my work, support me with a beer  :)
    `;
    //Assign the variables to the bound html content
    this.textHeader = header;
    this.textBody = body;
  }


}
