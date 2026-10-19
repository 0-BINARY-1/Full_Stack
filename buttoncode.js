
const students = [
    { name: "Ram", marks: 85 },
    { name: "Sita", marks: 92 },
    { name: "Hari", marks: 35 },
    { name: "Gita", marks: 68 },
    { name: "Shyam", marks: 28 }
];

const result = document.getElementById("result");

// map() transforms student objects into HTML strings.
// forEach() displays each generated string.
function displayStudents(studentList) {
    if (studentList.length === 0) {
        result.textContent = "No students found.";
        return;
    }

    const studentHTML = studentList.map(student => {
        const status = student.marks >= 40 ? "Pass" : "Fail";

        return `
            <div class="student">
                <strong>${student.name}</strong>
                - Marks: ${student.marks}
                - ${status}
            </div>
        `;
    });

    result.innerHTML = "";

    studentHTML.forEach(html => {
        result.innerHTML += html;
    });
}

function showAllStudents() {
    displayStudents(students);
}

function showPassedStudents() {
    const passed = students.filter(student => student.marks >= 40);
    displayStudents(passed);
}

function showAverage() {
    const total = students.reduce(
        (sum, student) => sum + student.marks,
        0
    );

    const average = total / students.length;

    result.textContent =
        `Total Marks: ${total} | Average Marks: ${average.toFixed(2)}`;
}

function findStudent() {
    const name = document.getElementById("studentName").value.trim();

    const student = students.find(
        student => student.name.toLowerCase() === name.toLowerCase()
    );

    if (student) {
        result.textContent =
            `${student.name} scored ${student.marks} marks.`;
    } else {
        result.textContent = "Student not found.";
    }
}
