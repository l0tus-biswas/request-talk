import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { IAvailibility } from 'src/app/interface/availibility';
import { AvailibilityService } from 'src/app/services/availibility-services/availibility.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  timeZoneArr = [
    {"label":"(GMT-12:00) International Date Line West","value":"Etc/GMT+12", status: "false" },
    {"label":"(GMT-11:00) Midway Island, Samoa","value":"Pacific/Midway", status: "false" },
    {"label":"(GMT-10:00) Hawaii","value":"Pacific/Honolulu", status: "false" },
    {"label":"(GMT-09:00) Alaska","value":"US/Alaska", status: "false" },
    {"label":"(GMT-08:00) Pacific Time (US & Canada)","value":"America/Los_Angeles", status: "false" },
    {"label":"(GMT-08:00) Tijuana, Baja California","value":"America/Tijuana", status: "false" },
    {"label":"(GMT-07:00) Arizona","value":"US/Arizona", status: "false" },
    {"label":"(GMT-07:00) Chihuahua, La Paz, Mazatlan","value":"America/Chihuahua", status: "false" },
    {"label":"(GMT-07:00) Mountain Time (US & Canada)","value":"US/Mountain", status: "false" },
    {"label":"(GMT-06:00) Central America","value":"America/Managua", status: "false" },
    {"label":"(GMT-06:00) Central Time (US & Canada)","value":"US/Central", status: "false" },
    {"label":"(GMT-06:00) Guadalajara, Mexico City, Monterrey","value":"America/Mexico_City", status: "false" },
    {"label":"(GMT-06:00) Saskatchewan","value":"Canada/Saskatchewan", status: "false" },
    {"label":"(GMT-05:00) Bogota, Lima, Quito, Rio Branco","value":"America/Bogota", status: "false" },
    {"label":"(GMT-05:00) Eastern Time (US & Canada)","value":"US/Eastern", status: "false" },
    {"label":"(GMT-05:00) Indiana (East)","value":"US/East-Indiana", status: "false" },
    {"label":"(GMT-04:00) Atlantic Time (Canada)","value":"Canada/Atlantic", status: "false" },
    {"label":"(GMT-04:00) Caracas, La Paz","value":"America/Caracas", status: "false" },
    {"label":"(GMT-04:00) Manaus","value":"America/Manaus", status: "false" },
    {"label":"(GMT-04:00) Santiago","value":"America/Santiago", status: "false" },
    {"label":"(GMT-03:30) Newfoundland","value":"Canada/Newfoundland", status: "false" },
    {"label":"(GMT-03:00) Brasilia","value":"America/Sao_Paulo", status: "false" },
    {"label":"(GMT-03:00) Buenos Aires, Georgetown","value":"America/Argentina/Buenos_Aires", status: "false" },
    {"label":"(GMT-03:00) Greenland","value":"America/Godthab", status: "false" },
    {"label":"(GMT-03:00) Montevideo","value":"America/Montevideo", status: "false" },
    {"label":"(GMT-02:00) Mid-Atlantic","value":"America/Noronha", status: "false" },
    {"label":"(GMT-01:00) Cape Verde Is.","value":"Atlantic/Cape_Verde", status: "false" },
    {"label":"(GMT-01:00) Azores","value":"Atlantic/Azores", status: "false" },
    {"label":"(GMT+00:00) Casablanca, Monrovia, Reykjavik","value":"Africa/Casablanca", status: "false" },
    {"label":"(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London","value":"Etc/Greenwich", status: "false" },
    {"label":"(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna","value":"Europe/Amsterdam", status: "false" },
    {"label":"(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague","value":"Europe/Belgrade", status: "false" },
    {"label":"(GMT+01:00) Brussels, Copenhagen, Madrid, Paris","value":"Europe/Brussels", status: "false" },
    {"label":"(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb","value":"Europe/Sarajevo", status: "false" },
    {"label":"(GMT+01:00) West Central Africa","value":"Africa/Lagos", status: "false" },
    {"label":"(GMT+02:00) Amman","value":"Asia/Amman", status: "false" },
    {"label":"(GMT+02:00) Athens, Bucharest, Istanbul","value":"Europe/Athens", status: "false" },
    {"label":"(GMT+02:00) Beirut","value":"Asia/Beirut", status: "false" },
    {"label":"(GMT+02:00) Cairo","value":"Africa/Cairo", status: "false" },
    {"label":"(GMT+02:00) Harare, Pretoria","value":"Africa/Harare", status: "false" },
    {"label":"(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius","value":"Europe/Helsinki", status: "false" },
    {"label":"(GMT+02:00) Jerusalem","value":"Asia/Jerusalem", status: "false" },
    {"label":"(GMT+02:00) Minsk","value":"Europe/Minsk", status: "false" },
    {"label":"(GMT+02:00) Windhoek","value":"Africa/Windhoek", status: "false" },
    {"label":"(GMT+03:00) Kuwait, Riyadh, Baghdad","value":"Asia/Kuwait", status: "false" },
    {"label":"(GMT+03:00) Moscow, St. Petersburg, Volgograd","value":"Europe/Moscow", status: "false" },
    {"label":"(GMT+03:00) Nairobi","value":"Africa/Nairobi", status: "false" },
    {"label":"(GMT+03:00) Tbilisi","value":"Asia/Tbilisi", status: "false" },
    {"label":"(GMT+03:30) Tehran","value":"Asia/Tehran", status: "false" },
    {"label":"(GMT+04:00) Abu Dhabi, Muscat","value":"Asia/Muscat", status: "false" },
    {"label":"(GMT+04:00) Baku","value":"Asia/Baku", status: "false" },
    {"label":"(GMT+04:00) Yerevan","value":"Asia/Yerevan", status: "false" },
    {"label":"(GMT+04:30) Kabul","value":"Asia/Kabul", status: "false" },
    {"label":"(GMT+05:00) Yekaterinburg","value":"Asia/Yekaterinburg", status: "false" },
    {"label":"(GMT+05:00) Islamabad, Karachi, Tashkent","value":"Asia/Karachi", status: "false" },
    {"label":"(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi","value":"Asia/Calcutta", status: "false" },
   {"label":"(GMT+05:45) Kathmandu","value":"Asia/Katmandu", status: "false" },
    {"label":"(GMT+06:00) Almaty, Novosibirsk","value":"Asia/Almaty", status: "false" },
    {"label":"(GMT+06:00) Astana, Dhaka","value":"Asia/Dhaka", status: "false" },
    {"label":"(GMT+06:30) Yangon (Rangoon)","value":"Asia/Rangoon", status: "false" },
    {"label":"(GMT+07:00) Bangkok, Hanoi, Jakarta","value":"Asia/Bangkok", status: "false" },
    {"label":"(GMT+07:00) Krasnoyarsk","value":"Asia/Krasnoyarsk", status: "false" },
    {"label":"(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi","value":"Asia/Hong_Kong", status: "false" },
    {"label":"(GMT+08:00) Kuala Lumpur, Singapore","value":"Asia/Kuala_Lumpur", status: "false" },
    {"label":"(GMT+08:00) Irkutsk, Ulaan Bataar","value":"Asia/Irkutsk", status: "false" },
    {"label":"(GMT+08:00) Perth","value":"Australia/Perth", status: "false" },
    {"label":"(GMT+08:00) Taipei","value":"Asia/Taipei", status: "false" },
    {"label":"(GMT+09:00) Osaka, Sapporo, Tokyo","value":"Asia/Tokyo", status: "false" },
    {"label":"(GMT+09:00) Seoul","value":"Asia/Seoul", status: "false" },
    {"label":"(GMT+09:00) Yakutsk","value":"Asia/Yakutsk", status: "false" },
    {"label":"(GMT+09:30) Adelaide","value":"Australia/Adelaide", status: "false" },
    {"label":"(GMT+09:30) Darwin","value":"Australia/Darwin", status: "false" },
    {"label":"(GMT+10:00) Brisbane","value":"Australia/Brisbane", status: "false" },
    {"label":"(GMT+10:00) Canberra, Melbourne, Sydney","value":"Australia/Canberra", status: "false" },
    {"label":"(GMT+10:00) Hobart","value":"Australia/Hobart", status: "false" },
    {"label":"(GMT+10:00) Guam, Port Moresby","value":"Pacific/Guam", status: "false" },
    {"label":"(GMT+10:00) Vladivostok","value":"Asia/Vladivostok", status: "false" },
    {"label":"(GMT+11:00) Magadan, Solomon Is., New Caledonia","value":"Asia/Magadan", status: "false" },
    {"label":"(GMT+12:00) Auckland, Wellington","value":"Pacific/Auckland", status: "false" },
    {"label":"(GMT+12:00) Fiji, Kamchatka, Marshall Is.","value":"Pacific/Fiji", status: "false" },
    {"label":"(GMT+13:00) Nuku'alofa","value":"Pacific/Tongatapu", status: "false" }
  ];

  
