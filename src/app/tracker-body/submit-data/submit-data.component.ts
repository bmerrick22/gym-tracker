import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faCalendarTimes } from '@fortawesome/free-regular-svg-icons';
import { LoaderService } from '../../spinner/loader.service';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';


function dateValidator(form: FormControl) {
  if (!form.value) {
    console.log("Date not in correct format")
    return null;
  }

  let numWeeks = 1;
  let currentDate = new Date();
  let weekDate = new Date();
  weekDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  //Create the week ahead date
  weekDate.setDate(weekDate.getDate() + numWeeks * 7);

  //Set the entered date
  let dateArray = form.value.split("/");
  let month = dateArray[0] - 1;
  let date = parseInt(dateArray[1], 10);
  let year = dateArray[2];
  let enterDate = new Date(year, month, date);
  enterDate.setHours(0, 0, 0, 0);

  if (currentDate > enterDate || enterDate > weekDate) {
      return { 'dateRange': true }
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
  email: FormControl;
  time: FormControl;
  displayOption: number = -1;
  noSpotsIcon = faCalendarTimes;
  emailConfirmed: boolean = false;
  api = "https://gym-tracker-ben.uc.r.appspot.com";
  //'http://127.0.0.1:8080/';
  //"https://gym-tracker-ben.uc.r.appspot.com";
  timeSlots = [];
  noSpotsText: string;
  spotsText: string;
  smithCenterLink: string = "https://recregister.nd.edu/Program/GetProgramDetails?courseId=8f5a4077-925d-454f-8cc6-6bed8e1dfc97&semesterId=00000000-0000-0000-0000-000000000000";
  dateSubmitted:boolean = false;
  showSpinner = this.loadService.visibility;

  constructor(private httpClient: HttpClient, private loadService: LoaderService) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    this.createText();
  }

  public createText(){
    let noSpots:string = "We're sorry, but all time slots have been filled for that day.";
    let spots:string = "Select an available time slot to sign up!";
    this.noSpotsText = noSpots;
    this.spotsText = spots;

  }


  public getTimes() {
    this.dateSubmitted = true;
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

  createFormControls() {
    this.date = new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{2}/[0-9]{2}/[0-9]{4}'),
      dateValidator
    ]);
    this.time = new FormControl('', [
      Validators.required
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      slot: new FormGroup({
        date: this.date,
        time: this.time,
      }),
      signup: new FormGroup({
        //Add email in email component
      })
    });
  }

  resetDisplay() {
    console.log("Resetting display - Only showing date sign up");
    this.displayOption = -1;
    this.myform.reset();
    this.dateSubmitted = false;
  }


  hideMain(bool: boolean) {
    console.log("Confirmed email: " + bool)
    this.emailConfirmed = bool;
  }

  changeDisplay(opt: number) {
    console.log("Display option: " + opt);
    this.displayOption = opt;
  }



}
