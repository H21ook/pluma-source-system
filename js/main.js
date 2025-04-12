var scrollStep = 100;

function initScroll() {
  var scroll = document.getElementById("categoryList");

  if (scroll) {
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
    // Drawer нээх товч
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

  if (page === "index") {
    initScroll();
    document
      .getElementById("categoryRightButton")
      .addEventListener("click", rightScroll);
    document
      .getElementById("categoryLeftButton")
      .addEventListener("click", leftScroll);
  }

  if (page === "payment" || page === "exam-detail") {
    // Dialog нээх товч
    document.getElementById("openModal").addEventListener("click", function () {
      const dialog = document.getElementById("modal");
      dialog.classList.remove("hidden"); // Dialog нээх
      document.body.style.overflow = "hidden"; // Body scroll-ыг нуух
    });

    // Dialog хаах товч
    document
      .getElementById("closeModal")
      .addEventListener("click", function () {
        const dialog = document.getElementById("modal");
        dialog.classList.add("hidden"); // Dialog хаах
        document.body.style.overflow = "auto"; // Body scroll-ыг сэргээх
      });

    // Dialog-ийн гадна дарж хаах
    document
      .getElementById("modal")
      .addEventListener("click", function (event) {
        if (event.target.id === "modal") {
          event.target?.classList?.add("hidden"); // Dialog хаах
          document.body.style.overflow = "auto"; // Body scroll-ыг сэргээх
        }
      });
  }

  if (page === "detail") {
    // timer hours, minutes, seconds countdown from now + 12 hours
    var distance = 12 * 60 * 60 * 1000;
    // 1 minut
    // var distance = 1 * 60 * 1000;
    var x = setInterval(function () {
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const tElement = document.getElementById("timer");
      const hElement = document.getElementById("hours");
      const mElement = document.getElementById("minutes");
      const sElement = document.getElementById("seconds");

      if (tElement && hElement && mElement && sElement) {
        tElement.classList.remove("hidden");
        // tho digits display
        if (hours < 10) {
          hours = "0" + hours;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        hElement.innerHTML = hours;
        mElement.innerHTML = minutes;
        sElement.innerHTML = seconds;

        if (distance < 0) {
          clearInterval(x);
          tElement.classList.add("hidden");
        }
        distance -= 1000;
      }
    }, 1000);
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
