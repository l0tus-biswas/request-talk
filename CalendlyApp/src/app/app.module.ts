import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CommonNavbarComponent } from './components/common-navbar/common-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { EventTypesComponent } from './components/event-types/event-types.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { AvailabilityComponent } from './components/availability/availability.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditEventTypeComponent } from './components/edit-event-type/edit-event-type.component';
import { EditAvailabilityComponent } from './components/edit-availability/edit-availability.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { ProfileBookingComponent } from './components/profile-booking/profile-booking.component';
import { EventBookingComponent } from './components/event-booking/event-booking.component';
import { SuccessBookingComponent } from './components/success-booking/success-booking.component';
import { ImgurApiService } from './components/settings/imgur-api.service';
import { SendResetPasswordMailComponent } from './components/send-reset-password-mail/send-reset-password-mail.component';
import { GoogleCalendarIntregrationComponent } from './components/google-calendar-intregration/google-calendar-intregration.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CommonNavbarComponent,
    HomeComponent,
    EventTypesComponent,
    BookingsComponent,
    AvailabilityComponent,
    SettingsComponent,
    EditEventTypeComponent,
    EditAvailabilityComponent,
    ProfileBookingComponent,
    EventBookingComponent,
    SuccessBookingComponent,
    SendResetPasswordMailComponent,
    GoogleCalendarIntregrationComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgToastModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ImgurApiService],
  bootstrap: [AppComponent],
})
export class AppModule { }
