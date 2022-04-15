import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IAvailibility } from 'src/app/interface/availibility';

@Injectable({
  providedIn: 'root'
})
export class AvailibilityService {

  constructor(private http: HttpClient) { }

  getAllAvaibility(userId: number, usertoken: string): Observable<IAvailibility[]> {
    return this.http.get<IAvailibility[]>("https://localhost:44305/api/Calendly/GetAllAvaibility?userId=" + userId + "&usertoken=" + usertoken).pipe(catchError(this.errorHandler));
  }

  getAvailById(userId: number, usertoken: string, availId: number): Observable<IAvailibility[]> {
    return this.http.get<IAvailibility[]>("https://localhost:44305/api/Calendly/GetAvailById?userId=" + userId + "&usertoken=" + usertoken + "&availId=" + availId).pipe(catchError(this.errorHandler));
  }

  addNewScheduleAvail(availabilityName: string, userId: number, userToken: string, timezone: string): Observable<boolean> {
    return this.http.post<boolean>("https://localhost:44305/api/Calendly/AddAvailablity", {
      userId: userId,
      userToken: userToken,
      availabilityName: availabilityName,
      timezone: timezone
    }).pipe(catchError(this.errorHandler));

  }

  updateAvail(availabilityId: number, availabilityName: string, userId: number, userToken: string, timezone: string, weeksAvailability: string): Observable<boolean> {


    return this.http.put<boolean>("https://localhost:44305/api/Calendly/UpdateAvailablity", {
      availabilityId: availabilityId,
      availabilityName: availabilityName,
      userId: userId,
      userToken: userToken,
      timezone: timezone,
      weeksAvailability: weeksAvailability,

    }).pipe(catchError(this.errorHandler));



  }

  
  deleteScheduleById(userId: number, usertoken: string, availId: number): Observable<boolean> {
    return this.http.delete<boolean>("https://localhost:44305/api/Calendly/DeleteScheduleById?userId=" + userId + "&usertoken=" + usertoken + "&availId=" + availId).pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }
}