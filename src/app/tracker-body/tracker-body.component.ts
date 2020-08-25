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
    let header:string = "Welcome!";
    let body:string = `Are you struggling to sign up for the a gym slot at the Smith Center? Well you
    have come to the right place! My name is Ben and I developed this website to track the availability of
    workout times at the Smith Center and notify you if and when the desired is open. Enter the date, pick 
    a time range, and then check it's availability! 
    `;
    //Assign the variables to the bound html content
    this.textHeader = header;
    this.textBody = body;
  }


}
