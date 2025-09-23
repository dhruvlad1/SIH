document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Section Switching ---------- */
    const sidebarItems = document.querySelectorAll('.sidebar li');
    const quickActionButtons = document.querySelectorAll('.quick-actions button');

    function showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('section').forEach(s => s.classList.remove('active'));

        // Show the requested section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update active class on sidebar items
        sidebarItems.forEach(li => {
            if (li.dataset.section === sectionId) {
                li.classList.add('active');
            } else {
                li.classList.remove('active');
            }
        });
    }

    // Event listeners for sidebar navigation
    sidebarItems.forEach(li => {
        li.addEventListener('click', () => {
            showSection(li.dataset.section);
        });
    });

    // Event listeners for quick action buttons
    quickActionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.dataset.action;
            showSection(targetSection);
        });
    });

    // Initially show the dashboard section
    showSection('dashboard');

    /* ---------- Dark Mode Toggle ---------- */
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

    /* ---------- Calendar Logic ---------- */
    const calendarEl = document.getElementById('calendar');
    const monthYearLabel = document.getElementById('monthYear');
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');

    // Use a date object representing the current month for initialization
    let currentDate = new Date();

    // Sample data for booked dates
    const bookedDatesMap = {
        '2025-09': [5, 12, 18],
        '2025-10': [2, 10, 15]
    };

    function generateCalendar(date) {
        if (!calendarEl || !monthYearLabel) return;

        calendarEl.innerHTML = '';
        const year = date.getFullYear();
        const month = date.getMonth();
        monthYearLabel.textContent = date.toLocaleString('default', {
            month: 'long',
            year: 'numeric'
        });

        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        weekdays.forEach(d => {
            const div = document.createElement('div');
            div.textContent = d;
            div.classList.add('weekday');
            calendarEl.appendChild(div);
        });

        const firstDay = new Date(year, month, 1).getDay();
        for (let i = 0; i < firstDay; i++) {
            calendarEl.appendChild(document.createElement('div'));
        }

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const key = `${year}-${String(month + 1).padStart(2, '0')}`;
        const bookedDays = bookedDatesMap[key] || [];
        const today = new Date();

        for (let i = 1; i <= daysInMonth; i++) {
            const dayEl = document.createElement('div');
            dayEl.textContent = i;
            dayEl.classList.add('day');

            // Add 'today' class if it's the current date
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayEl.classList.add('today');
            }

            // Add 'weekend' class
            const dayOfWeek = new Date(year, month, i).getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                dayEl.classList.add('weekend');
            }

            // Check if the day is booked
            if (bookedDays.includes(i)) {
                dayEl.classList.add('booked');
                dayEl.setAttribute('title', 'Booked');
            } else {
                dayEl.addEventListener('click', () => {
                    alert(`You selected ${i} ${date.toLocaleString('default', { month: 'long' })} ${year}`);
                });
            }

            calendarEl.appendChild(dayEl);
        }
    }

    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate);
    });

    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate);
    });

    generateCalendar(currentDate);

});