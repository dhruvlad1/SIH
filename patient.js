document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const navItems = document.querySelectorAll('.sidebar-nav li');
    const sections = document.querySelectorAll('.main-content section');

    const logoutBtn = document.getElementById('logoutBtn');
    const homeBtn = document.getElementById('homeBtn');
    const darkModeToggle = document.getElementById('darkModeToggle');

    const welcomeMessage = document.getElementById('welcome-message');
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profileAvatar = document.getElementById('profile-avatar');

    // --- Helper Functions ---
    const updateProfileUI = (user) => {
        const firstName = user.name.split(' ')[0];
        welcomeMessage.textContent = `Welcome, ${firstName}`;
        profileName.textContent = user.name;
        profileEmail.textContent = user.email;
        profileAvatar.textContent = user.name.charAt(0).toUpperCase();
    };

    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = `<i class="ri-sun-line"></i> Light Mode`;
        } else {
            darkModeToggle.innerHTML = `<i class="ri-moon-line"></i> Dark Mode`;
        }
    };

    const showSection = (sectionId) => {
        sections.forEach(section => section.classList.remove('active'));
        navItems.forEach(item => item.classList.remove('active'));

        const targetSection = document.getElementById(sectionId);
        targetSection?.classList.add('active');

        const targetNavItem = document.querySelector(`[data-section="${sectionId}"]`);
        targetNavItem?.classList.add('active');
    };

    // --- Initial Setup ---
    if (loggedInUser) {
        updateProfileUI(loggedInUser);
    } else {
        window.location.href = 'login.html';
    }

    // --- Event Listeners ---
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    logoutBtn?.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });

    homeBtn?.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    darkModeToggle?.addEventListener('click', toggleDarkMode);

    // --- Expose showSection globally for inline onclick usage ---
    window.showSection = showSection;
});
