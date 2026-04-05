const message = document.getElementById("message");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");



// Date FIXE UTC+8 30 avril 2026 05:30
const targetDate = new Date("2026-04-29T21:30:00Z");

let intervalId = null;

function pad(value) {
  return String(value).padStart(2, "0");
}

function setMessage(text, type = "") {
  message.textContent = text;
  message.className = `message ${type}`.trim();
}

function updateCountdown() {
  const now = new Date();
  const delta = targetDate - now;

  if (delta <= 0) {
    clearInterval(intervalId);
    setMessage("Etes-vous dans mes bras ? Non ? Qu'attendez vous ?", "success");

    daysEl.textContent = "0";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const totalSeconds = Math.floor(delta / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = days;
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}



// lancement auto
updateCountdown();
intervalId = setInterval(updateCountdown, 1000);