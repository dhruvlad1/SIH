document.addEventListener('DOMContentLoaded', () => {
    // --- User and Page Elements ---
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const navItems = document.querySelectorAll('.sidebar-nav li');
    const sections = document.querySelectorAll('.main-content section');
    
    // --- Buttons ---
    const logoutBtn = document.getElementById('logoutBtn');
    const homeBtn = document.getElementById('homeBtn');
    const darkModeToggle = document.getElementById('darkModeToggle');

    // --- Dynamic Content Elements ---
    const welcomeMessage = document.getElementById('welcome-message');
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profileAvatar = document.getElementById('profile-avatar');

    // --- Initial Setup ---
    if (loggedInUser) {
        const patientName = loggedInUser.name.split(' ')[0]; // Get first name
        welcomeMessage.textContent = `Welcome, ${patientName}`;
        profileName.textContent = loggedInUser.name;
        profileEmail.textContent = loggedInUser.email;
        profileAvatar.textContent = loggedInUser.name.charAt(0).toUpperCase();
    } else {
        // If no one is logged in, redirect to login page
        window.location.href = 'login.html';
    }

    // --- Navigation Logic ---
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => section.classList.remove('active'));
        // Deactivate all nav items
        navItems.forEach(item => item.classList.remove('active'));

        // Show the target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Activate the target nav item
        const targetNavItem = document.querySelector(`[data-section="${sectionId}"]`);
        if (targetNavItem) {
            targetNavItem.classList.add('active');
        }
    }

    // Event listeners for sidebar navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // --- Button Functionality ---
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });

    homeBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'ri-sun-line';
            darkModeToggle.innerHTML = `<i class="ri-sun-line"></i> Light Mode`;
        } else {
            icon.className = 'ri-moon-line';
            darkModeToggle.innerHTML = `<i class="ri-moon-line"></i> Dark Mode`;
        }
    });

    // --- Expose showSection to global scope for inline onclick attributes ---
    // This ensures your existing "Book Appointment" button continues to work
    window.showSection = showSection;
});