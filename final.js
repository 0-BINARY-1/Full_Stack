
"use strict";

// 1. Select HTML elements
const studentForm = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const courseInput = document.getElementById("course");
const marksInput = document.getElementById("marks");
const studentList = document.getElementById("studentList");
const searchInput = document.getElementById("searchInput");
const totalStudents = document.getElementById("totalStudents");
const averageMarks = document.getElementById("averageMarks");
const emptyMessage = document.getElementById("emptyMessage");

// 2. Load saved data from localStorage
function loadStudents() {
  try {
    const savedData = localStorage.getItem("students");

    if (savedData === null) {
      return [];
    }

    const parsedData = JSON.parse(savedData);

    // Check that the saved value is an array.
    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error("Could not load student data:", error);
    return [];
  }
}

let students = loadStudents();

// 3. Save data
function saveStudents() {
  try {
    localStorage.setItem("students", JSON.stringify(students));
  } catch (error) {
    console.error("Could not save student data:", error);
    alert("Unable to save data in this browser.");
  }
}

// 4. Display student records
function displayStudents(records = students) {
  studentList.replaceChildren();

  emptyMessage.hidden = records.length !== 0;

  records.forEach(function(student) {
    const item = document.createElement("li");
    item.className = "student-item";

    const info = document.createElement("div");
    info.className = "student-info";

    const title = document.createElement("strong");
    title.textContent = student.name;

    const details = document.createElement("p");
    details.textContent =
      `Course: ${student.course} | Marks: ${student.marks}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.type = "button";

    deleteButton.addEventListener("click", function() {
      deleteStudent(student.id);
    });

    info.append(title, details);
    item.append(info, deleteButton);
    studentList.appendChild(item);
  });

  updateStatistics();
}

// 5. Update dashboard statistics
function updateStatistics() {
  totalStudents.textContent = students.length;

  const totalMarks = students.reduce(function(sum, student) {
    return sum + student.marks;
  }, 0);

  const average = students.length
    ? totalMarks / students.length
    : 0;

  averageMarks.textContent = average.toFixed(2);
}

// 6. Add a new student
studentForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const course = courseInput.value.trim();
  const marks = Number(marksInput.value);

  if (!name || !course) {
    alert("Please enter the name and course.");
    return;
  }

  if (marksInput.value.trim() === "" ||
      !Number.isFinite(marks) ||
      marks < 0 ||
      marks > 100) {
    alert("Marks must be a number from 0 to 100.");
    return;
  }

  const newStudent = {
    id: crypto.randomUUID(),
    name: name,
    course: course,
    marks: marks
  };

  students.push(newStudent);

  saveStudents();
  displayStudents();
  studentForm.reset();
  nameInput.focus();
});

// 7. Delete a student
function deleteStudent(id) {
  students = students.filter(function(student) {
    return student.id !== id;
  });

  saveStudents();
  displayStudents(searchInput.value.trim());
}

// 8. Search students by name
searchInput.addEventListener("input", function() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredStudents = students.filter(function(student) {
    return student.name.toLowerCase().includes(searchTerm);
  });

  displayStudents(filteredStudents);
});

// 9. Show existing records when the page opens
displayStudents();
