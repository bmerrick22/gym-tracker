import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,} from '@angular/forms';

@Component({
  selector: 'app-submit-data',
  templateUrl: './submit-data.component.html',
  styleUrls: ['./submit-data.component.css']
})
export class SubmitDataComponent implements OnInit {
  @ViewChild('date') dateForm;

  REST_API_SERVER = 'http://127.0.0.1:8080/';
  //'http://127.0.0.1:8080/';
  //"https://gym-tracker-ben.uc.r.appspot.com";
  timeSlots = [];
  submitInfo: FormGroup;
  timeEntry: string;
  dateEntry: string;
  emailEntry: string;
  submitted = false;

  introText: string = "Your selected time slot is: ";
  responseText: string = "";
  checkData: number;
  smithCenterLink: string = "https://recregister.nd.edu/Program/GetProgramDetails?courseId=8f5a4077-925d-454f-8cc6-6bed8e1dfc97&semesterId=00000000-0000-0000-0000-000000000000";
  validDate: boolean = true;
  showAvailability: boolean = false;
  emailAvailability: boolean = false;
  emailText:string;

  constructor(private httpClient: HttpClient) { 
    this.createText();
  }


  ngOnInit(): void { }

  ngAfterViewInit() { }

  createText(){
    let header:string = "Your workout slot is currently not available! Enter your email below to be notified when it is."
    this.emailText = header;
  }
  public validateDate() {
    //Check for valid date
    this.getTimes();

  }

  public getTimes() {
    //Create body of POST request
    let postData = {
      date: this.dateEntry
    }
    //Retrieve the data from the API
    this.httpClient.post<any>(this.REST_API_SERVER + "/api/retrieve-times", postData).subscribe(data => {
      console.log(data);
      if (data["times"].length == 0) {
        console.log('No Dates Available yet')
        this.emailAvailability = true;
      } else {
        this.emailAvailability = false;
        this.timeSlots = data["times"];
      }
    });
  }


  public postSlotData() {
    //Create body of POST request
    let postData = {
      day: this.dateEntry,
      time: this.timeEntry
    }
    //Retrieve the data from the API
    this.httpClient.post<any>(this.REST_API_SERVER + "/api/time-slot-check", postData).subscribe(data => {
      console.log(data);
      this.checkData = data["availability"];
      this.createResponse();
    });
  }

  public onSubmit() {
    this.submitted = true;
    this.showAvailability = true;
    this.postSlotData();
  }

  public createResponse() {
    switch (this.checkData) {
      case 0:
        this.responseText = "Available";
        break;
      case 1:
        this.responseText = "Not Available";
        break;
      case 2:
        this.responseText = "Not Yet Available"
        break;
      default:
        this.responseText = "Please Choose a Time and Date."
        break;
    }
  }


  onEmailSubmit() {
    //Create body of POST request
    let postData = {
      email: this.emailEntry
    }
    //Retrieve the data from the API
    this.httpClient.post<any>(this.REST_API_SERVER + "/api/sign-up", postData).subscribe(data => {
      console.log(data);
    });
  }



}
