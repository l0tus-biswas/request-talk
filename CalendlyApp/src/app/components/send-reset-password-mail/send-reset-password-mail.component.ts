import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { IUsers } from 'src/app/interface/users';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-send-reset-password-mail',
  templateUrl: './send-reset-password-mail.component.html',
  styleUrls: ['./send-reset-password-mail.component.css']
})
export class SendResetPasswordMailComponent implements OnInit {
  status: boolean = false;
  errMsg!: string;
  userDetails: IUsers[] = [];
  constructor(private _usrServices: UserService, private _toast: NgToastService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
  sendResetPassowrdMail(form: NgForm) {

    console.log(form.value);

    this._usrServices.validateUserEmail(form.value.emailAdderss).subscribe(
      res => {
        this.status = res;
        console.log(this.status);
        if (this.status == true) {

          this._usrServices.getUserDataByEmail(form.value.emailAdderss).subscribe(
            resDetails => {
              this.userDetails = resDetails,
                console.log(this.userDetails),

                this._usrServices.resetMail(this.userDetails[0].emailAdderss, this.userDetails[0].password).subscribe(
                  res =>{
                    console.log(res);
                  },
                  err =>{
                    console.log(err);
                  },
                  () => console.log("Send Mail Worked")
                )

        
        
    
            },
            errDetails => {
              this.errMsg = errDetails;
            },
            () => console.log("User data method executed successfully")
          );
          this._toast.success({ detail: "PASSWORD RESET SUCESS ", summary: 'We have sent an email',position: 'br'});

        }
        else {
          this._toast.warning({ detail: "FAILED", summary: 'No such email address found',position: 'br'});
    
        }
      },
      err => {
        this._toast.warning({ detail: "FAILED", summary: 'No such email address found',position: 'br'});
      
      }, () => console.log("Validate User Email method excuted successfully"))
  }

}
