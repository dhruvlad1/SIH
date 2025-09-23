document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Helper: safe query ---------- */
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    /* ---------- Sidebar / Section routing ---------- */
    const sidebarItems = $$('[data-section]');
    const sections = $$('main section');
    const pageTitle = $('#pageTitle');

    function showSection(id) {
        sections.forEach(sec => {
            const isActive = sec.id === id;
            sec.classList.toggle('active', isActive);
            sec.setAttribute('aria-hidden', !isActive);
        });
        sidebarItems.forEach(li => li.classList.toggle('active', li.dataset.section === id));

        const titleMap = {
            dashboard: 'Dashboard',
            appointments: 'Appointments',
            patients: 'Patients',
            progress: 'Therapy Progress',
            profile: 'Profile',
            notifications: 'Notifications',
            settings: 'Settings'
        };
        if (pageTitle) pageTitle.innerText = titleMap[id] || 'Dashboard';
    }

    // Attach listeners
    sidebarItems.forEach(li => {
        li.addEventListener('click', () => showSection(li.dataset.section));
        li.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showSection(li.dataset.section);
            }
        });
    });

    // Default view on load
    showSection('dashboard');

    /* ---------- Dark mode toggle ---------- */
    const toggleDark = $('#toggleDark');
    if (toggleDark) {
        toggleDark.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark');
            toggleDark.setAttribute('aria-pressed', String(isDark));
        });
    }

    /* ---------- Chart.js initialization ---------- */
    function initChart() {
        const canvas = $('#therapyChart');
        if (!canvas) return;
        if (typeof Chart === 'undefined') {
            console.error('Chart.js not loaded');
            return;
        }

        const ctx = canvas.getContext('2d');
        if (window.__therapyChart instanceof Chart) {
            window.__therapyChart.destroy();
        }

        window.__therapyChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Pending', 'Cancelled'],
                datasets: [{
                    label: 'Therapy status',
                    data: [12, 5, 2],
                    backgroundColor: ['#3fa796', '#ffcf85', '#f28b82'],
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            }
        });
    }

    initChart();

    /* ---------- Patient search ---------- */
    const searchInput = $('#patientSearch');
    const patientCards = $$('.patient-card');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const q = this.value.trim().toLowerCase();
            patientCards.forEach(card => {
                const textContent = card.textContent.toLowerCase();
                card.style.display = textContent.includes(q) ? '' : 'none';
            });
        });
    }

    /* ---------- Calendar ---------- */
    const calendarEl = $('#calendar');
    const monthYearLabel = $('#monthYear');
    const prevBtn = $('#prevMonth');
    const nextBtn = $('#nextMonth');

    let currentDate = new Date();

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
            const el = document.createElement('div');
            el.className = 'weekday';
            el.textContent = d;
            calendarEl.appendChild(el);
        });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const blank = document.createElement('div');
            calendarEl.appendChild(blank);
        }

        const key = `${year}-${String(month + 1).padStart(2, '0')}`;
        const bookedDays = bookedDatesMap[key] || [];
        const today = new Date();

        for (let d = 1; d <= daysInMonth; d++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'day';
            dayEl.textContent = d;

            if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayEl.classList.add('today');
            }

            if (bookedDays.includes(d)) {
                dayEl.classList.add('booked');
                dayEl.setAttribute('title', 'Booked');
            } else {
                dayEl.addEventListener('click', () => {
                    alert(`You selected ${d} ${date.toLocaleString('default', {
                        month: 'long'
                    })} ${year}`);
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

    /* ---------- window resize: ensure chart resizes correctly ---------- */
    window.addEventListener('resize', () => {
        if (window.__therapyChart && typeof window.__therapyChart.resize === 'function') {
            window.__therapyChart.resize();
        }
    });
});