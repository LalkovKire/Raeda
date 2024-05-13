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
}
