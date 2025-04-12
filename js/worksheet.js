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

function closeDrawer() {
  const drawer = document.getElementById("drawer");
  drawer.classList.add("translate-x-full"); // Drawer хаах
  document.body.style.overflow = "auto"; // Body scroll-ыг сэргээх
}

function init(page) {
  if (page !== "exam-detail") {
    var drawer = document.getElementById("openDrawer");
    // Drawer нээх товч
    if (drawer) {
      document
        .getElementById("openDrawer")
        .addEventListener("click", function () {
          const drawer = document.getElementById("drawer");
          drawer.classList.remove("translate-x-full"); // Drawer нээх
          document.body.style.overflow = "hidden"; // Body scroll-ыг нуух
        });

      var drawerCloseButton = document.getElementById("closeDrawer");
      if (drawerCloseButton) {
        // Drawer хаах товч
        document
          .getElementById("closeDrawer")
          .addEventListener("click", closeDrawer);
      }

      //window resize md-ээс дээш хэмжээтэй бол drawer хаах
      window.addEventListener("resize", function () {
        if (window.innerWidth >= 768) {
          closeDrawer();
        }
      });

      document.addEventListener("click", function (event) {
        const drawer = document.getElementById("drawer");
        const openDrawerButton = document.getElementById("openDrawer");

        // Drawer-ийн дотор эсвэл openDrawer товч дээр дарсан эсэхийг шалгах
        if (
          !drawer.contains(event.target) &&
          !openDrawerButton.contains(event.target)
        ) {
          closeDrawer();
        }
      });
    }
  }

  if (page === "index") {
    initScroll();
    // document
    //   .getElementById("categoryRightButton")
    //   .addEventListener("click", rightScroll);
    // document
    //   .getElementById("categoryLeftButton")
    //   .addEventListener("click", leftScroll);
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

  if (page === "new-source") {
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
    // document
    //   .getElementById("closeModal")
    //   .addEventListener("click", function () {
    //     const dialog = document.getElementById("modal");
    //     dialog.classList.add("hidden"); // Dialog хаах
    //     document.body.style.overflow = "auto"; // Body scroll-ыг сэргээх
    //   });

    // Dialog-ийн гадна дарж хаах
    document
      .getElementById("modal")
      .addEventListener("click", function (event) {
        if (event.target.id === "modal") {
          event.target?.classList?.add("hidden"); // Dialog хаах
          document.body.style.overflow = "auto"; // Body scroll-ыг сэргээх
        }
      });

    const radios = document.getElementsByName("sourceType");

    if (radios) {
      radios.forEach((radio) => {
        radio.addEventListener("change", function () {
          if (this.value === "group") {
            document.getElementById("groupSelect").classList.remove("hidden");
            document.getElementById("branchSelect").classList.add("hidden");
          } else if (this.value === "branch") {
            document.getElementById("branchSelect").classList.remove("hidden");
            document.getElementById("groupSelect").classList.add("hidden");
          } else {
            document.getElementById("groupSelect").classList.add("hidden");
            document.getElementById("branchSelect").classList.add("hidden");
          }
        });
      });
    }
  }

  var dropdown = document.getElementById("dropdownButton");
  if (dropdown) {
    document
      .getElementById("dropdownButton")
      .addEventListener("click", function () {
        const dropdownMenu = document.getElementById("dropdownMenu");
        dropdownMenu.classList.toggle("hidden");
      });

    // Dropdown-ийн гадна дарж хаах
    document.addEventListener("click", function (event) {
      const dropdownButton = document.getElementById("dropdownButton");
      const dropdownMenu = document.getElementById("dropdownMenu");
      if (
        !dropdownButton.contains(event.target) &&
        !dropdownMenu.contains(event.target)
      ) {
        dropdownMenu.classList.add("hidden");
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
  }
  category.classList.remove("inactiveCategoryItem");
  category.classList.add("activeCategoryItem");
}
