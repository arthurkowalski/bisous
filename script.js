const dateInput = document.getElementById("dateInput");
const startBtn = document.getElementById("startBtn");
const demoBtn = document.getElementById("demoBtn");
const message = document.getElementById("message");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

let intervalId = null;
let targetDate = null;

function pad(value) {
  return String(value).padStart(2, "0");
}

function setMessage(text, type = "") {
  message.textContent = text;
  message.className = `message ${type}`.trim();
}

function resetCountdown() {
  daysEl.textContent = "0";
  hoursEl.textContent = "0";
  minutesEl.textContent = "0";
  secondsEl.textContent = "0";
}

function updateCountdown() {
  if (!targetDate) return;

  const now = new Date();
  const delta = targetDate - now;

  if (delta <= 0) {
    clearInterval(intervalId);
    intervalId = null;
    resetCountdown();
    setMessage("La date est atteinte.", "success");
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

function startCountdown() {
  const rawValue = dateInput.value;

  if (!rawValue) {
    setMessage("Merci de choisir une date valide.", "error");
    return;
  }

  const parsedDate = new Date(rawValue);

  if (Number.isNaN(parsedDate.getTime())) {
    setMessage("Le format de date est invalide.", "error");
    return;
  }

  if (parsedDate <= new Date()) {
    setMessage("La date doit être dans le futur.", "error");
    return;
  }

  targetDate = parsedDate;
  setMessage("Compte à rebours lancé.", "success");

  if (intervalId) {
    clearInterval(intervalId);
  }

  updateCountdown();
  intervalId = setInterval(updateCountdown, 1000);
}

function setDemoDate() {
  const demo = new Date();
  demo.setDate(demo.getDate() + 10);
  demo.setHours(demo.getHours() + 3);
  demo.setMinutes(demo.getMinutes() + 25);

  const year = demo.getFullYear();
  const month = pad(demo.getMonth() + 1);
  const day = pad(demo.getDate());
  const hours = pad(demo.getHours());
  const minutes = pad(demo.getMinutes());

  dateInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
  setMessage("Date d'exemple remplie.");
}

startBtn.addEventListener("click", startCountdown);
demoBtn.addEventListener("click", setDemoDate);

resetCountdown();