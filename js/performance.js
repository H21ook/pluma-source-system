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
    const ctx = document.getElementById("myChart").getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(248, 166, 152, 0.6)");
    gradient.addColorStop(1, "rgba(255,255,255, 0)");

    let myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Week 1 ", "", "Week 2 ", "", "Week 3 ", "", "Week 4 "],
        datasets: [
          {
            label: "Page Views",
            data: [2, 5.7, 3.7, 8, 4, 7, 5],
            backgroundColor: gradient,
            borderColor: "#f8a698",
            borderWidth: 2,
            fill: "start",
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            padding: {
              left: 10,
              top: 8,
              right: 10,
              bottom: 8,
            },
            backgroundColor: "#111827",
            titleColor: "#919EAB",
            titleFont: {
              size: 14,
              weight: 500,
            },
            bodyColor: "#ffffff",
            boxHeight: 8,
            boxWidth: 8,
            boxPadding: 4,
            bodyFont: {
              size: 12,
              weight: 500,
              lineHeight: 1.2,
            },
            labelColors: {},
            callbacks: {
              labelColor: function (context) {
                return {
                  backgroundColor: "#F8A698",
                  borderColor: "#F8A698",
                  borderWidth: 5,
                  borderRadius: 4,
                };
              },
              label: function (tooltipItem, data) {
                return tooltipItem.formattedValue;
              },
            },
          },
        },

        tension: 0.3,
        responsive: true,
        scales: {
          y: {
            ticks: {
              stepSize: 2,
              color: "#637381",
              font: {
                size: 12, // 'size' now within object 'font {}'
              },
            },
            grid: {
              display: false, // Hide grid lines on x-axis
            },
            beginAtZero: true,
          },
          x: {
            grid: {
              display: false, // Hide grid lines on x-axis
            },
            ticks: {
              color: "#637381",
              font: {
                size: 12, // 'size' now within object 'font {}'
              },
              stepSize: 0.5,
            },
          },
        },
        layout: {
          padding: 0,
        },
      },
    });

    const ctx2 = document.getElementById("myChart2").getContext("2d");

    const gradient2 = ctx2.createLinearGradient(0, 0, 0, 400);
    gradient2.addColorStop(0, "rgba(248, 166, 152, 0.6)");
    gradient2.addColorStop(1, "rgba(255,255,255, 0)");

    let myChart2 = new Chart(ctx2, {
      type: "line",
      data: {
        labels: ["Week 1 ", "", "Week 2 ", "", "Week 3 ", "", "Week 4 "],
        datasets: [
          {
            label: "Page Views",
            data: [2, 5.7, 3.7, 8, 4, 7, 5],
            backgroundColor: gradient,
            borderColor: "#f8a698",
            borderWidth: 2,
            fill: "start",
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            padding: {
              left: 10,
              top: 8,
              right: 10,
              bottom: 8,
            },
            backgroundColor: "#111827",
            titleColor: "#919EAB",
            titleFont: {
              size: 14,
              weight: 500,
            },
            bodyColor: "#ffffff",
            boxHeight: 8,
            boxWidth: 8,
            boxPadding: 4,
            bodyFont: {
              size: 12,
              weight: 500,
              lineHeight: 1.2,
            },
            labelColors: {},
            callbacks: {
              labelColor: function (context) {
                return {
                  backgroundColor: "#F8A698",
                  borderColor: "#F8A698",
                  borderWidth: 5,
                  borderRadius: 4,
                };
              },
              label: function (tooltipItem, data) {
                return tooltipItem.formattedValue;
              },
            },
          },
        },

        tension: 0.3,
        responsive: true,
        scales: {
          y: {
            ticks: {
              stepSize: 2,
              color: "#637381",
              font: {
                size: 12, // 'size' now within object 'font {}'
              },
            },
            grid: {
              display: false, // Hide grid lines on x-axis
            },
            beginAtZero: true,
          },
          x: {
            grid: {
              display: false, // Hide grid lines on x-axis
            },
            ticks: {
              color: "#637381",
              font: {
                size: 12, // 'size' now within object 'font {}'
              },
              stepSize: 0.5,
            },
          },
        },
        layout: {
          padding: 0,
        },
      },
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
