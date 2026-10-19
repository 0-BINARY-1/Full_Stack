function updateClock() {
  let now = new Date();

  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  let seconds = String(now.getSeconds()).padStart(2, "0");

  document.getElementById("clock").textContent =
    `${hours}:${minutes}:${seconds}`;

  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  document.getElementById("date").textContent =
    now.toLocaleDateString("en-US", options);
}

updateClock();

setInterval(updateClock, 1000);