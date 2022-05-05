import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IAvailibility } from 'src/app/interface/availibility';
import { IBooking } from 'src/app/interface/booking';
import { IEvents } from 'src/app/interface/events';
import { IUsers } from 'src/app/interface/users';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  publicgetUserData(userName: string): Observable<IUsers[]> {
    return this.http.get<IUsers[]>("https://appointly.azurewebsites.net/api/Calendly/PublicgetUserData?userName=" + userName ).pipe(catchError(this.errorHandler));
  }

  publicgetAvaibilityData(userId: number, availId: number): Observable<IAvailibility[]> {
    return this.http.get<IAvailibility[]>("https://appointly.azurewebsites.net/api/Calendly/PublicgetAvaibilityData?userId=" + userId + "&avaibilityId=" + availId).pipe(catchError(this.errorHandler));
  }

  publicgetEventData(userId: number, url: string): Observable<IEvents[]> {
    return this.http.get<IEvents[]>("https://appointly.azurewebsites.net/api/Calendly/PublicgetEventData?userId=" + userId + "&url=" + url).pipe(catchError(this.errorHandler));
  }

  getAllBookings(userName: string): Observable<IBooking[]> {
    return this.http.get<IBooking[]>("https://appointly.azurewebsites.net/api/Calendly/GetAllBooking?userName=" + userName ).pipe(catchError(this.errorHandler));
  }

  addNewBooking(username: string, eventId: number, eventName: string,  bookedTime:string,  appointmentUsername :string,  appointmentUserPhoneNumber:string,  appointmentUserEmail:string,  appointmentGuestEmail:string,  additionalNotes:string,sendConfirmationMail: string, bookingstatus: string): Observable<boolean> {
    return this.http.post<boolean>("https://appointly.azurewebsites.net/api/Calendly/AddNewBooking", {
      bookedUser: username,
      bookedEventId: eventId,
      bookedEventName: eventName,
      bookedTime: bookedTime,
      appointmentBookedUsername: appointmentUsername,
    appointmentBookedPhoneNumber: appointmentUserPhoneNumber,
    appointmentBookedEmail: appointmentUserEmail,
    appointmentGuestEmail: appointmentGuestEmail,
    additionalNotes:additionalNotes,
    sendConfirmationMail:sendConfirmationMail,
    bookingstatus: bookingstatus
    }).pipe(catchError(this.errorHandler));
  }

  sendMail( appointWith: string, appointWithEmail: string, eventSummary: string,dateEvent: string, time:string, timezone: string, location: string, eventAttendee:string,eventAttendeeEmail:string, eventDesc:string): Observable<any> {
  
    return this.http.get<any>("https://mail-backend.onrender.com/sendmail?appointWith=" + appointWith + "&appointWithEmail=" +appointWithEmail + "&eventSummary="+eventSummary + "&dateEvent=" +dateEvent + "&time="+time+ "&timezone=" +timezone + "&location="+location+"&eventAttendee="+eventAttendee+ "&eventAttendeeEmail=" + eventAttendeeEmail + "&eventDesc="+eventDesc).pipe(catchError(this.errorHandler));
  }

  updateConfirmationOnMailSentEvent( bookedUser: string, bookingId:number): Observable<boolean>  {

    return this.http.put<boolean>("https://appointly.azurewebsites.net/api/Calendly/ConfirmationMailMeeting", {
      bookedUser: bookedUser,
      bookingId: bookingId
    }).pipe(catchError(this.errorHandler));
}


  updateBookingOnConfirm( bookedUser: string, bookingId:number): Observable<boolean>  {

    return this.http.put<boolean>("https://appointly.azurewebsites.net/api/Calendly/BookingOnConfirm", {
      bookedUser: bookedUser,
      bookingId: bookingId
    }).pipe(catchError(this.errorHandler));
}

updateBookingOnReject( bookedUser: string, bookingId:number): Observable<boolean>  {

  return this.http.put<boolean>("https://appointly.azurewebsites.net/api/Calendly/BookingOnReject", {
    bookedUser: bookedUser,
    bookingId: bookingId
  }).pipe(catchError(this.errorHandler));
}
updateBookingOnReschedule( bookedUser: string, bookingId:number): Observable<boolean>  {

  return this.http.put<boolean>("https://appointly.azurewebsites.net/api/Calendly/BookingOnReschedule", {
    bookedUser: bookedUser,
    bookingId: bookingId
  }).pipe(catchError(this.errorHandler));
}
updateBookingOnComplete( bookedUser: string, bookingId:number): Observable<boolean>  {

  return this.http.put<boolean>("https://appointly.azurewebsites.net/api/Calendly/BookingOnComplete", {
    bookedUser: bookedUser,
    bookingId: bookingId
  }).pipe(catchError(this.errorHandler));
}

updateBookingOnCancel( bookedUser: string, bookingId:number): Observable<boolean>  {

  return this.http.put<boolean>("https://appointly.azurewebsites.net/api/Calendly/BookingOnCancel", {
    bookedUser: bookedUser,
    bookingId: bookingId
  }).pipe(catchError(this.errorHandler));
}

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}
