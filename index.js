const spnMonthName = document.querySelector(".calendar__top-bar-month-name");

const currentMonth = new Date().getMonth();

const calendarBottomBar = document.querySelector(".calendar__bottom-bar");

const spnNext = document.querySelector(".next");

const spnPrev = document.querySelector(".prev");

let date = new Date();

months = [
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

const getMonth = (date) => date.getMonth();

const calendar = (date) => {
  calendarBottomBar.textContent = "";

  getYear = (date) => date.getFullYear();

  getWeekDay = (date) => date.getDay();

  getMonthDays = (date) => {
    const year = getYear(date);
    const month = getMonth(date) + 1;
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
    spnMonthName.textContent = months[monthIndex];

    const nextDaysToRender = 7 - currentWeekDay;

    const domFragment = document.createDocumentFragment();

    lastDays -= lastDayWeek;

    for (let i = lastDayWeek; i > 0; i--) {
      lastDays += 1;
      const day = document.createElement("div");
      day.className = "calendar__day-prev";
      day.textContent = lastDays;
      domFragment.appendChild(day);
    }

    for (let i = 1; i <= daysNumber; i++) {
      const day = document.createElement("div");
      if (i === today && monthIndex === currentMonth) {
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
    const daysNumber = getMonthDays(date);
    const monthIndex = getMonth(date);
    const year = getYear(date);
    const currentWeekDay = getWeekDay(date);
    const today = getToday(date);
    const prevMonth = generatePrevMonth(year, monthIndex);
    const lastDays = getMonthDays(prevMonth);
    const lastDayWeek = getWeekDay(prevMonth);
    render(
      monthIndex,
      months,
      daysNumber,
      currentWeekDay,
      today,
      lastDays,
      lastDayWeek
    );
  };

  init();
};

calendar(date);

spnNext.addEventListener("click", () => {
  const nextMonthIndex = getMonth(date) + 1;
  date.setMonth(nextMonthIndex);
  console.log(date);
  console.log("next");
  calendar(date);
});

spnPrev.addEventListener("click", () => {
  console.log("prev");
});
