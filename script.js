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







const localTimeEl = document.getElementById("local-time");
const shanghaiTimeEl = document.getElementById("shanghai-time");
const conclusionEl = document.getElementById("conclusion");

function updateClocks() {
  const now = new Date();

  // heure locale
  localTimeEl.textContent = now.toLocaleTimeString();

  // heure Shanghai
  const shanghaiTime = now.toLocaleTimeString("fr-FR", {
    timeZone: "Asia/Shanghai"
  });

  shanghaiTimeEl.textContent = shanghaiTime;

  // conclusion intelligente
  const shanghaiHour = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Shanghai",
    hour: "numeric",
    hour12: false
  });

  let conclusion = "";

  if (shanghaiHour >= 0 && shanghaiHour < 6) {
    conclusion = "Vous pouvez bien sur m’appeler (réitérez un peu si le combiné ne décroche pas du premier coup).";
  } else if (shanghaiHour < 12) {
    conclusion = "Réveillé ! Vous pouvez m’appeler. Heure du petit-déjeuner, dilemme entre tenir mon bol ou le téléphone";
  } else if (shanghaiHour < 22) {
    conclusion = "Réveillé ! Vous pouvez m’appeler, mais il est probable que je sois occupé à manger ou à chercher en vain un panda.";
  } else {
    conclusion = "Bonne initiative, c'est effectivement une très bonne idée d’appeler.";
  }

  conclusionEl.textContent = conclusion;
}



document.querySelector("h1").addEventListener("click", () => {
  alert("Je crois que je vous aime fort ❤️");
});

document.querySelector(".countdown").addEventListener("click", () => {
  alert("Je vais à la plage avec ma petite amie en août !!! ❤️ Je crois (j'en suis sur même) que je suis amoureux");
});

// mise à jour chaque seconde
setInterval(updateClocks, 1000);
updateClocks();

// lancement auto
updateCountdown();
intervalId = setInterval(updateCountdown, 1000);