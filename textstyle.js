function analyzeText() {
  let text = document.getElementById("textInput").value;
  let result = document.getElementById("result");
  let name = "John Doe"; // Replace with your name
  let course = "Full Stack Development"; // Replace with your course name
  let info = `Hello, ${name}! Welcome to ${course}.`;
  let cleanText = text.trim();

  if (cleanText === "") {
    result.textContent = "Please enter some text first.";
    return;
  }

  let words = cleanText.split(/\s+/);

  // Escape user input before inserting it into HTML.
  let safeText = cleanText
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  result.innerHTML = `
    <h2>Analysis Result</h2>
    <p><strong>Original text:</strong> ${safeText}</p>
    <p><strong>Character count:</strong> ${cleanText.length}</p>
    <p><strong>Word count:</strong> ${words.length}</p>
    <p><strong>Uppercase:</strong> ${cleanText.toUpperCase()}</p>
    <p><strong>Lowercase:</strong> ${cleanText.toLowerCase()}</p>
    <p><strong>Contains JavaScript:</strong>
      ${cleanText.toLowerCase().includes("javascript") ? "Yes" : "No"}
    </p>
    <p><strong>${info}</strong>
  `;
}