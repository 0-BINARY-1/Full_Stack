let name = document.getElementById("name");
let description = document.getElementById("description");
let profile = document.getElementById("profile");
let toggleButton = document.getElementById("toggleProfile");

// Change the profile text.
document.getElementById("changeText").addEventListener("click", function () {
  name.textContent = "Welcome! I am learning JavaScript DOM.";
  description.textContent =
    "I can now use JavaScript to make webpages interactive.";
});

// Change the profile style.
document.getElementById("changeStyle").addEventListener("click", function () {
  profile.classList.toggle("dark-profile");
});

// Hide or show the profile.
toggleButton.addEventListener("click", function () {
  if (profile.style.display === "none") {
    profile.style.display = "block";
    toggleButton.textContent = "Hide Profile";
  } else {
    profile.style.display = "none";
    toggleButton.textContent = "Show Profile";
  }
});