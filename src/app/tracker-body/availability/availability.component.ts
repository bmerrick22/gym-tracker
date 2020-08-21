import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {

  @ViewChild("checkResponse") response: ElementRef;
  introText: string = "Your selected time slot is: ";
  responseText: string = "Available";
  checkData: number = 1;

  constructor() {
  }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // this.createResponse();
  }

  setColor($event){
    console.log(event);
  }


  createResponse() {
    switch (this.checkData) {
      case 0:
        this.response.nativeElement.style.color = '#98FB98';
        this.responseText = "Available";
        break;
      case 1:
        this.response.nativeElement.style.color = 'red';
        this.responseText = "Not Available";
        break;
      case 2:
        this.response.nativeElement.style.color = 'yellow';
        this.responseText = "Not Available...but it will be"
        break;
      default:
        this.response.nativeElement.style.color = 'white';
        this.responseText = "Please Choose a Time and Date."
        break;
    }

  }

}
