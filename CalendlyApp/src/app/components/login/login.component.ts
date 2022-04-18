import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { IUsers } from 'src/app/interface/users';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status: boolean = false;
  errMsg!: string;
  userDetails: IUsers[] = [];
  constructor(private _usrServices: UserService, private _toast: NgToastService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  loginUserFunc(form: NgForm) {

    console.log(form.value);

    this._usrServices.loginUser(form.value.emailAdderss, form.value.password).subscribe(
      res => {
        this.status = res;
        console.log(this.status);
        if (this.status == true) {

          this._usrServices.getUserDataByEmail(form.value.emailAdderss).subscribe(
            resDetails => {
              this.userDetails = resDetails,
                console.log(this.userDetails),
                sessionStorage.setItem("userName", this.userDetails[0].username);
              sessionStorage.setItem("userID", String(this.userDetails[0].userId));
              sessionStorage.setItem("userToken", String(this.userDetails[0].userToken));
              sessionStorage.setItem("fullName", String(this.userDetails[0].fullName));
              sessionStorage.setItem("emailAddress", String(this.userDetails[0].emailAdderss));
              sessionStorage.setItem("profilePicture", String(this.userDetails[0].profilePicture));

              this._toast.success({ detail: "LOGIN SUCCESS", summary: 'Redirecting to home page', position: '' });

              setTimeout(() => {
                this.router.navigate(["/home"]);
              }, 2000);
    
    
            },
            errDetails => {
              this.errMsg = errDetails;
             
            },
            () => console.log("User data method executed successfully")
          );

        }
        else {
          this._toast.warning({ detail: "WRONG CREDINTIALS", summary: 'Unable to login', position: '' });
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
      },
      err => {
        this._toast.warning({ detail: " FAILED", summary: 'Please try after sometime', position: '' });
      }, () => console.log("Login method excuted successfully"))
  }

}
