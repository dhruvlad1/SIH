document.addEventListener('DOMContentLoaded', () => {

    // --- Dark Mode Logic ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const currentTheme = localStorage.getItem('theme');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');

    // Apply the saved theme on page load
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.replace('ri-moon-line', 'ri-sun-line');
    }

    // Add click listener for the toggle button
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Save the new theme preference and update the icon
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('ri-moon-line', 'ri-sun-line');
        } else {
            localStorage.setItem('theme', 'light');
            icon.classList.replace('ri-sun-line', 'ri-moon-line');
        }
    });


    // --- Professional Typing Animation ---
    const typingElement = document.querySelector('.text-type__content');
    
    if (typingElement) {
        // ... (The rest of the typing animation code remains the same)
        const textArray = [
            "Restore Balance, Naturally.",
            "Discover Ancient Healing.",
            "Rejuvenate Your Mind & Body."
        ];
        const baseTypingSpeed = 50;
        const deletingSpeed = 30;
        const pauseDuration = 2000;
        const initialDelay = 500;
        let currentTextIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = textArray[currentTextIndex];
            const typingSpeed = baseTypingSpeed + (Math.random() - 0.5) * baseTypingSpeed;
            let timeoutSpeed = typingSpeed;

            if (isDeleting) {
                if (currentCharIndex > 0) {
                    typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
                    currentCharIndex--;
                    timeoutSpeed = deletingSpeed;
                } else {
                    isDeleting = false;
                    currentTextIndex = (currentTextIndex + 1) % textArray.length;
                    timeoutSpeed = 500;
                }
            } else {
                if (currentCharIndex < currentText.length) {
                    typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
                    currentCharIndex++;
                } else {
                    isDeleting = true;
                    timeoutSpeed = pauseDuration;
                }
            }
            setTimeout(type, timeoutSpeed);
        }
        setTimeout(type, initialDelay);
    }

    // --- Sticky Navbar on Scroll ---
    const nav = document.querySelector('.main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.fade-in-up');
    elementsToAnimate.forEach(el => observer.observe(el));

});