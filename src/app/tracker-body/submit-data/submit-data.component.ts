import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-submit-data',
  templateUrl: './submit-data.component.html',
  styleUrls: ['./submit-data.component.css']
})
export class SubmitDataComponent implements OnInit {
  REST_API_SERVER = 'http://127.0.0.1:8080/';
  //'http://127.0.0.1:8080/';
  //"https://gym-tracker-ben.uc.r.appspot.com";
  timeSlots = [];
  submitInfo: FormGroup;
  timeEntry: string;
  dateEntry: string;
  submitted = false;
  test:boolean = true;

  introText: string = "Your selected time slot is: ";
  responseText: string = "Available";
  checkData: number = 2;
  smithCenterLink:string = "https://recregister.nd.edu/Program/GetProgramDetails?courseId=8f5a4077-925d-454f-8cc6-6bed8e1dfc97&semesterId=00000000-0000-0000-0000-000000000000";

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getTimeData();
  }


  public getTimeData() {
    //Set the headers for the the API
    const headers = {
      "accept": "application/json",
      "content-type": "application/json"
    }
    //Retrieve the data from the API
    this.httpClient.get<any>(this.REST_API_SERVER + '/time-data', { headers }).subscribe(data => {
      console.log(data);      //Print data
      for (let entry of data["time-slots"]) {this.timeSlots.push(entry)}
    });
  }


  public postSlotData() {
    //Create body of POST request
    let postData = {
      day: this.dateEntry,
      time: this.timeEntry
    }
    //Retrieve the data from the API
    this.httpClient.post<any>(this.REST_API_SERVER + "/time-slot-check", postData).subscribe(data => {
      console.log(data);
      this.checkData = data["availability"];
      this.creatResponse();      
    });
  }


  onSubmit() {
    this.submitted = true;
   //this.creatResponse();
    this.postSlotData();
  }

  creatResponse() {
    let color:string;
    switch (this.checkData) {
      case 0:
        color = '#98FB98';
        this.responseText = "Available";
        break;
      case 1:
        color = 'red';
        this.responseText = "Not Available";
        break;
      case 2:
        color = 'yellow';
        this.responseText = "Not Yet Available"
        break;
      default:
        color = 'white';
        this.responseText = "Please Choose a Time and Date."
        break;
    }
     //Change HTML elements
     //this.response.nativeElement.style.color = color;
  }


}
