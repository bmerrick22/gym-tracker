import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../../../spinner/loader.service';
import {
  FormGroup,
  FormControl,
  Validators
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

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})

export class EmailComponent implements OnInit {
  @Input() signupForm: FormGroup;
  @Input() date: FormControl;
  @Input() api: string;
  @Output() emailSuccessEvent = new EventEmitter<boolean>();
  @Output() displayOptionEvent = new EventEmitter<number>();
  email: FormControl;
  emailExists: boolean = false;
  emailConfirmed: boolean = false;
  clicked: boolean = false;
  emailIcon = faClock;
  emailText: string = "No times listed yet! Enter email to receive a notification when slots are available.";
  showEmailInput: boolean = false;
  showSpinner = this.loadService.visibility;

  constructor(private httpClient: HttpClient, private loadService: LoaderService) {
  }

  ngOnInit(): void {
    this.createEmailControl();
  }

  createEmailControl() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*"),
      emailDomainValidator
    ]);

    this.signupForm.addControl("email", this.email);
  }

  createText() {
    let header: string = "Your workout slot is currently not available! Enter your email below to be notified when it is."
    this.emailText = header;
  }

  emailSubmit() {
    //Create body of POST request
    let postData = {
      email: this.email.value,
      date: this.date.value
    }
    //Retrieve the data from the API
    this.httpClient.post<any>(this.api + "/api/sign-up", postData).subscribe(data => {
      console.log(data);
      if (data["status"] == "failure") {  //Email exists in database
        this.emailExists = true;
        this.emailConfirmed = false;
      } else {                            //New user in data base
        this.emailExists = false;     
        this.emailConfirmed = true;    
        this.emailSuccessEvent.emit(this.emailConfirmed);
      }
    });
  }

  resetSubmittedEmail(){
    console.log(this.email.errors)
    this.clicked = false;
    this.emailExists = false;
    this.emailConfirmed = false;
  }

}
