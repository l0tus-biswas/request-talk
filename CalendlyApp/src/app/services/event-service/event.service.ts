import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IAvailibility } from 'src/app/interface/availibility';
import { IEvents } from 'src/app/interface/events';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }


  getAllAvaibility(userId: number, usertoken: string): Observable<IAvailibility[]> {
    return this.http.get<IAvailibility[]>("https://localhost:44305/api/Calendly/GetAllAvaibility?userId=" + userId + "&usertoken=" + usertoken).pipe(catchError(this.errorHandler));
  }

  getAllEvents(userId: number, usertoken: string): Observable<IEvents[]> {
    return this.http.get<IEvents[]>("https://localhost:44305/api/Calendly/GetAllEvents?userId=" + userId + "&usertoken=" + usertoken).pipe(catchError(this.errorHandler));
  }

  getEventById(userId: number, usertoken: string, eventId: number): Observable<IEvents[]> {
    return this.http.get<IEvents[]>("https://localhost:44305/api/Calendly/GetEventById?userId=" + userId + "&usertoken=" + usertoken + "&eventId=" + eventId).pipe(catchError(this.errorHandler));
  }

  addNewEvent(userId: number, userToken: string, title: string, url: string, length: number, availabilityId: number, description: string, location: string): Observable<boolean> {
    return this.http.post<boolean>("https://localhost:44305/api/Calendly/AddNewEvent", {
      userId: userId,
      userToken: userToken,
      title: title,
      url: url,
      length: length,
      availabilityId: availabilityId,
      description: description,
      location: location
    }).pipe(catchError(this.errorHandler));
  }

  updateEvent(eventId: number, userId: number, userToken: string, title: string, description: string, location: string,
    url: string, length: number, availabilityId: number, eventName: string, optInBooking: string, disableGuests: string, hideEventType: string, timeSlotIntervals: number): Observable<boolean> {
    console.log(eventId, userId, userToken, title, description, location, url, length, availabilityId, eventName, optInBooking, disableGuests,hideEventType, timeSlotIntervals);
   
    return this.http.put<boolean>("https://localhost:44305/api/Calendly/UpdateEventDetails", {
      eventId: eventId,
      userId: userId,
      userToken: userToken,
      title: title,
      description: description,
      location: location,
      url: url,
      length: length,
      availabilityId: availabilityId,
      eventName: eventName,
      optInBooking: optInBooking,
      disableGuests: disableGuests,
      hideEventType: hideEventType,
      timeSlotIntervals: timeSlotIntervals

    }).pipe(catchError(this.errorHandler));
  }


  deleteEvent(userId: number, usertoken: string, eventId: number): Observable<boolean> {
    return this.http.delete<boolean>("https://localhost:44305/api/Calendly/DeleteEventById?userId=" + userId + "&usertoken=" + usertoken + "&eventId=" + eventId).pipe(catchError(this.errorHandler))
  }
  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }

}
