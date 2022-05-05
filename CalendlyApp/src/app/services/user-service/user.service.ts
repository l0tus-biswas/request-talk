import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IUsers } from 'src/app/interface/users';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loginUser( username: string, password: string): Observable<boolean> {
    console.log(username, password);
    return this.http.get<boolean>("https://appointly.azurewebsites.net/api/Calendly/ValidateUser?username=" + username + "&password=" + password).pipe(catchError(this.errorHandler));
  }
  
  validateUserEmail( emailAdderss: string): Observable<boolean> {
    console.log(emailAdderss);
    return this.http.get<boolean>("https://appointly.azurewebsites.net/api/Calendly/ValidateUserEmail?email=" + emailAdderss).pipe(catchError(this.errorHandler));
  }

  resetMail( emailAdderss: string, password: string): Observable<any> {
  
    return this.http.get<any>("https://mail-backend.onrender.com/resetMail?emailAddress=" + emailAdderss + "&password=" +password ).pipe(catchError(this.errorHandler));
  }

  sendBookingConfirmationMail( bookedEmailAdderss: string, userEmailAdderss: string, bookedName: string, eventName: string): Observable<any> {
  
    return this.http.get<any>("https://mail-backend.onrender.com/sendBookingConfirmationMail?bookedEmailAdderss=" + bookedEmailAdderss +  "&userEmailAdderss=" +userEmailAdderss +  "&bookedName=" +bookedName + "&eventName=" +eventName  ).pipe(catchError(this.errorHandler));
  }

  sendBookingPendingMail( bookedEmailAdderss: string, userEmailAdderss: string, bookedName: string,  eventName: string): Observable<any> {
    return this.http.get<any>("https://mail-backend.onrender.com/sendBookingPendingMail?bookedEmailAdderss=" + bookedEmailAdderss +  "&userEmailAdderss=" +userEmailAdderss + "&bookedName=" + bookedName + "&eventName=" +eventName  ).pipe(catchError(this.errorHandler));
 }

 sendRescheduleMail( bookedEmailAdderss: string, userEmailAdderss: string, bookedName: string,  eventName: string, userURL: string, timeAndTimeZone: string, eventDate: string ): Observable<any> {
  return this.http.get<any>("https://mail-backend.onrender.com/sendRescheduleMail?bookedEmailAdderss=" + bookedEmailAdderss +  "&userEmailAdderss=" +userEmailAdderss + "&bookedName=" + bookedName + "&eventName=" +eventName  + "&userURL=" + userURL + "&timeAndTimeZone=" +timeAndTimeZone+ "&eventDate=" +eventDate).pipe(catchError(this.errorHandler));
}
sendCancelMail( bookedEmailAdderss: string, userEmailAdderss: string, bookedName: string,  eventName: string, userURL: string, timeAndTimeZone: string, eventDate: string ): Observable<any> {
  return this.http.get<any>("https://mail-backend.onrender.com/sendCancelMail?bookedEmailAdderss=" + bookedEmailAdderss +  "&userEmailAdderss=" +userEmailAdderss + "&bookedName=" + bookedName + "&eventName=" +eventName  + "&userURL=" + userURL + "&timeAndTimeZone=" +timeAndTimeZone+ "&eventDate=" +eventDate).pipe(catchError(this.errorHandler));
}

sendBookingAcceptMail( bookedEmailAdderss: string, userEmailAdderss: string, bookedName: string,  eventName: string, userURL: string, timeAndTimeZone: string, eventDate: string ): Observable<any> {
  return this.http.get<any>("https://mail-backend.onrender.com/sendBookingAcceptMail?bookedEmailAdderss=" + bookedEmailAdderss +  "&userEmailAdderss=" +userEmailAdderss + "&bookedName=" + bookedName + "&eventName=" +eventName  + "&userURL=" + userURL + "&timeAndTimeZone=" +timeAndTimeZone+ "&eventDate=" +eventDate).pipe(catchError(this.errorHandler));
}
sendBookingRejectMail( bookedEmailAdderss: string, userEmailAdderss: string, bookedName: string,  eventName: string, userURL: string, timeAndTimeZone: string, eventDate: string ): Observable<any> {
  return this.http.get<any>("https://mail-backend.onrender.com/sendBookingRejectMail?bookedEmailAdderss=" + bookedEmailAdderss +  "&userEmailAdderss=" +userEmailAdderss + "&bookedName=" + bookedName + "&eventName=" +eventName  + "&userURL=" + userURL + "&timeAndTimeZone=" +timeAndTimeZone+ "&eventDate=" +eventDate).pipe(catchError(this.errorHandler));
}

sendPreScheduleMail( bookedEmailAdderss: string, userEmailAdderss: string, bookedName: string,  eventName: string): Observable<any> {
  return this.http.get<any>("https://mail-backend.onrender.com/sendPreScheduleMail?bookedEmailAdderss=" + bookedEmailAdderss +  "&userEmailAdderss=" +userEmailAdderss + "&bookedName=" + bookedName + "&eventName=" +eventName  ).pipe(catchError(this.errorHandler));
}

  registerUser( userToken: string,  fullName: string, username: string, emailAdderss: string, password: string,timezone: string): Observable<boolean> {
    console.log(userToken,fullName,username,emailAdderss, password, timezone);
    return this.http.post<boolean>("https://appointly.azurewebsites.net/api/Calendly/RegisterUser", {
     
      userToken:userToken,
      fullName:fullName,
      username:username,
      emailAdderss:emailAdderss,
      password:password,
      timezone:timezone
    }).pipe(catchError(this.errorHandler));
  }

  getUserData(userId: number, usertoken: string ): Observable<IUsers[]> {
    return this.http.get<IUsers[]>("https://appointly.azurewebsites.net/api/Calendly/GetUserData?userId=" + userId + "&usertoken=" + usertoken).pipe(catchError(this.errorHandler));
  }

  
  getUserDataByEmail( emailAdderss: string ): Observable<IUsers[]> {
    return this.http.get<IUsers[]>("https://appointly.azurewebsites.net/api/Calendly/GetUserDataByEmail?emailAdderss=" + emailAdderss ).pipe(catchError(this.errorHandler));
  }
  
  updateUserProfile( userId: number, userToken: string, password:string, fullName: string, about: string, timeZone: string, language: string): Observable<boolean>  {

    console.log(userId,userToken,password,fullName,about,timeZone, language);
    return this.http.put<boolean>("https://appointly.azurewebsites.net/api/Calendly/EditProfile", {
      userId: userId,
      userToken: userToken,
      password: password,
      fullName: fullName,
      about: about,
      timezone: timeZone,
      language: language,
    }).pipe(catchError(this.errorHandler));
}

updateUserProfilePicture( userId: number, userToken: string, userProfilePicture: string): Observable<boolean>  {

  console.log(userId,userToken,userProfilePicture);
  return this.http.put<boolean>("https://appointly.azurewebsites.net/api/Calendly/EditProfilePicture", {
    userId: userId,
    userToken: userToken,
    profilePicture:userProfilePicture
  }).pipe(catchError(this.errorHandler));
}

  errorHandler(error: HttpErrorResponse){
    console.error(error);
    return throwError(error.message || "Server Error");
  }


}
