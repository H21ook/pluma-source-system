var scrollStep = 100;

function initScroll() {
  var scroll = document.getElementById("categoryList");
  var rightButton = document.getElementById("categoryRightButton");
  var leftButton = document.getElementById("categoryLeftButton");

  if (scroll && rightButton && leftButton) {
    // scroll end then right hidden button
    var scrollWidth = scroll?.scrollWidth;
    var clientWidth = scroll?.clientWidth;
    var scrollLeft = scroll.scrollLeft;

    var isEnd = scrollWidth - clientWidth === scrollLeft;

    if (scrollWidth > clientWidth) {
      document
        .getElementById("categoryRightButton")
        .classList.remove("invisible", "opacity-0");
      document
        .getElementById("categoryRightButton")
        .classList.add("visible", "opacity-100");
    }

    if (isEnd) {
      document
        .getElementById("categoryRightButton")
        .classList.remove("visible", "opacity-100");
      document
        .getElementById("categoryRightButton")
        .classList.add("invisible", "opacity-0");
    }

    // scroll start then left hidden button
    if (scrollLeft === 0) {
      document
        .getElementById("categoryLeftButton")
        .classList.remove("visible", "opacity-100");
      document
        .getElementById("categoryLeftButton")
        .classList.add("invisible", "opacity-0");
    }
  }
}

function rightScroll() {
  var scroll = document.getElementById("categoryList");
  var scrollLeft = scroll.scrollLeft + scrollStep;

  scroll.scrollBy({
    left: +scrollStep, // Adjust scroll distance
    behavior: "smooth",
  });

  // scroll end then right hidden button
  var scrollWidth = scroll.scrollWidth;
  var clientWidth = scroll.clientWidth;

  console.log("scrollLeft ", scrollWidth - clientWidth, scrollLeft);

  var isEnd = scrollWidth - clientWidth <= scrollLeft;

  if (isEnd) {
    document
      .getElementById("categoryRightButton")
      .classList.remove("visible", "opacity-100");
    document
      .getElementById("categoryRightButton")
      .classList.add("invisible", "opacity-0");
  }
  if (scrollLeft > 0) {
    document
      .getElementById("categoryLeftButton")
      .classList.remove("invisible", "opacity-0");
    document
      .getElementById("categoryLeftButton")
      .classList.add("visible", "opacity-100");
  }
}

function leftScroll() {
  var scroll = document.getElementById("categoryList");
  const scrollLeft = scroll.scrollLeft - scrollStep;

  scroll.scrollBy({
    left: -scrollStep, // Adjust scroll distance
    behavior: "smooth",
  });

  if (scrollLeft <= 0) {
    document
      .getElementById("categoryLeftButton")
      .classList.remove("visible", "opacity-100");
    document
      .getElementById("categoryLeftButton")
      .classList.add("invisible", "opacity-0");
  }
  if (scrollLeft < scrollStep) {
    document
      .getElementById("categoryRightButton")
      .classList.remove("invisible", "opacity-0");
    document
      .getElementById("categoryRightButton")
      .classList.add("visible", "opacity-100");
  }
}

function checkActiveSelect(selectButton, selectMenu) {
  var label = document.getElementById("typeSelectLabel");
  if (selectMenu.classList.contains("hidden")) {
    selectButton.classList.remove("border-primary");
    selectButton.classList.add("border-gray-200");
    label.classList.remove("text-primary");
    label.classList.add("text-text-disabled");
  } else {
    selectButton.classList.remove("border-gray-200");
    selectButton.classList.add("border-primary");
    label.classList.remove("text-text-disabled");
    label.classList.add("text-primary");
  }
}

