var answers = {
    "what is project 8": "Project 8 is an advanced AI system with infinite capabilities",
    "memory pods": "memory pods allows humans to preserve the memory and soul of the deceased",
    // Add more question-answer pairs here
};

// Get references to the HTML elements
var questionInput = document.querySelector('#question-block input');
var submitButton = document.querySelector('#submit-button');
var answerText = document.querySelector('#answer');

function validateQuestion() {
    var question = questionInput.value.toLowerCase();
    var answer = answers[question] || "Sorry, I don't know the answer to that question.";
    answerText.innerText = answer;
}

// Add event listener to the login button
submitButton.addEventListener('click', function() {
    console.log('Button clicked!');
    validateQuestion();
});