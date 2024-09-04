
document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the "Love Calculator" button
    document.getElementById('openCurrentPageBtn').addEventListener('click', function() {
        window.location.href = 'index.html';  // Ensure this path is correct
    });

    // Event listener for the "Flames Test" button
    document.getElementById('openAnotherPageBtn').addEventListener('click', function() {
        window.location.href = 'flames.html';  // Ensure this path is correct
    });
});

// Calculate FLAMES result based on the names entered
function calculateFLAMES() {
    var enteredYourName = document.getElementById("yourName").value.toLowerCase().replace(/ /g, "");
    var enteredPartnerName = document.getElementById("partnerName").value.toLowerCase().replace(/ /g, "");
    var commonLetters = "";

    // Find common letters to remove
    for (var i = 0; i < enteredYourName.length; i++) {
        var index = enteredPartnerName.indexOf(enteredYourName[i]);
        if (index !== -1) {
            commonLetters += enteredYourName[i];
            enteredPartnerName = enteredPartnerName.slice(0, index) + enteredPartnerName.slice(index + 1);
        }
    }

    // Remove common letters from names
    for (var i = 0; i < commonLetters.length; i++) {
        enteredYourName = enteredYourName.replace(commonLetters[i], "");
    }

    enteredPartnerName = enteredPartnerName.replace(new RegExp("[" + commonLetters + "]", "g"), "");

    var remainingLettersCount = enteredYourName.length + enteredPartnerName.length;
    var flamesOptions = "FLAMES";
    var flamesResult = "";

    // Determine relationship based on remaining letters
    if (remainingLettersCount > 0) {
        var flamesIndex = (remainingLettersCount - 1) % flamesOptions.length; // Subtract 1 to get the correct index
        flamesResult = flamesOptions[flamesIndex];
    }

    displayResult(flamesResult);
    saveFlamesResultToDatabase(
        document.getElementById("yourName").value, 
        document.getElementById("partnerName").value, 
        flamesResult
    ); // Save the original names and result to the server
}

// Display the full FLAMES result based on the result character
function displayResult(flamesResult) {
    var resultDiv = document.getElementById("result");
    var resultMessage = "";

    switch (flamesResult) {
        case "F":
            resultMessage = "Friendship";
            break;
        case "L":
            resultMessage = "Love";
            break;
        case "A":
            resultMessage = "Affection";
            break;
        case "M":
            resultMessage = "Marriage";
            break;
        case "E":
            resultMessage = "Enemy";
            break;
        case "S":
            resultMessage = "Sister";
            break;
        default:
            resultMessage = "Invalid input!";
            break;
    }

    resultDiv.innerText = resultMessage;
}

// Save the FLAMES result to the server
function saveFlamesResultToDatabase(fullYourName, fullPartnerName, flamesResult) {
    // Log the full names and result for debugging purposes
    console.log("Full Your Name: ", fullYourName); 
    console.log("Full Partner's Name: ", fullPartnerName);

    fetch('/save-flames', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            yourName: fullYourName,
            partnerName: fullPartnerName,
            result: flamesResult
        })
    })
    .then(response => response.json())
    .then(data => console.log('FLAMES result saved:', data))
    .catch(error => console.error('Error saving FLAMES result:', error));
}

// Event listener to handle form submission
document.getElementById('calculate').addEventListener('click', calculateFLAMES);
