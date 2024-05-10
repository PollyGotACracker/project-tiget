document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector(".calendar .tbody");
  const btnPrev = document.querySelector("button.prev");
  const btnNext = document.querySelector("button.next");
  const btnToday = document.querySelector("button.today");

  class TodayDate {
    constructor() {
      const now = new Date();
      this.year = now.getFullYear();
      this.month = now.getMonth() + 1;
      this.date = now.getDate();
      this.day = now.getDay();
    }
  }

  const selectedDate = new TodayDate();
  const today = new TodayDate();

  const setTodayText = () => {
    const yearEle = document.querySelector("h2.year");
    const monthEle = document.querySelector("h1.month");
    yearEle.textContent = `${selectedDate.year}년`;
    monthEle.textContent = `${selectedDate.month}월`;
  };

  const getFormattedDate = (year, month, date) => {
    return `${year}-${String(month).padStart(2, 0)}-${String(date).padStart(
      2,
      0
    )}`;
  };

  const getDateRange = (selectedDate) => {
    const isFirstMonth = selectedDate.month === 1;
    const isLastMonth = selectedDate.month === 12;
    const prev = {
      year: isLastMonth ? selectedDate.year + 1 : selectedDate.year,
      month: isLastMonth ? 1 : selectedDate.month - 1,
      date: 1,
    };
    const next = {
      year: isFirstMonth ? selectedDate.year - 1 : selectedDate.year,
      month: isFirstMonth ? 12 : selectedDate.month + 1,
      date: 31,
    };
    return {
      prevDate: getFormattedDate(prev.year, prev.month, prev.date),
      nextDate: getFormattedDate(next.year, next.month, next.date),
    };
  };

  const fetchSchedule = async () => {
    const { prevDate, nextDate } = getDateRange(selectedDate);
    const fetchOption = {
      method: "POST",
      body: JSON.stringify({ prevDate, nextDate }),
      headers: { "Content-Type": "application/json" },
    };
    const result = await fetch("/main/schedule", fetchOption).then((res) =>
      res.json()
    );
    return result;
  };

  const addSchedule = (concert) => {
    const schedule = document.createElement("div");
    schedule.textContent = concert.conName;
    schedule.dataset.code = concert.conCode;
    schedule.classList.add("schedule");
    return schedule;
  };

  const setSchedule = (conData) => {
    let schedule;
    let dates = Array.from(document.querySelectorAll(".date"));
    for (let date of dates) {
      let classArr = !!String(
        Array.from(date.classList).filter((ele) => ele.includes("-"))
      );
      if (!classArr) {
        continue;
      }
      let lastconCode;
      for (let data of conData) {
        const concert = {
          conCode: data.concert_code,
          conName: data.concert_name,
          start: data.start_date,
          end: data.end_date,
        };
        if (concert.conCode === lastconCode) {
          continue;
        }
        if (
          new Date(classArr) >= new Date(concert.start) &&
          new Date(classArr) <= new Date(concert.end)
        ) {
          let d = date;
          if (!d.nextSibling) {
            d = d.parentNode?.nextSibling?.firstChild;
          } else {
            d = d.nextSibling;
          }
          schedule = addSchedule(concert);
          date.appendChild(schedule);
        } else {
          continue;
        }
        lastconCode = concert.conCode;
      }
    }
  };

  class CalendarDate {
    constructor() {
      const currMonth = new Date(selectedDate.year, selectedDate.month, 0);
      const prevMonth = new Date(selectedDate.year, selectedDate.month - 1, 0);
      this.currMonthLastDate = currMonth.getDate();
      this.prevMonthLastDate = prevMonth.getDate();
      this.prevMonthLastDay = prevMonth.getDay();
      this.index = {
        prev: this.prevMonthLastDate - this.prevMonthLastDay,
        curr: 1,
        next: 1,
      };
    }

    increasePrev() {
      this.index.prev++;
    }
    increaseCurr() {
      this.index.curr++;
    }
    increaseNext() {
      this.index.next++;
    }

    get prevMonthDateClass() {
      const isFirstMonth = selectedDate.month === 1;
      return getFormattedDate(
        isFirstMonth ? selectedDate.year - 1 : selectedDate.year,
        isFirstMonth ? 12 : selectedDate.month - 1,
        this.index.prev
      );
    }
    get currMonthDateClass() {
      return getFormattedDate(
        selectedDate.year,
        selectedDate.month,
        this.index.curr
      );
    }
    get nextMonthDateClass() {
      const isLastMonth = selectedDate.month === 12;
      return getFormattedDate(
        isLastMonth ? selectedDate.year + 1 : selectedDate.year,
        isLastMonth ? 1 : selectedDate.month + 1,
        this.index.next
      );
    }
    get todayMonthDateClass() {
      return getFormattedDate(today.year, today.month, today.date);
    }
  }

  const setDateClassName = () => {
    const calDate = new CalendarDate();
    const isPrevMonth = (row, col) =>
      row === 0 &&
      calDate.prevMonthLastDay != 6 &&
      col <= calDate.prevMonthLastDay;
    const isCurrMonth = () => calDate.index.curr <= calDate.currMonthLastDate;

    Array.from(tbody.children).forEach((week, row) => {
      Array.from(week.children).forEach((date, col) => {
        const dateTxt = date.querySelector(".date_txt");
        if (isPrevMonth(row, col)) {
          dateTxt.textContent = calDate.index.prev;
          const className = calDate.prevMonthDateClass;
          date.classList.add(className, "prevMonth");
          calDate.increasePrev();
        } else if (isCurrMonth()) {
          dateTxt.textContent = calDate.index.curr;
          const className = calDate.currMonthDateClass;
          const todayClassName = calDate.todayMonthDateClass;
          date.classList.add(className, "currMonth");
          if (className === todayClassName) {
            date.classList.add("today");
          }
          calDate.increaseCurr();
        } else {
          dateTxt.textContent = calDate.index.next;
          const className = calDate.nextMonthDateClass;
          date.classList.add(className, "nextMonth");
          calDate.increaseNext();
        }
      });
    });
  };

  const setDateHoliday = () => {
    const tds = Array.from(document.querySelectorAll(".date"));
    for (let td of tds) {
      const tdClassArr = Array.from(td.classList).map((tdClass) => {
        if (tdClass.includes("-")) {
          tdClass = tdClass.replaceAll("-", "");
        }
        return tdClass;
      });

      const dateTxt = td.querySelector(".date_txt");
      const holiTxt = document.createElement("div");
      holiTxt.classList.add("holi_txt");
      td.appendChild(holiTxt);
      for (let i of holiData) {
        if (tdClassArr.includes(`${i.h_locdate}`)) {
          holiTxt.textContent = i.h_dateName;
          if (i.h_isHoliday === "Y") {
            holiTxt.style.color = "red";
            dateTxt.style.color = "red";
          }
        }
      }
    }
  };

  const setCalendar = () => {
    tbody.textContent = "";

    const rows = Array.from({ length: 6 }).map(() => {
      const tr = document.createElement("div");
      tr.className = "week";
      const cols = Array.from({ length: 7 }).map(() => {
        const td = document.createElement("div");
        td.className = "date";
        const dateTxt = document.createElement("div");
        dateTxt.classList.add("date_txt");
        td.appendChild(dateTxt);
        return td;
      });
      tr.append(...cols);
      return tr;
    });
    tbody.append(...rows);

    setDateClassName();
    setDateHoliday();
  };

  const showCalendar = async (selectedDate) => {
    const result = await fetchSchedule(selectedDate);
    setTodayText();
    setCalendar();
    setSchedule(result);
  };

  showCalendar(selectedDate);

  btnPrev?.addEventListener("click", () => {
    selectedDate.month--;
    if (selectedDate.month === 0) {
      selectedDate.month = 12;
      selectedDate.year--;
    }
    showCalendar(selectedDate);
  });

  btnNext?.addEventListener("click", () => {
    selectedDate.month++;
    if (selectedDate.month === 13) {
      selectedDate.month = 1;
      selectedDate.year++;
    }
    showCalendar(selectedDate);
  });

  btnToday?.addEventListener("click", () => {
    selectedDate.year = today.year;
    selectedDate.month = today.month;
    selectedDate.date = today.date;
    showCalendar(selectedDate);
  });
});
