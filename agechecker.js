function checkAge() {
    // 1. Fetch the value INSIDE the function so it gets the user's input when clicked
    let ageValue = Number(document.getElementById("age").value);
    let r = "";

    // 2. Validate if the user actually entered a number
    if (isNaN(ageValue) || ageValue === "") {
        r = "Please enter a valid age.";
    } 
    else if (ageValue < 13) {
        r = " You are a child.";
    } 
    else if (ageValue >= 13 && ageValue < 20) {
        r = " You are a teenager.";
    } 
    else if (ageValue >= 20 && ageValue < 60) {
        r = " You are an adult.";
    } 
    else {
        r = " You are a senior citizen.";
    }

    // 3. Display the result
    document.getElementById("result").innerHTML = "So" + r;
}