function init(page) {
  const selectList = document.querySelectorAll(".select");

  if (selectList?.length > 0) {
    selectList.forEach((select) => {
      const selectButton = select.querySelector(".selectButton");
      const selectMenu = select.querySelector(".selectMenu");

      if (selectButton && selectMenu) {
        const selectItems = selectMenu.children;

        selectButton.addEventListener("click", function () {
          selectMenu.classList.toggle("hidden");
          if (selectButton.id === "typeSelect") {
            checkActiveSelect(selectButton, selectMenu);
          }
        });

        const selectTitle = selectButton.querySelector(".selectTitle");
        if (selectItems) {
          for (let i = 0; i < selectItems.length; i++) {
            const item = selectItems[i];
            item.addEventListener("click", function (event) {
              console.log(event.target?.outerHTML);
              selectTitle.innerHTML = event.target?.outerHTML;
              selectMenu.classList.add("hidden");
              if (selectButton.id === "typeSelect") {
                checkActiveSelect(selectButton, selectMenu);
              }
            });
          }
        }

        document.addEventListener("click", function (event) {
          console.log(event.target);
          if (
            !selectButton.contains(event.target) &&
            !selectMenu.contains(event.target)
          ) {
            selectMenu.classList.add("hidden");
            if (selectButton.id === "typeSelect") {
              checkActiveSelect(selectButton, selectMenu);
            }
          }
        });
      }
    });
  }

  var dropDownList = document.querySelectorAll(".toggleDropdown");

  if (dropDownList && dropDownList?.length > 0) {
    dropDownList.forEach((button) => {
      button.addEventListener("click", function () {
        const dropdownMenu =
          this.closest(".dropdownItem").querySelector(".dropdownMenu");

        document.querySelectorAll(".dropdownMenu").forEach((d) => {
          if (d !== dropdownMenu) d.classList.add("hidden");
        });
        dropdownMenu.classList.toggle("hidden");
      });
    });

    // Dropdown-ийн гадна дарж хаах
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".dropdownItem")) {
        document.querySelectorAll(".dropdownMenu").forEach((dropdown) => {
          dropdown.classList.add("hidden");
        });
      }
    });
  }
}

