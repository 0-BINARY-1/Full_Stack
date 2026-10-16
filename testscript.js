// Test script one (General operations like add, sub, variable declaration, etc. Basic ones.)

/*console.log(10*8);
// using let keyword to declare a variable which can be reassigned
let Uname = "Santosh";
console.log("Hello, " + Uname + " Good Morning!");
Uname = "Santosh Bhat";
// using const keyword to declare a variable which cannot be reassigned
const Uname1 = "Santosh Bhat";
// Uname1 = "Santosh"; // This will throw an error because Uname1 is a constant
console.log("Hello, " + Uname1 + " Good Morning!");
function greeting()
{
    alert("Hello, " + Uname + " Good Morning!");
}
let temp = -30;
console.log("The temperature today is: " + temp + "°C which is equal to 2\u00B0F");

let isStudent = true;
if (isStudent) {
    console.log("You are a student.");
} else {
    console.log("You are not a student.");
}
let a;
console.log("The value of a is: " + a); // This will print "The value of a is: undefined"
let b = null;
console.log("The value of b is: " + b); // This will print "The value of b is: null"
console.log(typeof isStudent); // This will print "boolean"
console.log(typeof Uname1); // This will print "undefined"
let count = 1;
console.log("Value before incrementing: " + count);
count++;
console.log("the value of count is: " + count + " after incrementing by 1");
// "=== " is a strict equality operator that checks for both value and type equality
let num1 = 10;
let num2 = "10";
if (num1 === num2) {
    console.log("Both values and types are equal.");
} else {
    console.log("Either values or types are not equal num1 is  number and num2 is a string. Though the values are equal, the types are not equal.");

}
console.log("&& (AND), || (OR), ! (NOT) are logical operators in JavaScript.");
console.log(!true); // This will print "false"
console.log(!false); // This will print "true"
*/

// Test script two (result calculator)
/*
const maths = 50;
const science = 60;
const english = 70;

let total = maths + science + english;
let average = total / 3;

console.log("Total : " , total);
console.log("Average: " , average);
console.log("Passed: ", average >= 40);
console.log(average >70);
console.log("Excellent: ", average > 70);
console.log("Failed in subjects: ", 
    maths < 40 || science < 40 || english < 40
)*/

// Test script three (conditional statements and looping)

/*let marks = 84;
if (marks >= 90)
{
    console.log("Grade: A");
}
else if (marks >= 80)
{
    if(marks === 85)
    {
        console.log("Grade: B");
    }
    else
    {
        console.log("You scored above 80 but less than 85.")
    }
}
else
{
    console.log("Grade: C");
}
*/

// Test script four (Loops)
/*
let n = 10;
console.log(" The list is below: ");
for ( let i = 1; i <= n; i++)
{
    console.log("  " + i)
}
console.log("The prime series is:");
for (let j = 2; j <= 10; j +=2)
{
    console.log("  " + j);
} 

for (let k = 1; k <= 3; k++)
{
    for (let l = 1; l <= 3; l++)
    {
        for (let m = 1; m <= 3; m++)
        {
            console.log("  " + k + "  " +  l + "  " + m);
        }
    }
}*/

//marks calculator
/*
const stuname = "Santosh";
const subjects = ["Maths", "Science", "English", "Nepali", "Computer"];
const marks = [85,90,79,88,95];
let total = 0;
for (let i = 0; i <marks.length; i++)
{
    console.log(subjects[i] + " : " + marks[i]);
    total = total + marks[i];
}
console.log("Total: ", total);
let average = total / marks.length;
console.log("Average: ", average);
let percentage = (total / (marks.length * 100)) * 100;

console.log("Student Name: " + stuname);
console.log("Total marks: " + total);
console.log("Average marks: " + average);
console.log("Percentage: " + percentage + "%");
if (average >= 40)
{
    console.log("Result: Passed");
}
else
{
    console.log("Result: Failed");
}
if (percentage >=80)
{
    console.log("You achieved distinction in your result.");
}*/

/* Multiplication table of a number 
let num = 5;
for (let i = 1; i <= 10; i++)
{
    console.log(num + " x " + i + " = " + (num *i));
}
    */

// JavaScript functions
/*
function greet(username)
{
    console.log("Hello, " + username + "! Welcome to the world of Programmming.");
}

greet("Bhawana");
greet("Santosh");
greet("Komal");

function add(a, b)
{
    console.log("The sum of " + a + " and " + b + " is: " + (a+b));
}
add(10, 20);
add(5, 15);
let a = Number(prompt("Enter the first number: "));
let b = Number(prompt("Enter the second number: "));

function multiply(a, b)
{
    return a * b;
}
let result = multiply(a, b);
console.log ( "The product of " + a + " and " + b + " is: " + result);
*/

