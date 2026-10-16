
const student = {
    name: "Santosh",
    country: "Nepal",
    course: "Web Development",
    currentTopic: "JavaScript Objects",
    hobbies: ["Reading", "Coding", "Learning"]
};

function showProfile() {
    const profile = document.getElementById("profile");

    profile.innerHTML = `
        <h2>${student.name}</h2>
        <p><strong>Country:</strong> ${student.country}</p>
        <p><strong>Course:</strong> ${student.course}</p>
        <p><strong>Current Topic:</strong> ${student.currentTopic}</p>
        <p><strong>Hobbies:</strong> ${student.hobbies.join(", ")}</p>
    `;
}
