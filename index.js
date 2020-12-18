const spnMonthName = document.querySelector(".calendar__top-bar-month-name");

const calendarBottomBar = document.querySelector(".calendar__bottom-bar");

const spnNext = document.querySelector(".next");

const spnPrev = document.querySelector(".prev");

class Calendar {
  constructor(spnMonthName, date) {
    this.spnMonthName = spnMonthName;

    this.date = date;

    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }

  getMonth = (date) => date.getMonth();

  getYear = (date) => date.getFullYear();

  getWeekDay = (date) => date.getDay();

  getMonthDays = (date) => {
    const year = this.getYear(date);
    const month = this.getMonth(date) + 1;
    const newDate = new Date(year, month, 0);
    const days = newDate.getDate();
    return days;
  };

  getToday = (date) => date.getDate();

  generatePrevMonth = (year, month) => new Date(year, month, 0);

  render = (
    monthIndex,
    months,
    daysNumber,
    currentWeekDay,
    today,
    lastDays,
    lastDayWeek
  ) => {
    console.log(lastDayWeek);

    this.spnMonthName.textContent = months[monthIndex];

    const nextDaysToRender = 7 - currentWeekDay;

    const domFragment = document.createDocumentFragment();

    for (let i = lastDayWeek; i > 0; i--) {
      let dayNumber = lastDays;
      const day = document.createElement("div");
      day.className = "calendar__day-prev";
      day.textContent = dayNumber;
      domFragment.appendChild(day);
      dayNumber = -1;
    }

    for (let i = 1; i <= daysNumber; i++) {
      const day = document.createElement("div");
      if (i == today) {
        day.className = "calendar__day-today";
      } else day.classList.add("calendar__day");

      day.textContent = i;
      domFragment.appendChild(day);
    }

    for (let i = 1; i <= nextDaysToRender; i++) {
      const day = document.createElement("div");
      day.className = "calendar__day-next";
      day.textContent = i;
      domFragment.appendChild(day);
    }

    calendarBottomBar.appendChild(domFragment);
  };

  init = () => {
    const daysNumber = this.getMonthDays(this.date);
    const monthIndex = this.getMonth(this.date);
    const year = this.getYear(this.date);
    const currentWeekDay = this.getWeekDay(this.date);
    const today = this.getToday(date);
    const prevMonth = this.generatePrevMonth(year, monthIndex);
    const lastDays = this.getMonthDays(prevMonth);
    const lastDayWeek = this.getWeekDay(prevMonth);
    this.render(
      monthIndex,
      this.months,
      daysNumber,
      currentWeekDay,
      today,
      lastDays,
      lastDayWeek
    );
  };
}

const date = new Date();
const calendar = new Calendar(spnMonthName, date);

calendar.init();