function init(page) {
  const selectList = document.querySelectorAll(".select");

  if (selectList?.length > 0) {
    selectList.forEach((select) => {
      const selectButton = select.querySelector(".selectButton");
      const selectMenu = select.querySelector(".selectMenu");

      if (selectButton && selectMenu) {
        const selectItems = selectMenu.children;

        selectButton.addEventListener("click", function () {
          selectMenu.classList.toggle("hidden");
        });

        const selectTitle = selectButton.querySelector(".selectTitle");
        if (selectItems) {
          for (let i = 0; i < selectItems.length; i++) {
            const item = selectItems[i];
            console.log("iotem", selectTitle);
            item.addEventListener("click", function (event) {
              console.log(event.target?.outerHTML);
              selectTitle.innerHTML = event.target?.outerHTML;
              selectMenu.classList.add("hidden");
            });
          }
        }

        document.addEventListener("click", function (event) {
          console.log(event.target);
          if (
            !selectButton.contains(event.target) &&
            !selectMenu.contains(event.target)
          ) {
            selectMenu.classList.add("hidden");
          }
        });
      }
    });
  }

  var dropDownList = document.querySelectorAll(".toggleDropdown");

  if (dropDownList && dropDownList?.length > 0) {
    dropDownList.forEach((button) => {
      button.addEventListener("click", function () {
        const dropdownMenu =
          this.closest(".dropdownItem").querySelector(".dropdownMenu");

        document.querySelectorAll(".dropdownMenu").forEach((d) => {
          if (d !== dropdownMenu) d.classList.add("hidden");
        });
        dropdownMenu.classList.toggle("hidden");
      });
    });

    // Dropdown-ийн гадна дарж хаах
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".dropdownItem")) {
        document.querySelectorAll(".dropdownMenu").forEach((dropdown) => {
          dropdown.classList.add("hidden");
        });
      }
    });
  }

  if (page === "index") {
    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      selectable: true,
      eventClick: function (info) {
        var calendarDate = new Date(info.event.startStr);

        var formattedDate = calendarDate.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        });

        const dialog = document.getElementById("modal2");
        const title = dialog.querySelector("#eventName");
        title.innerHTML = info.event.title;
        const color = dialog.querySelector("#color");
        const date = dialog.querySelector("#date");
        date.innerHTML = formattedDate;

        // color element set background style
        color.style.backgroundColor = info.event?.backgroundColor || "#3788d8";
        dialog.classList.remove("hidden"); // Dialog нээх
        document.body.style.overflow = "hidden"; // Body scroll-ыг нуух
      },
      dateClick: function (info) {
        // alert("Clicked on: " + info.dateStr);
        // alert("Coordinates: " + info.jsEvent.pageX + "," + info.jsEvent.pageY);
        // alert("Current view: " + info.view.type);
        // change the day's background color just for fun
        // info.dayEl.style.backgroundColor = "red";
        const dialog = document.getElementById("modal");
        dialog.classList.remove("hidden"); // Dialog нээх
        document.body.style.overflow = "hidden"; // Body scroll-ыг нуух
        const title = document.getElementById("title");
        title.innerHTML = info.dateStr;
      },
      select: function (info) {
        // alert("selected " + info.startStr + " to " + info.endStr);
        const dialog = document.getElementById("modal");
        dialog.classList.remove("hidden"); // Dialog нээх
        document.body.style.overflow = "hidden"; // Body scroll-ыг нуух
        const title = document.getElementById("title");
        title.innerHTML = info.startStr + " - " + info.endStr;
      },
      headerToolbar: {
        left: "prev,next title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,list",
      },
      buttonText: {
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
        list: "List",
      },
      events: [
        {
          title: "All Day Event",
          start: "2025-03-01",
          color: "#43455c",
          backgroundColor: "#43455c",
        },
        {
          title: "Long Event",
          start: "2025-03-07",
          end: "2025-03-10",
          color: "#dc455c",
          backgroundColor: "#dc455c",
        },
        {
          groupId: "999",
          title: "Repeating Event",
          start: "2025-03-09T16:00:00",
          color: "#d1e55c",
          backgroundColor: "#d1e55c",
        },
        {
          groupId: "999",
          title: "Repeating Event",
          start: "2025-03-16T16:00:00",
          color: "#d1e55c",
          backgroundColor: "#d1e55c",
        },
        {
          title: "Conference",
          start: "2025-03-11",
          end: "2025-03-13",
        },
        {
          title: "Meeting",
          start: "2025-03-12T10:30:00",
          end: "2025-03-12T12:30:00",
        },
        {
          title: "Lunch",
          start: "2025-03-12T12:00:00",
        },
        {
          title: "Meeting",
          start: "2025-03-12T14:30:00",
        },
        {
          title: "Birthday Party",
          start: "2025-03-13T07:00:00",
        },
        {
          title: "Click for Google",
          url: "https://google.com/",
          start: "2025-03-28",
          color: "43455c",
          backgroundColor: "43455c",
          textColor: "white",
        },
      ],
    });
    calendar.render();

    // Dialog нээх товч
    const openButton = document.getElementById("openModal");
    if (openButton) {
      openButton.addEventListener("click", function () {
        const dialog = document.getElementById("modal");
        dialog.classList.remove("hidden"); // Dialog нээх
        document.body.style.overflow = "hidden"; // Body scroll-ыг нуух
      });
    }

    // Dialog хаах товч\

    // Dialog-ийн гадна дарж хаах
    const closeButtons = document.querySelectorAll(".closeModal");

    closeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const dialog = document.getElementById("modal");
        dialog.classList.add("hidden"); // Dialog хаах
        document.body.style.overflow = "auto"; // Body scroll-ыг сэргээх
      });
    });

    document
      .getElementById("modal")
      .addEventListener("click", function (event) {
        if (event.target.id === "modal") {
          event.target?.classList?.add("hidden"); // Dialog хаах
          document.body.style.overflow = "auto"; // Body scroll-ыг сэргээх
        }
      });
  }
}

window.addEventListener("resize", initScroll);
window.addEventListener("load", initScroll);

function selectCategory(e) {
  e.preventDefault();
  var category = e.target;
  var allCategoryList = document.getElementById("categoryList").children;

  for (var i = 0; i < allCategoryList.length; i++) {
    allCategoryList[i].classList.remove("activeCategoryItem");
    allCategoryList[i].classList.add("inactiveCategoryItem");

    if (category === allCategoryList[i]) {
      var tabs = document.getElementById("tabs").children;
      for (var j = 0; j < tabs.length; j++) {
        if (i === j) {
          tabs[j].classList.remove("hidden");
        } else {
          tabs[j].classList.add("hidden");
        }
      }
    }
  }
  category.classList.remove("inactiveCategoryItem");
  category.classList.add("activeCategoryItem");
}

function closeEventModal() {
  const dialog = document.getElementById("modal2");
  if (dialog) {
    dialog.classList?.add("hidden"); // Dialog хаах
    document.body.style.overflow = "auto"; // Body scroll-ыг сэргээх
  }
}
