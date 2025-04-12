let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function generateCalendar() {
  // Сарын нэрнүүд (Монголоор)
  const monthNames = [
    "1-р сар",
    "2-р сар",
    "3-р сар",
    "4-р сар",
    "5-р сар",
    "6-р сар",
    "7-р сар",
    "8-р сар",
    "9-р сар",
    "10-р сар",
    "11-р сар",
    "12-р сар",
  ];

  // Гарагуудын нэр (товчоор)
  const dayNames = ["Да", "Мя", "Лх", "Пү", "Ба", "Бя", "Ня"];

  // Сарын эхний өдөр ба сүүлийн өдөр
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const firstDayIndex = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Даваагаас эхлэхийн тулд
  const numberOfDays = lastDay.getDate();

  // Сар, оныг харуулах
  document.getElementById(
    "monthYear"
  ).textContent = `${monthNames[currentMonth]} ${currentYear}`;

  // Календарын month-г бэлдэх
  const calendarMonth = document.getElementById("calendarMonth");
  calendarMonth.innerHTML = "";

  let weekHeader = document.createElement("div");
  weekHeader.classList.add("calendar-week");
  // Гарагуудын нэрийг нэмэх
  dayNames.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.classList.add("calendar-day", "header");
    dayElement.textContent = day;
    weekHeader.appendChild(dayElement);
  });
  calendarMonth.appendChild(weekHeader);

  let week = document.createElement("div");
  week.classList.add("calendar-week");
  // Хоосон өдрүүдийг нэмэх (сарын эхний өдрөөс өмнө)
  for (let i = 0; i < firstDayIndex; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.classList.add("calendar-day", "empty");
    week.appendChild(emptyDay);
  }

  // Сарын өдрүүдийг нэмэх
  for (let day = 1; day <= numberOfDays; day++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("calendar-day", "normal");
    dayElement.textContent = day;

    // Өнөөдрийг тодруулах
    if (
      day === currentDate.getDate() &&
      currentMonth === currentDate.getMonth() &&
      currentYear === currentDate.getFullYear()
    ) {
      dayElement.classList.add("today");
    }

    if (week.children.length < 7) {
      week.appendChild(dayElement);
    } else {
      calendarMonth.appendChild(week);
      week = document.createElement("div");
      week.classList.add("calendar-week");
      week.appendChild(dayElement);
    }
  }
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentMonth, currentYear);
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentMonth, currentYear);
}

// Календарийг эхлүүлэх
generateCalendar();
