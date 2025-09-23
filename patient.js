function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    showSection('dashboard');

    // Calendar variables
    const calendar = document.getElementById('calendar');
    const monthYearLabel = document.getElementById('monthYear');
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');

    let currentDate = new Date(2025, 8, 1); // Start with Sep 2025
    const bookedDatesMap = {
        '2025-09': [5, 12, 18],
        '2025-10': [2, 10, 15]
    };

    // Generate calendar for a month
    function generateCalendar(date) {
        calendar.innerHTML = '';

        const year = date.getFullYear();
        const month = date.getMonth();
        monthYearLabel.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        weekdays.forEach(day => {
            const div = document.createElement('div');
            div.textContent = day;
            div.classList.add('weekday');
            calendar.appendChild(div);
        });

        // Blank days before first day
        for (let i = 0; i < firstDay; i++) {
            const blank = document.createElement('div');
            calendar.appendChild(blank);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.textContent = i;

            const key = `${year}-${String(month + 1).padStart(2, '0')}`;
            const booked = bookedDatesMap[key] || [];

            // Weekend
            const dayOfWeek = new Date(year, month, i).getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) day.classList.add('weekend');

            // Today
            const today = new Date();
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                day.classList.add('today');
            }

            // Booked dates
            if (booked.includes(i)) {
                day.classList.add('booked');
            } else {
                day.addEventListener('click', () => {
                    alert(`You selected ${i} ${date.toLocaleString('default', { month: 'long' })} ${year}`);
                });
            }

            calendar.appendChild(day);
        }
    }

    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate);
    });
    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate);
    });

    // Initialize the calendar
    generateCalendar(currentDate);
});