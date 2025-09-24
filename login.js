document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const errorMessageDiv = document.getElementById('error-message');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      showError("Please enter both email and password.");
      return;
    }

    // Retrieve users from localStorage safely
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (user && user.password === password) {
      // Successful login
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      alert(`Login successful! Welcome back, ${user.name || 'User'}.`);

      // Role-based redirection
      switch(user.role) {
        case 'patient':
          window.location.href = 'patient.html';
          break;
        case 'doctor':
          window.location.href = 'doctor.html';
          break;
        default:
          window.location.href = 'index.html';
      }

    } else {
      showError("Incorrect email or password. Please try again.");
    }
  });

  function showError(message) {
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block';
    errorMessageDiv.setAttribute('aria-live', 'assertive');
  }

  function clearError() {
    errorMessageDiv.textContent = '';
    errorMessageDiv.style.display = 'none';
  }
});