tempavaibility: IAvailibility[] = [];
avaibility: any;
  status: boolean = false;
errMsg!: string;
userId: number | null;
userToken: string | null;
  constructor(private _availServices: AvailibilityService, private _toast: NgToastService) { 

   this.userId = Number(sessionStorage.getItem('userID'));
    this.userToken = sessionStorage.getItem('userToken');;
  }

  ngOnInit(): void {
    this.getAllAvaibility();
  }

  getAllAvaibility() {
    this._availServices.getAllAvaibility(Number(this.userId),String(this.userToken)).subscribe(
      res => {
      this.tempavaibility = res;
      console.log(this.tempavaibility);
    
    }, err => {
      this.tempavaibility = [];
       this.errMsg = err;
       console.log(this.errMsg)
    }, () => console.log("Get All Avaibility method excuted successfully"))
  }

  addNewAvailFunc(form: NgForm) {
  
    var getTimezoneVal = document.getElementById("timezone") as HTMLInputElement;
    var timezoneVal = getTimezoneVal.value;
    console.log(timezoneVal);
    console.log(form.value);


    this._availServices.addNewScheduleAvail(form.value.availabilityName,Number(this.userId),String(this.userToken),timezoneVal).subscribe(
      res => {
        this.status = res;
        if (this.status == true) {
          this._toast.success({detail:"SUCCESS",summary:'New Schedule has been added', position: ''});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
        else {
          this._toast.warning({detail:"FAILED",summary:'Unable to add new schedule', position: ''});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
      },
      err => {
        this._toast.warning({detail:" FAILED",summary:'Please try after sometime', position: ''});
      }, () => console.log("Add New Schedule method excuted successfully"))
  }

  deleteSchedule(scheduleId: number)
  {
    this._availServices.deleteScheduleById(Number(this.userId), String( this.userToken),scheduleId).subscribe(
      res => {
        this.status = res;
        if(this.status == true)
        {
          this._toast.success({detail:"DELETE SUCCESS",summary:'The Schedule has been deleted', position: ''});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
        else{
          this._toast.warning({detail:"DELETE FAILED",summary:'Unable to delete the Schedule', position: ''});
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
       
    },
    err =>{
      this.errMsg = err;
      this._toast.warning({detail:"FAILED",summary:'Please try after sometime', position: ''});
  
     setTimeout(function () {
        window.location.reload();
      }, 2000);
    },
    () => console.log("Delete Schedule method excuted successfully"))
  }

}
