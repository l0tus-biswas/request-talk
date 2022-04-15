import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
   if (sessionStorage.getItem('userName')==null && sessionStorage.getItem('userID')==null && sessionStorage.getItem('userToken')==null && sessionStorage.getItem('fullName')==null && sessionStorage.getItem('emailAddress')==null) {
      this._router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
