import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  getCurrentDate() {
    return new Date();
  }

  convertDateToString(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day.toString().padStart(2, '0')}-${month
      .toString()
      .padStart(2, '0')}-${year}`;
  }

  convertStringToDate(str: string | undefined) {
    if (str === undefined) return null;

    const dateParts = str.split('-');

    const day = +dateParts[0];
    const month = +dateParts[1] - 1;
    const year = +dateParts[2];

    return new Date(year, month, day);
  }

  dateDiffInDays(a: Date, b: Date) {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / MS_PER_DAY);
  }

  convertToISOString(date: Date) {
    return new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();
  }

  getDatesBetween(pickup: Date, dropOff: Date) {
    const dates = [];
    const currentDate = new Date(pickup);
    currentDate.setDate(currentDate.getDate() - 1);

    while (currentDate <= dropOff) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    dates.push(currentDate);

    return dates;
  }
}
