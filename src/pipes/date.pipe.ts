import {Pipe} from '@angular/core';

@Pipe({
  name: 'dateMessage'
})
export class DateMessagePipe {

  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  transform(value: string) : string {
    let date = new Date(value);

    let dateCurrent = new Date();
    let datePrevious7Days = new Date();
    let dateOffset = (24*60*60*1000) * 7; //7 days
    datePrevious7Days.setTime(datePrevious7Days.getTime() - dateOffset);

    if(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() == dateCurrent.getDate() + "/" + dateCurrent.getMonth() + "/" + dateCurrent.getFullYear()) {
      return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
    }

    if(date < dateCurrent && date > datePrevious7Days) {
      return this.days[date.getDay()] + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
    } else {
      return ("0" + date.getMonth()).slice(-2) + "/" + ("0" + date.getDay()).slice(-2) + "/" + date.getFullYear();
    }
  }
}
