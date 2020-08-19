import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tracker-body',
  templateUrl: './tracker-body.component.html',
  styleUrls: ['./tracker-body.component.css']
})
export class TrackerBodyComponent implements OnInit {
  textHeader:string;
  textBody:string;
  goldenDome:string = "assets/images/golden-dome.png";
  REST_API_SERVER = "https://gym-tracker-ben.uc.r.appspot.com/data";

  constructor(private httpClient: HttpClient) { 
    this.buildText();
    
  }

  ngOnInit(): void {
    this.getSlotData();
  }

  public getSlotData(){
    //Set the headers for the the API
    const headers = {
      "accept": "application/json",
      "content-type":"application/json"
    }
    //Retrieve the data from the API
    this.httpClient.get<any>(this.REST_API_SERVER, {headers}).subscribe(info => {
            console.log(info);
        });
  }

  buildText(){
    //Set temporary variables for the strings
    let header:string = "Welcome!";
    let body:string = `Are you struggling to sign up for the a gym slot at the Smitch Center? Well you
    have come to the right place! My name is Ben and I developed this website to track the availability of
    workout times at the Smitch Center and notify you if and when the desired is open. Enter the date, pick 
    a time range, and then check it's availability! 
    `;
    //Assign the variables to the bound html content
    this.textHeader = header;
    this.textBody = body;
  }

}
