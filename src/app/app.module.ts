import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TrackerBodyComponent } from './tracker-body/tracker-body.component';
import { SubmitDataComponent } from './tracker-body/submit-data/submit-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmailComponent } from './tracker-body/submit-data/email/email.component';
import { EmailSuccessComponent } from './tracker-body/submit-data/email/email-success/email-success.component';


@NgModule({
  declarations: [
    AppComponent,
    TrackerBodyComponent,
    SubmitDataComponent,
    FooterComponent,
    EmailComponent,
    EmailSuccessComponent,
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
