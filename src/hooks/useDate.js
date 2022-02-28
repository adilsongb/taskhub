import days from './days.js';

function useDate() {
  function getDaysInMonth(monthNumber) {
    return days[monthNumber].days;
  }

  function modPrevDate(date) {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;
    if (day === 0) {
      month -= 1;
      if (month === 0) {
        month = 12;
        year -= 1;
      };

      day = new Date(year, month, 0).getDate();
      console.log(`ultimo dia ${day}`);
    };

    return { day, month, year };
  }

  function modNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;
    if (day > getDaysInMonth(date.month)) {
      day = 1;
      month += 1;
      if (month > 12) {
        month = 1;
        year += 1;
      };
    };

    return { day, month, year };
  }

  return [modPrevDate, modNextDate, getDaysInMonth];
}

export default useDate;
