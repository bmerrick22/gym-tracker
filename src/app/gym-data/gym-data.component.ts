import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-gym-data',
  templateUrl: './gym-data.component.html',
  styleUrls: ['./gym-data.component.css']
})
export class GymDataComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  
  ngOnInit() {
    this.httpClient.get("assets/data.json").subscribe(data => {
      console.log(data);
    })
  }
}
