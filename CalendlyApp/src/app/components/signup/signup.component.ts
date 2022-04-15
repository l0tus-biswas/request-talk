import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  status: boolean = false;
  errMsg!: string;
  constructor(private _usrServices: UserService, private _toast: NgToastService) { }

  ngOnInit(): void {
  }

   randomStr(len: number, arr: any) {

    var ans = '';
    for (var i = len; i > 0; i--) {
        ans += 
          arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
}
  
  addNewUserFunc(form: NgForm) {

    console.log(form.value);
   
   var userToken = this.randomStr(10,'12345abcde');
   console.log(userToken);
    var timeZone = "Asia/Calcutta";
    this._usrServices.registerUser(userToken, form.value.fullName, form.value.username, form.value.emailAdderss, form.value.password,timeZone ).subscribe(
      res => {
        this.status = res;
        console.log(this.status);
        if (this.status == true) {
          this._toast.success({detail:"REGISTRATION SUCCESS",summary:'Please Sign In Now', position: ''});
          setTimeout(function () {
            window.location.href = 'login'
          }, 2000);
        }
        else {
          this._toast.warning({detail:"REGISTRATION FAILED",summary:'Unable to register', position: ''});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
      },
      err => {
        this._toast.warning({detail:" FAILED",summary:'Please try after sometime', position: ''});
      }, () => console.log("Add New Event method excuted successfully"))
  }

}
