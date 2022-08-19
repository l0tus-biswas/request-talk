import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { IAvailibility } from 'src/app/interface/availibility';
import { EventService } from 'src/app/services/event-service/event.service';
import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IEvents } from 'src/app/interface/events';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-event-types',
  templateUrl: './event-types.component.html',
  styleUrls: ['./event-types.component.css']
})
export class EventTypesComponent implements OnInit {

tempavaibility: IAvailibility[] = [];
allEvents: IEvents[] = [];
avaibility: any;
status: boolean = false;
errMsg!: string;
userId: number | null;
userToken: string | null;
userName: string | null;

// locationArr = [
//   { id: 1, label: "Zoom", status: "false" },
//   { id: 2, label: "Google Meet", status: "false" },
//   { id: 3, label: "Microsoft Teams", status: "false" }
// ];


locationArr = [
  { id: 2, label: "Google Meet", status: "false" }
];


  constructor(private spinner: NgxSpinnerService,private _evtServices: EventService, private _toast: NgToastService) { 
    this.userId = Number(sessionStorage.getItem('userID'));
    this.userName=sessionStorage.getItem('userName');;
    this.userToken = sessionStorage.getItem('userToken');;
  }

  ngOnInit(): void {
    this.getAllAvaibility();
    this.getAllEvents();
  }

   uniqueByKey(lp : any, key: any) {
    return [...new Map(lp.map((x: any) => [x[key], x])).values()];
  }
  
  
  getAllAvaibility() {
    this.spinner.show();
    this._evtServices.getAllAvaibility(Number(this.userId), String(this.userToken)).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
      this.tempavaibility = res;
      console.log(this.tempavaibility);
       this.avaibility = this.uniqueByKey(this.tempavaibility, 'availabilityId');
      for(var i =0; i< this.avaibility.length;i++)
      {
        this.avaibility[i].status = "false";
      
      }
      console.log(this.avaibility);
       
    }, err => {
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      this.tempavaibility = [];
       this.errMsg = err;
       console.log(this.errMsg)
    }, () => console.log("Get All Avaibility method excuted successfully"))
  }

  getAllEvents() {
    this.spinner.show();
    this._evtServices.getAllEvents(Number(this.userId), String( this.userToken)).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
      this.allEvents = res;
      console.log(this.allEvents);
      
    }, err => {
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      this.allEvents = [];
       this.errMsg = err;
       console.log(this.errMsg)
    }, () => console.log("Get All Events method excuted successfully"))
  }

  addNewEventFunc(form: NgForm) {
    this.spinner.show();
    var getLocationVal = document.getElementById("location") as HTMLInputElement;
    var localtionVal = getLocationVal.value;
    console.log(localtionVal);

    var getAvaibilityVal = document.getElementById("avaibility") as HTMLInputElement;
    var avaibilityVal = getAvaibilityVal.value;
    console.log(avaibilityVal);
    console.log(form.value);
   
    var getEventTitle = form.value.title;

    var convertTitleToURL = getEventTitle.replace(/[^a-zA-Z0-9]/g, '');
   


    this._evtServices.addNewEvent(Number(this.userId), String(this.userToken), form.value.title, convertTitleToURL,   form.value.length, Number(avaibilityVal),form.value.desc, localtionVal ).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        if (this.status == true) {
          this._toast.success({detail:"ADD SUCCESS",summary:'New Event has been added', position: 'br'});
          setTimeout(function () {
            window.location.reload();
            
          }, 2000);
        }
        else {
          this._toast.warning({detail:"ADD FAILED",summary:'Unable to add new event', position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
      },
      err => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this._toast.warning({detail:" FAILED",summary:'Please try after sometime', position: 'br'});
      }, () => console.log("Add New Event method excuted successfully"))
  }

  deleteEvent(eventId: number)
  {
    this.spinner.show();
    this._evtServices.deleteEvent(Number(this.userId), String(this.userToken),eventId).subscribe(
      res => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.status = res;
        if(this.status == true)
        {
          this._toast.success({detail:"DELETE SUCCESS",summary:'The Event has been deleted', position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
        else{
          this._toast.warning({detail:"DELETE FAILED",summary:'Unable to delete the event', position: 'br'});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
       
    },
    err =>{
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      this.errMsg = err;
      this._toast.warning({detail:"FAILED",summary:'Please try after sometime', position: 'br'});
  
     setTimeout(function () {
        window.location.reload();
      }, 2000);
    },
    () => console.log("Delete Event method excuted successfully"))
  }
  
  copyToClipBoard(evtURL: string)
  {
    var copyText = "http://localhost:4200/"+"u/" + this.userName+"/" +evtURL;
  navigator.clipboard.writeText(copyText);
  this._toast.success({detail:"URL COPIED",summary:'Copied to clipboard', position: 'br'});
  }

}
