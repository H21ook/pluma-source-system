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

  const words = [
    ["Монгол", 80],
    ["Хэл", 65],
    ["Бич", 45],
    ["Технологи", 90],
    ["Програм", 30],
    ["Код", 55],
    ["Хөгжим", 70],
    ["Урлаг", 25],
    ["Спорт", 85],
    ["Шинжлэх", 40],
    ["Ухаан", 95],
    ["Тоглоом", 20],
    ["Аялал", 60],
    ["Ном", 75],
    ["Сургууль", 50],
    ["Багш", 35],
    ["Оюутан", 88],
    ["Хичээл", 15],
    ["Гэр", 72],
    ["Гэр бүл", 62],
    ["Найз", 48],
    ["Хайр", 92],
    ["Амьдрал", 28],
    ["Эрүүл", 67],
    ["Мөрөөдөл", 53],
    ["Зорилго", 82],
    ["Амжилт", 39],
    ["Баяр", 76],
    ["Инээмсэглэл", 24],
    ["Итгэл", 61],
    ["Хүч", 89],
    ["Тэмцэл", 33],
    ["Ялалт", 71],
    ["Урам", 47],
    ["Бүтээл", 84],
    ["Ирээдүй", 29],
    ["Өнгөрсөн", 66],
    ["Одоо", 54],
    ["Цаг", 91],
    ["Хувьсал", 41],
    ["Шинэ", 78],
    ["Хуучин", 26],
    ["Түүх", 64],
    ["Соёл", 87],
    ["Уламжлал", 32],
    ["Байгаль", 73],
    ["Амьтан", 49],
    ["Ургамал", 81],
    ["Далай", 37],
    ["Уул", 69],
  ];

  WordCloud(document.getElementById("word-cloud"), {
    list: words,
    gridSize: 8, // Үгсийн хоорондын зай
    weightFactor: 0.3, // Давтамжийн хэмжээг хэрхэн томруулах (тохируулж болно)
    color: "random-dark", // Санамсаргүй өнгө
    backgroundColor: "#fff", // Дэвсгэр өнгө
    rotateRatio: 0, // Хазайлтын хувь (0-1)
    shuffle: true, // Санамсаргүй байршуулах
  });
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
