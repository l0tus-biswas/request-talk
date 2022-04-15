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
    return this.http.get<boolean>("https://localhost:44305/api/Calendly/ValidateUser?username=" + username + "&password=" + password).pipe(catchError(this.errorHandler));
  }
  
  registerUser( userToken: string,  fullName: string, username: string, emailAdderss: string, password: string,timezone: string): Observable<boolean> {
    console.log(userToken,fullName,username,emailAdderss, password, timezone);
    return this.http.post<boolean>("https://localhost:44305/api/Calendly/RegisterUser", {
     
      userToken:userToken,
      fullName:fullName,
      username:username,
      emailAdderss:emailAdderss,
      password:password,
      timezone:timezone
    }).pipe(catchError(this.errorHandler));
  }

  getUserData(userId: number, usertoken: string ): Observable<IUsers[]> {
    return this.http.get<IUsers[]>("https://localhost:44305/api/Calendly/GetUserData?userId=" + userId + "&usertoken=" + usertoken).pipe(catchError(this.errorHandler));
  }

  
  getUserDataByEmail( emailAdderss: string ): Observable<IUsers[]> {
    return this.http.get<IUsers[]>("https://localhost:44305/api/Calendly/GetUserDataByEmail?emailAdderss=" + emailAdderss ).pipe(catchError(this.errorHandler));
  }
  
  updateUserProfile( userId: number, userToken: string, password:string, fullName: string, about: string, timeZone: string, language: string): Observable<boolean>  {

    console.log(userId,userToken,password,fullName,about,timeZone, language);
    return this.http.put<boolean>("https://localhost:44305/api/Calendly/EditProfile", {
      userId: userId,
      userToken: userToken,
      password: password,
      fullName: fullName,
      about: about,
      timezone: timeZone,
      language: language,
    }).pipe(catchError(this.errorHandler));
}

  errorHandler(error: HttpErrorResponse){
    console.error(error);
    return throwError(error.message || "Server Error");
  }


}