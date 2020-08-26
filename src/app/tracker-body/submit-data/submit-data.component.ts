import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

function emailDomainValidator(control: FormControl) {
  let email = control.value;
  if (email && email.indexOf("@") != -1) {
    let [_, domain] = email.split("@");
    if (domain !== "nd.edu") {
      return {
        emailDomain: {
          parsedDomain: domain
        }
      }
    }
  }
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
  submittedDate: boolean = false;
  emailNotify = false;
  spotsAvailable = false;
  noSpots = false;

  REST_API_SERVER = 'http://127.0.0.1:8080/';
  //'http://127.0.0.1:8080/';
  //"https://gym-tracker-ben.uc.r.appspot.com";
  timeSlots = [];

  introText: string = "Your selected time slot is: ";
  responseText: string = "";
  smithCenterLink: string = "https://recregister.nd.edu/Program/GetProgramDetails?courseId=8f5a4077-925d-454f-8cc6-6bed8e1dfc97&semesterId=00000000-0000-0000-0000-000000000000";
  emailText: string;

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
    //Update variables
    this.submittedDate = true;
    this.timeSlots = [];
    this.emailNotify = false;
    this.spotsAvailable = false;

    //Create body of POST request
    let postData = {
      date: this.date.value
    }
    //Retrieve the data from the API
    this.httpClient.post<any>(this.REST_API_SERVER + "/api/retrieve-times", postData).subscribe(data => {
      console.log(data);
      if (data["times"] === "email") {
        this.emailNotify = true;
      } else if (data["times"].length == 0) {
        this.noSpots = true;
      } else {
        this.spotsAvailable = true;
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
    this.httpClient.post<any>(this.REST_API_SERVER + "/api/sign-up", postData).subscribe(data => {
      console.log(data);
    });
  }

  createFormControls() {
    this.date = new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{4}-[0-9]{2}-[0-9]{2}')
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



}
