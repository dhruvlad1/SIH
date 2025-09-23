// doctor.js - robust initialization, chart, calendar, search, dark mode, routing
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Helper: safe query ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- Sidebar / Section routing ---------- */
  const sidebarItems = $$('[data-section]');
  const sections = $$('main section');
  const pageTitle = $('#pageTitle');

  function setActiveSidebar(id) {
    sidebarItems.forEach(li => li.classList.toggle('active', li.dataset.section === id));
  }

  function showSection(id) {
    sections.forEach(sec => {
      sec.classList.toggle('active', sec.id === id);
      // set aria-hidden for accessibility
      sec.setAttribute('aria-hidden', sec.id === id ? 'false' : 'true');
    });
    setActiveSidebar(id);
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

  // default
  showSection('dashboard');

  /* ---------- Dark mode toggle ---------- */
  const toggleDark = $('#toggleDark');
  if (toggleDark) {
    toggleDark.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      toggleDark.setAttribute('aria-pressed', String(isDark));
    });
  }

  /* ---------- Chart.js initialization (ensures canvas height via CSS) ---------- */
  function initChart() {
    const canvas = $('#therapyChart');
    if (!canvas) return;
    if (typeof Chart === 'undefined') {
      console.error('Chart.js not loaded');
      return;
    }
    const ctx = canvas.getContext('2d');
    // destroy previous chart if any
    if (window.__therapyChart instanceof Chart) {
      try { window.__therapyChart.destroy(); } catch(e){ /* ignore */ }
    }
    window.__therapyChart = new Chart(ctx, {
      type: 'doughnut', // change to 'pie' for solid pie
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
          legend: { position: 'bottom' },
          tooltip: { enabled: true }
        }
      }
    });
  }

  // initialize chart now
  initChart();

  /* ---------- Patient search ---------- */
  const searchInput = $('#search');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const q = (this.value || '').trim().toLowerCase();
      $$('.patient-card', $('#patientList')).forEach(card => {
        card.style.display = (card.textContent || '').toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }

  /* ---------- Calendar ---------- */
  const calendarEl = $('#calendar');
  const monthYearLabel = $('#monthYear');
  const prevBtn = $('#prevMonth');
  const nextBtn = $('#nextMonth');

  let currentDate = new Date(); // start at current month

  // dynamic sample booked dates for current and next month so calendar shows booked days
  const bookedDatesMap = {};
  const keyThis = `${currentDate.getFullYear()}-${String(currentDate.getMonth()+1).padStart(2,'0')}`;
  bookedDatesMap[keyThis] = [5, 12, 18];
  const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 1);
  const keyNext = `${nextMonthDate.getFullYear()}-${String(nextMonthDate.getMonth()+1).padStart(2,'0')}`;
  bookedDatesMap[keyNext] = [2, 10, 15];

  function generateCalendar(date) {
    if (!calendarEl || !monthYearLabel) return;
    calendarEl.innerHTML = '';
    const year = date.getFullYear();
    const month = date.getMonth();
    monthYearLabel.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    // days header
    const weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    weekdays.forEach(d => {
      const el = document.createElement('div');
      el.className = 'weekday';
      el.textContent = d;
      calendarEl.appendChild(el);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // blanks
    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement('div');
      calendarEl.appendChild(blank);
    }

    const key = `${year}-${String(month+1).padStart(2,'0')}`;
    const booked = bookedDatesMap[key] || [];

    for (let d = 1; d <= daysInMonth; d++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'day';
      dayEl.textContent = d;

      const dayOfWeek = new Date(year, month, d).getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) dayEl.classList.add('weekend');

      const today = new Date();
      if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        dayEl.classList.add('today');
      }

      if (booked.includes(d)) {
        dayEl.classList.add('booked');
        dayEl.setAttribute('title', 'Booked');
      } else {
        dayEl.addEventListener('click', () => {
          alert(`You selected ${d} ${date.toLocaleString('default', { month: 'long' })} ${year}`);
        });
      }

      calendarEl.appendChild(dayEl);
    }
  }

  prevBtn?.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate);
  });

  nextBtn?.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate);
  });

  // initial render
  generateCalendar(currentDate);

  /* ---------- window resize: ensure chart resizes correctly ---------- */
  window.addEventListener('resize', () => {
    if (window.__therapyChart && typeof window.__therapyChart.resize === 'function') {
      window.__therapyChart.resize();
    }
  });

});
