document.addEventListener('DOMContentLoaded', () => {

    // ================================
    // Dark Mode Logic
    // ================================
    (() => {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const body = document.body;
        const icon = darkModeToggle.querySelector('i');
        const savedTheme = localStorage.getItem('theme');

        const applyTheme = (theme) => {
            if (theme === 'dark') {
                body.classList.add('dark-mode');
                icon.classList.replace('ri-moon-line', 'ri-sun-line');
            } else {
                body.classList.remove('dark-mode');
                icon.classList.replace('ri-sun-line', 'ri-moon-line');
            }
        };

        // Apply saved theme on load
        applyTheme(savedTheme || 'light');

        // Toggle theme on button click
        darkModeToggle.addEventListener('click', () => {
            const isDark = body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            icon.classList.replace(isDark ? 'ri-moon-line' : 'ri-sun-line', isDark ? 'ri-sun-line' : 'ri-moon-line');
        });
    })();


    // ================================
    // Typing Animation
    // ================================
    (() => {
        const typingElement = document.querySelector('.text-type__content');
        if (!typingElement) return;

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

        const type = () => {
            const currentText = textArray[currentTextIndex];
            let timeoutSpeed = baseTypingSpeed + (Math.random() - 0.5) * baseTypingSpeed;

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
        };

        setTimeout(type, initialDelay);
    })();


    // ================================
    // Sticky Navbar on Scroll
    // ================================
    (() => {
        const nav = document.querySelector('.main-nav');

        // Debounce function to improve scroll performance
        const debounce = (func, wait = 10) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        };

        const handleScroll = () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', debounce(handleScroll, 20));
    })();


    // ================================
    // Fade-in Scroll Animations
    // ================================
    (() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // stop observing for performance
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.fade-in-up');
        elements.forEach(el => observer.observe(el));
    })();

});
