import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

function emailDomainValidator(form: FormControl) {
  let email = form.value;
  if (email && email.indexOf("@") != -1) {
    let [_, domain] = email.split("@");
    if (domain !== "nd.edu") {
      return {
        emailDomain: { parsedDomain: domain }
      }
    }
  }
  return null;
}

function dateValidator(form: FormControl) {
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  let dateArray = form.value.split("/");
  let month = dateArray[0]-1;
  let date = parseInt(dateArray[1], 10);
  let year = dateArray[2];
  let enterDate = new Date(year, month, date);
  enterDate.setHours(0, 0, 0, 0);
  console.log(currentDate);
  console.log(enterDate);

  /*let futureArray = "2020-11-30".split("-");
  let futureYear = futureArray[0];
  let futureMonth = parseInt(futureArray[1], 10) - 1;
  let futureDay = futureArray[2];
  let futureDate = new Date(year, month, date);
  */
  if (currentDate > enterDate) { return { 'dateRange': true } }
  return null;
}

@Component({
  selector: 'app-submit-data',
  templateUrl: './submit-data.component.html',
  styleUrls: ['./submit-data.component.css']
})
export class SubmitDataComponent implements OnInit {
  myform: FormGroup;
  date: FormControl;
  time: FormControl;
  email: FormControl;
  displayOption: number = -1;
  emailExists: boolean = false;

  api = 'http://127.0.0.1:8080/';
  //'http://127.0.0.1:8080/';
  //"https://gym-tracker-ben.uc.r.appspot.com";
  timeSlots = [];
  noSpotsText: string = "We're sorry, but all time slots have been filled for that day.";
  emailText: string = "That time slot is not yet available! Enter an ND email to receive a notification when the slot is available.";
  spotsText: string = "Select an available time slot to sign up!";
  smithCenterLink: string = "https://recregister.nd.edu/Program/GetProgramDetails?courseId=8f5a4077-925d-454f-8cc6-6bed8e1dfc97&semesterId=00000000-0000-0000-0000-000000000000";

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createText() {
    let header: string = "Your workout slot is currently not available! Enter your email below to be notified when it is."
    this.emailText = header;
  }

  public getTimes() {
    //Format time
    let timeArray = this.date.value.split("/");
    let month = timeArray[0];
    let day = parseInt(timeArray[1], 10);
    let year = timeArray[2];
    let subDate = year + "-" + month + "-" + day;
    console.log(subDate);
    //Update variables
    this.timeSlots = [];

    //Create body of POST request
    let postData = {
      date: subDate
    }
    //Retrieve the data from the API
    this.httpClient.post<any>(this.api + "/api/retrieve-times", postData).subscribe(data => {
      console.log(data);
      //Sort the data
      if (data["times"] === "email") {
        console.log("Email sign up");
        this.displayOption = 2;     //We want THIRD option of EMAIL SIGNUP
      } else if (data["times"].length == 0) {
        console.log("No spots available");
        this.displayOption = 1;     //We want SECOND option of NO SPOTS
      } else if (data["times"].length > 0) {
        console.log("Spots available");
        this.displayOption = 0; //We want FIRST option of DISPLAYING TIMES
        //Push times onto time slots
        for (let time of data["times"]) { this.timeSlots.push(time) }
      }
    });
  }

  emailSubmit() {
    //Create body of POST request
    let postData = {
      email: this.email.value
    }
    //Retrieve the data from the API
    this.httpClient.post<any>(this.api + "/api/sign-up", postData).subscribe(data => {
      console.log(data);
      if (data["status"] == "failure") {
        this.emailExists = true;
      } else {
        this.emailExists = false;
        this.resetDisplay();
      }
    });
  }

  createFormControls() {
    this.date = new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{2}/[0-9]{2}/[0-9]{4}'),
      dateValidator
    ]);
    this.time = new FormControl('', [
      Validators.required
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*"),
      emailDomainValidator
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      slot: new FormGroup({
        date: this.date,
        time: this.time,
      }),
      email: this.email,
    });
  }

  resetDisplay() {
    console.log("Resetting display - Only showing date sign up");
    this.displayOption = -1;
    this.emailExists = false;
    this.myform.reset();
  }



}
