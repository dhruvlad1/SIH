function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    showSection('dashboard');

    const calendar = document.getElementById('calendar');
    const monthYearLabel = document.getElementById('monthYear');
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');

    let currentDate = new Date(2025, 8, 1);
    const bookedDatesMap = {
        '2025-09': [5, 12, 18],
        '2025-10': [2, 10, 15]
    };

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

        for (let i = 0; i < firstDay; i++) {
            const blank = document.createElement('div');
            calendar.appendChild(blank);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.textContent = i;
            const key = `${year}-${String(month + 1).padStart(2, '0')}`;
            const booked = bookedDatesMap[key] || [];
            const dayOfWeek = new Date(year, month, i).getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) day.classList.add('weekend');
            const today = new Date();
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                day.classList.add('today');
            }
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