// Student result calculator using JS functions
/*
let studentName = prompt("Enter the student's name: ");
let maths = Number(prompt("Enter the marks for Maths: "));
let scinence = Number(prompt("Enter the marks for Science: "));
let english = Number(prompt("Enter the marks for English: "));
let nepali = Number(prompt("Enter the marks for Nepali: "));
let computer = Number(prompt("Enter the marks for Computer: "));
function calculateaverage(maths, scinence, english, nepali, computer)
    {
        let total = maths + scinence + english + nepali + computer;
        let average = total / 5;
        return average;
    }

    let avgmarks = calculateaverage(maths, scinence, english, nepali, computer);
    console.log("Student Name: " + studentName);
    console.log("Maths: " + maths);
    console.log("Science: " + scinence);
    console.log("English: " + english);
    console.log("Nepali: " + nepali);
    console.log("Computer: " + computer);
    console.log("Average Marks: " + avgmarks);
    if (avgmarks >= 40)
    {
        console.log("Result: Passed");
    }
    else
    {
        console.log("Result: Failed");
    }   */

//Function expresison: assinging function to a variable
/*
let multiply = function(a, b)
{
    return a * b;
}
console.log("The result of multiplication is: " + multiply(5, 10));

let greeting = function(username)
{
    console.log("Hello, " + username + "! Welcome to the world of Programming.");
}

console.log(greeting("Bhawana"));
*/

// Arrow function: concise syntax for writing functions
/*
const add = (a , b) =>
{
    return ("The sum is: " + (a + b));
}
console.log(add(10, 20));

const mult = (a , b) => a * b;

console.log(mult(10, 20));
*/

// Array in JS
/*
const subjects = ["Maths", "Science", "English", "Nepali", "Computer"];
for (let i = 0; i <subjects.length; i++)
{
    console.log(subjects[i]);
}

console.log(subjects[3]); // This will print "Nepali"
console.log(subjects.length);
subjects[3]= "Social Science";// Replacing the existing one.
subjects.push("Quantum Mechanics");//  Adding new element at the end.
subjects.unshift("Radiation");// Adding new element at the beginning.
console.log(subjects);
subjects.pop();// Removes the last element.
console.log(subjects);
subjects.shift();// Remove the first element.
console.log(subjects);

// Looping inside the array using (for ... of), It is the cleanest way to loop over array values.
console.log("This is the looping using for...of.    ;")
for (const subs of subjects )// subs is like new variable that will hold the value extracted from the subjects array.
{
    console.log(subs);
}
// we have for ...in  too as shown below:

for (const a in subjects)
{
    console.log(a + " = " + subjects[a]);// It will extract the indices and assign to 'a'.
}
*/

// Array Project



const hobbies = ["Painting", "Reading", "Listining Music", "Travelling", "Programming", "DIY Projects making"];

function showHobby()
{
    const hobbylist = document.getElementById("hobbylist");
    hobbylist.innerHTML ="";// Clears any existing child and prevent duplicaiton of items.
    for (const hobby of hobbies)
    {
        const item = document.createElement("li");// It creates the 'li' element though it is not in the HTML file
        item.textContent = hobby;
        hobbylist.appendChild(item);// It adds the recently created 'li' element to the output when specified action is performend
    }
}
/*

const item = document.createElement("li");
Creates a new <li> element in memory (not yet in the DOM).

item.textContent = hobby;
Sets the text content of that <li> to the current hobby.
textContent is safer than innerHTML — it prevents HTML injection.

hobbyList.appendChild(item);
Inserts the <li> into the <ul>.

document.getElementById() — selects an HTML element.

document.createElement() — creates a new HTML element.

appendChild() — adds an element inside another element.


*/


// JavaScript Object which are similar to structure in C programming
/*
const info =
{
    name: "Santosh Bhat",
    age: "29",
    country: "Nepal",
    course: "Web Development",
    subjects: ["Maths", "Science", "Computer"],
    greet:
    function()
    {
        alert("Good Evening! My love. I am you love Mr." + info.name);
    }
};
info.city = "Kathmandu";
console.log(info.name);// 
console.log(info.age);// I used the 
console.log(info["country"]);// I used property name inside double quote while using the box notation.
info.age = 25;
delete info.country;
console.log(info);
console.log(info.subjects[2]);
info.greet();

*/
/*
const details =
{
    name: "Santosh Bhat",
    age: 28,
    country: "Nepal",
    course: "Web Development",
    currentTopic: "JavaScript Objects",
    hobbies: ["Reading", "Coding", "Learning"]
};

function showProfile()
{
    const profile = document.getElementById("profile");
    profile.innerHTML = `<h2> ${details.name}</h2>
    <p><strong>Country:</strong> ${details.country}</p>
    <p><strong>Course:</strong> ${details.course}</p>
    <p><strong>Current Topic:</strong> ${details.currentTopic}</p>
    <p><strong>Hobbies:</strong> ${details.hobbies.join(", ")}</p>`;
}
*/

/*
// Simple Math operations:

console.log("Random number")
let random = Math.random();
console.log(random);
let x = Math.floor(random * 10) + 1;
console.log(x);
*/