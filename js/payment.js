var scrollStep = 100;
var currentStep = 1; // Default step

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
  const buttons = document.querySelectorAll(".toggleButton");

  if (buttons) {
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        const target = button.getAttribute("data-active");
        if (target === "true") {
          button.setAttribute("data-active", "false");
        } else {
          button.setAttribute("data-active", "true");
        }
      });
    });
  }

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
            item.addEventListener("click", function (event) {
              selectTitle.innerHTML = event.target?.outerHTML;
              selectMenu.classList.add("hidden");
            });
          }
        }

        document.addEventListener("click", function (event) {
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
    renderSteps();
    // Dialog нээх товч
    document.getElementById("openModal").addEventListener("click", function () {
      const dialog = document.getElementById("modal");
      dialog.classList.remove("hidden"); // Dialog нээх
      document.body.style.overflow = "hidden"; // Body scroll-ыг нуух
    });

    // Dialog хаах товч
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

function renderSteps() {
  const steps = document.getElementById("steps");
  if (steps) {
    const indicator = steps.querySelector("#indicator");
    if (indicator) {
      if (currentStep > 1) {
        document.getElementById("backStep").classList.remove("hidden");
        document.getElementById("closeModal").classList.add("hidden");
      } else {
        document.getElementById("backStep").classList.add("hidden");
        document.getElementById("closeModal").classList.remove("hidden");
      }

      if (indicator.children.length === currentStep) {
        document.getElementById("checkPayment").classList.remove("hidden");
        document.getElementById("nextStep").classList.add("hidden");
      } else {
        document.getElementById("checkPayment").classList.add("hidden");
        document.getElementById("nextStep").classList.remove("hidden");
      }

      for (let i = 0; i < indicator.children.length; i++) {
        const item = indicator.children[i];

        if (i + 1 <= currentStep) {
          item.classList.add("bg-primary");
          item.classList.remove("bg-gray-200");
        } else {
          item.classList.add("bg-gray-200");
          item.classList.remove("bg-primary");
        }
      }

      const contents = steps.querySelectorAll(`.stepContent`);

      contents.forEach((content) => {
        if (content.id === `step${currentStep}`) {
          content.classList.remove("hidden");
        } else {
          content.classList.add("hidden");
        }
      });
    }
  }
}

function nextStep() {
  currentStep++;
  renderSteps();
}

function prevStep() {
  currentStep--;
  renderSteps();
}
