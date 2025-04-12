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

  if (page === "edit-profile") {
    // Datepicker идэвхжүүлэх
    datepicker("#datepickerInput", {
      formatter: (input, date, instance) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        input.value = `${year}-${month}-${day}`; // yyyy-mm-dd форматаар харуулах
      },
      startDay: 1, // Даваа гарагаас эхлэх

      overlayButton: "Select", // Overlay товчны текст
      overlayPlaceholder: "Please enter year", // Overlay placeholder
    });

    document
      .getElementById("toggleSwitch")
      .addEventListener("change", function () {
        const toggleSwitch = document.getElementById("toggleSwitch");
        if (toggleSwitch.checked) {
          console.log("Switch идэвхжүүлэгдсэн");
        } else {
          console.log("Switch идэвхгүйжсэн");
        }
      });

    document
      .getElementById("fileInput")
      .addEventListener("change", function (event) {
        var image = document.getElementById("avatarImage");
        var emptyImage = document.getElementById("avatarEmpty");
        const file = event.target.files[0]; // Сонгосон файлыг авах
        if (file) {
          const reader = new FileReader(); // Файл унших объект үүсгэх
          reader.onload = function (e) {
            // Зургийг avatar-д харуулах

            image.src = e.target.result;
            image.classList.remove("hidden");
            emptyImage.classList.add("hidden");
          };
          reader.readAsDataURL(file); // Файлыг унших
        } else {
          image.classList.add("hidden");
          emptyImage.classList.remove("hidden");
        }
      });
  }

  if (page === "index2") {
    // Dialog-ийн гадна дарж хаах
    const dialog = document.getElementById("modal");
    const dialogOpenButton = document.getElementById("openModal");
    const dialogCloseButton = document.getElementById("closeModal");

    if (dialog) {
      // Dialog нээх товч
      if (dialogOpenButton) {
        dialogOpenButton.addEventListener("click", function () {
          dialog.classList.remove("hidden"); // Dialog нээх
          document.body.style.overflow = "hidden"; // Body scroll-ыг нуух
        });
      }

      // Dialog хаах товч
      if (dialogCloseButton) {
        dialogCloseButton.addEventListener("click", function () {
          dialog.classList.add("hidden"); // Dialog хаах
          document.body.style.overflow = "auto"; // Body scroll-ыг сэргээх
        });
      }

      dialog.addEventListener("click", function (event) {
        if (event.target.id === "modal") {
          event.target?.classList?.add("hidden"); // Dialog хаах
          document.body.style.overflow = "auto"; // Body scroll-ыг сэргээх
        }
      });
    }
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
