/*let heading = document.getElementById("heading");
let message = document.querySelector(".message");

console.log(heading);
console.log(message);

document.getElementById("heading").textContent = "Santosh! Welcome to JavaScript";
document.getElementById("message").innerHTML = "Hello! World.";

// Changing style when button is clicked

function newstyle()
{
    let title = document.getElementById("heading");
    title.style.color = "green";
    title.style.backgroundColor = "lightyellow";
    title.style.fontSize = "40px";
    title.style.textAlign = "center";
}
function oldstyle()
{
    let title = document.getElementById("heading");
    title.style.color = "red";
    title.style.backgroundColor = "aqua";
    title.style.fontSize = "20px";
    title.style.textAlign = "left";
}


// showing and hiding the content when text is clicked.

function hideText()
{
    document.getElementById("message").style.display = "none";
}

function showText()
{
    document.getElementById("message").style.display = "block";
}



function changeColor()
{
    document.getElementById("heading")
    .classList.toggle("highlight");
    document.getElementById("message")
    .classList.toggle("highlight1");
}



let names = document.getElementById("name");
let description = document.getElementById("description");
let profile = document.getElementById("profile");
let toggleButton = document.getElementById("toggleProfile");

document.getElementById("changeText").addEventListener("click", function ()
{
    names.textContent = "Welcome! I am learning JavaScript DOM.";
    description.textContent = "I can now  use JavaScript to make a webpage interactive.";
});
document.getElementById("changeStyle").addEventListener("click", function()
{
    profile.classList.toggle("dark-profile");
});
toggleButton.addEventListener("click", function ()
{
    if (profile.style.display === "none")
    {
        profile.style.display = "block";
        toggleButton.textContent = "Hide Profile";
    }
    else
    {
        profile.style.display = "none";
        toggleButton.textContent = "Show Profile";
    }
});*/