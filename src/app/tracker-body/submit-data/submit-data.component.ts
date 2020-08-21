import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-submit-data',
  templateUrl: './submit-data.component.html',
  styleUrls: ['./submit-data.component.css']
})
export class SubmitDataComponent implements OnInit {
  REST_API_SERVER = "https://gym-tracker-ben.uc.r.appspot.com";
  timeSlots = [];
  submitInfo: FormGroup;
  timeEntry: string;
  dateEntry: string;
  submitted = false;

  introText: string = "Your selected time slot is: ";
  responseText: string = "Available";
  checkData: number = 2;
  @ViewChild("checkResponse") response: ElementRef;
  @ViewChild("responseContainer") responseContainer: ElementRef;



  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getSlotData();
  }


  public getSlotData() {
    //Set the headers for the the API
    const headers = {
      "accept": "application/json",
      "content-type": "application/json"
    }
    //Retrieve the data from the API
    this.httpClient.get<any>(this.REST_API_SERVER + '/data', { headers }).subscribe(data => {
      console.log(data);      //Print data
      for (let entry of data) {this.timeSlots.push(entry.time)}
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
    this.creatResponse();
    this.postSlotData();
  }

  creatResponse() {
    let color:string;
    this.responseContainer.nativeElement.style.display = 'flex';
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
     //Assign the color
     this.response.nativeElement.style.color = color;
  }


}
