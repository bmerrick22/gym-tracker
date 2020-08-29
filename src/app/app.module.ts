import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TrackerBodyComponent } from './tracker-body/tracker-body.component';
import { SubmitDataComponent } from './tracker-body/submit-data/submit-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    AppComponent,
    TrackerBodyComponent,
    SubmitDataComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
