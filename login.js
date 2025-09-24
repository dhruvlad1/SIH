document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessageDiv = document.getElementById('error-message');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        errorMessageDiv.style.display = 'none';
        errorMessageDiv.textContent = '';
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email === "" || password === "") {
            showError("Please enter both email and password.");
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email);

        if (user && user.password === password) {
            alert('Login successful! Welcome back.');
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            
            // --- NEW: REDIRECTION LOGIC ---
            // Check the user's role and redirect accordingly
            if (user.role === 'patient') {
                window.location.href = 'patient.html';
            } else if (user.role === 'doctor') {
                // You can create a doctor.html page for this later
                window.location.href = 'doctor.html'; 
            } else {
                // Fallback to the main homepage
                window.location.href = 'index.html';
            }

        } else {
            showError("Incorrect email or password. Please try again.");
        }
    });

    function showError(message) {
        errorMessageDiv.textContent = message;
        errorMessageDiv.style.display = 'block';
    }
});