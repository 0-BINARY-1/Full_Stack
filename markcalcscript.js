function calculateMarks() {
  let ids = ["english", "math", "science", "nepali", "computer"];

  let marks = ids.map(id =>
    Number(document.getElementById(id).value)
  );

  let result = document.getElementById("result");

  // Validate all five marks.
  let inputs = ids.map(id => document.getElementById(id));

  if (inputs.some(input => input.value.trim() === "") ||
      marks.some(mark => !Number.isFinite(mark) || mark < 0 || mark > 100)) {
    result.textContent = "Enter a valid mark from 0 to 100 for every subject.";
    return;
  }

  let total = marks.reduce((sum, mark) => sum + mark, 0);
  let average = total / marks.length;
  let percentage = (total / 500) * 100;

  let grade;

  if (percentage >= 90) {
    grade = "A+";
  } else if (percentage >= 80) {
    grade = "A";
  } else if (percentage >= 70) {
    grade = "B";
  } else if (percentage >= 60) {
    grade = "C";
  } else if (percentage >= 50) {
    grade = "D";
  } else {
    grade = "Fail";
  }

  result.textContent =
    `Total: ${total}/500 | Average: ${average.toFixed(2)} | ` +
    `Percentage: ${percentage.toFixed(2)}% | Grade: ${grade}`;
}