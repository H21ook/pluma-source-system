function onChangeOtp(e) {
  const value = e.target.value;
  if (value.length > 1) {
    e.target.value = value[1];
  }
  const parentOtp = document.getElementById("otp");
  const childrenOtp = parentOtp.children;

  for (let i = 0; i < childrenOtp.length; i++) {
    const currentInput = childrenOtp.item(i);
    if (currentInput.id === e.target.id && i < childrenOtp.length) {
      const nextInput = childrenOtp.item(i + 1);
      if (nextInput) {
        nextInput.focus();
      }
    }
  }
}

let timer;

function startCountdown() {
  clearTimeout(timer);
  let timeLeft = 120; // 120 seconds
  const timerSpan = document.getElementById("countdownTimer");
  const resendButton = document.getElementById("timerReset");
  timerSpan.classList.remove("hidden");
  resendButton.classList.add("hidden");

  function updateTimer() {
    // from 90 secs countdown
    let seconds = timeLeft < 10 ? `0${timeLeft}` : timeLeft;
    timerSpan.textContent = `${timeLeft} секунд`;

    if (timeLeft === 0) {
      timerSpan.textContent = "";
      resendButton.classList.remove("hidden");
      timerSpan.classList.add("hidden");
      return;
    }

    timeLeft--;
    timer = setTimeout(updateTimer, 1000);
  }

  updateTimer();
}

function switchTab(tabId) {
  // Бүх tab контентуудыг нуух
  document.querySelectorAll("[data-tab-content]").forEach((content) => {
    content.classList.add("hidden");
  });

  // Сонгогдсон tab контентыг харуулах

  //   console.log("123 ", document.querySelector('[data-tab="tab1"]'));
  const selectedContent = document.querySelector(
    `[data-tab-content="${tabId}"]`
  );

  const tab = document.querySelector(`[data-tab]`);

  if (tab) {
    tab.setAttribute("data-tab", tabId);
  }
  if (selectedContent) {
    selectedContent.classList.remove("hidden");
  }
}

// Анхны tab-ыг идэвхжүүлэх

function init(page) {
  if (page === "register") {
    switchTab("tab1");
  }
}
