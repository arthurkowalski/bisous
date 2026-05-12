const message = document.getElementById("message");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");



// Date FIXE UTC+8 30 avril 2026 05:30
const targetDate = new Date("2026-06-13T8:05:00Z");

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

  if (shanghaiHour >= 0 && shanghaiHour < 2) {
    conclusion = "Le village s'endort à Shanghai mais petite marmotte peut passer un coup de fil à son amoureux ! (Avez-vous réussi à lire les 9 messages horaires différents ?)";
  } else if (shanghaiHour < 7) {
    conclusion = "Surement sous gros didi, non dodo, vous pouvez bien sur m’appeler (réitérez un peu si le combiné ne décroche pas du premier coup).";
  } else if (shanghaiHour < 9) {
    conclusion = "Oui c'est une heure pour se réveiller en chine, mais quel luxe de grasse-matiner (je décrète que c'est un verbe). Aidez-moi à me tirer du sommeil en m'appelant !.";
  } else if (shanghaiHour < 10) {
    conclusion = "Réveillé ! Vous pouvez m’appeler. Heure du petit-déjeuner, dilemme entre tenir mon bol ou le téléphone";
  } else if (shanghaiHour < 12) {
    conclusion = "Réveillé ! Vous pouvez m’appeler, mais il est probable que je participe à un cours de Français débutant.";
  } else if (shanghaiHour < 14) {
    conclusion = "Réveillé ! Vous pouvez m’appeler, mais il est probable que je me délecte d'un petit yaourt tarte tatin.";
  } else if (shanghaiHour < 19) {
    conclusion = "Réveillé ! Vous pouvez m’appeler, mais je suis surement en cours de FLE (ne vous méprenez pas, il ne s'agit pas de mécanique des fluides mais bien de Français Langue Etrangère).";
  } else {
    conclusion = "Fin de journée, c'est effectivement une très bonne idée d’appeler (je suis surement en train de cocher cette journée dans mon calendrier).";
  }

  conclusionEl.textContent = conclusion;
}



document.querySelector("h1").addEventListener("click", () => {
  alert("Je crois que je vous aime fort ❤️ et grâce à vous j'ai pour la première fois hâte de la rentrée. Savez-vous pourquoi ?");
});

document.querySelector(".time-box").addEventListener("click", () => {
  alert("Je vais à la plage avec ma petite amie en août !!! ❤️ Je crois (j'en suis sur même) que je suis amoureux");
});


const speedBtn = document.getElementById("speed-btn");

let attempts = 0;

speedBtn.addEventListener("click", () => {
  attempts++;

  if (attempts === 1) {
    alert("J'aimerais tellement que ce bouton marche !");
  } else if (attempts === 2) {
    alert("Malheureusement, je ne trouve pas le moyen de lier la fonctionnalité du bouton à la réalité.");  
  } else if (attempts === 3) {
    alert("S'il vous plaît, n'appuyez pas trop et laissez moi un peu de temps pour réviser mes partiels");  
  } else if (attempts === 4) {
    alert("Rectification, je n'ai pas de partiels, vous pouvez réappuyer.");  
  } else if (attempts === 5) {
    alert('Work in progress... ("bruits de Festool")');  
  } lse if (attempts === 6) {
    alert("Votre petit ami a beau être fort, il n'est pas Dieu. A la place, que diriez-vous d'un petit bisou à chaque fois que vous cliquez sur ce bouton ?");  
  } else {
    alert("Hop, un bisou de plus !");
  }
});


// mise à jour chaque seconde
setInterval(updateClocks, 1000);
updateClocks();

// lancement auto
updateCountdown();
intervalId = setInterval(updateCountdown, 1000);