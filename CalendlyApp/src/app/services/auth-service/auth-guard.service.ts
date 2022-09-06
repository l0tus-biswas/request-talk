import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
   if (localStorage.getItem('userName')==null && localStorage.getItem('userID')==null && localStorage.getItem('userToken')==null && localStorage.getItem('fullName')==null && localStorage.getItem('emailAddress')==null) {
      this._router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
