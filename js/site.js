// Get the input fields and login button
var usernameInput = document.getElementById('username');
var passwordInput = document.getElementById('password');
var loginBtn = document.getElementById('login-btn');

// Function to validate the username and password
function validateCredentials() {
  // Check if username and password are correct
  if (usernameInput.value === 'project 8' && passwordInput.value === 'infinite') {
    // If correct, redirect to the success page
    window.location.href = 'pages/Success/Success.html';
  } else {
    // If incorrect, redirect to the error page
    window.location.href = 'pages/Error/Error.html';
  }
}

// Add event listener to the login button
loginBtn.addEventListener('click', function() {
  console.log('Button clicked!');
  validateCredentials();
});
