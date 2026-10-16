let form = document.getElementById("registrationForm");
let fullName = document.getElementById("fullName");
let email = document.getElementById("email");
let course = document.getElementById("course");
let namePreview = document.getElementById("namePreview");
let result = document.getElementById("result");

// Event 1: Update the name preview as the user types.
fullName.addEventListener("input", function () {
  namePreview.textContent =
    fullName.value.trim() || "Your name will appear here.";
});

// Event 2: Highlight the name field when focused.
fullName.addEventListener("focus", function () {
  fullName.style.backgroundColor = "#eaf2f8";
});

// Event 3: Restore the background when the field loses focus.
fullName.addEventListener("blur", function () {
  fullName.style.backgroundColor = "white";
});

// Event 4: Respond to form submission.
form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (fullName.value.trim().length < 2) {
    result.textContent = "Please enter a valid name.";
    fullName.focus();
    return;
  }

  result.textContent =
    `Thank you, ${fullName.value.trim()}! ` +
    `Your selected course is ${course.value}. ` +
    `Email: ${email.value}`;
});