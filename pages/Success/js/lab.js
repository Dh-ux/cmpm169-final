var answers = {
    "what is project 8": "Project 8 is an advanced AI system with infinite capabilities",
    "memory pods": "Memory pods allows humans to preserve the memory and soul of the deceased",
    "8": "test function",
    "quit": "Good Night",
    "sleep": "Good Night",
    // Add more question-answer pairs here
};

// Get references to the HTML elements
var questionInput = document.querySelector('#question-block input');
var submitButton = document.querySelector('#submit-button');
var answerText = document.querySelector('#answer');
var circuit = document.querySelector('#circuit');

function validateQuestion() {
    var question = questionInput.value.toLowerCase();
    if (questionInput.value === 'quit'|| questionInput.value ==='sleep') {
        // If correct, redirect to the success page
        leftBlock.style.transform = "translateX(0)";
        leftBlock.style.background = "#090915e9";
        leftBlock.style.opacity = "1";
        rightBlock.style.transform = "translateX(0)";
        rightBlock.style.background = "#090915e9";
        rightBlock.style.opacity = "1";
        returnMain();
    }
    var answer = answers[question] || "Sorry, I don't know the answer to that question.";
    answerText.innerText = answer;

    // Typing effect for answer block
    const initialText = answerText.innerText;
    answerText.innerText = "";
    const typingEffect = setInterval(function () {
        const currentLength = answerText.innerText.length;
        const nextCharacter = initialText.substring(currentLength, currentLength + 1);
        if (nextCharacter === ' ') {
            answerText.innerHTML += '&nbsp;';
        } else {
            answerText.innerText += nextCharacter;
        }
        if (currentLength === initialText.length) {
            clearInterval(typingEffect);
        }
    }, 50);

}

// Add event listener to the login button
submitButton.addEventListener('click', function () {
    console.log('Button clicked!');
    validateQuestion();
});

async function returnMain() {
    await delay();
    window.location.href = '../../index.html';

}

function delay() {
    return new Promise((resolve) => {
        setTimeout(resolve, 3200);
    });
}