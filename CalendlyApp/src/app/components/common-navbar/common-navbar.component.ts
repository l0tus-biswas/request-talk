import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-common-navbar',
  templateUrl: './common-navbar.component.html',
  styleUrls: ['./common-navbar.component.css']
})
export class CommonNavbarComponent implements OnInit {
  currentFullName: string | null;
  currentUserName: string | null;
  constructor(private router: Router, private _toast: NgToastService) { 
    this.currentUserName = sessionStorage.getItem('userName');
    this.currentFullName = sessionStorage.getItem('fullName');
  }
 
  ngOnInit(): void {
  }

  logoutUser()
  {

    sessionStorage.clear();
    this._toast.success({ detail: "LOGGING OUT", summary: 'Redirecting to login page', position: '' });

    setTimeout(() => {
      this.router.navigate(['login']);
    }, 2000);
  
  }

}
