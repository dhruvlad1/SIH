// Section switching
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    showSection('dashboard');

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Calendar
const calendar = document.getElementById('calendar');
const monthYearLabel = document.getElementById('monthYear');
const prevBtn = document.getElementById('prevMonth');
const nextBtn = document.getElementById('nextMonth');

let currentDate = new Date(2025, 8, 1);
const bookedDatesMap = { '2025-09':[5,12,18], '2025-10':[2,10,15] };

function generateCalendar(date) {
    calendar.innerHTML = '';
    const year = date.getFullYear();
    const month = date.getMonth();
    monthYearLabel.textContent = date.toLocaleString('default',{month:'long',year:'numeric'});

    ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d => {
        const div=document.createElement('div'); div.textContent=d; div.classList.add('weekday'); calendar.appendChild(div);
    });

    const firstDay = new Date(year,month,1).getDay();
    for(let i=0;i<firstDay;i++) calendar.appendChild(document.createElement('div'));

    const daysInMonth = new Date(year,month+1,0).getDate();
    for(let i=1;i<=daysInMonth;i++){
        const day=document.createElement('div'); day.textContent=i;
        const key=`${year}-${String(month+1).padStart(2,'0')}`;
        const booked=bookedDatesMap[key]||[];
        const dayOfWeek=new Date(year,month,i).getDay();
        if(dayOfWeek===0||dayOfWeek===6) day.classList.add('weekend');
        const today=new Date();
        if(i===today.getDate()&&month===today.getMonth()&&year===today.getFullYear()) day.classList.add('today');
        if(booked.includes(i)) day.classList.add('booked');
        else day.addEventListener('click',()=>alert(`You selected ${i} ${date.toLocaleString('default',{month:'long'})} ${year}`));
        calendar.appendChild(day);
    }
}

prevBtn.addEventListener('click',()=>{currentDate.setMonth(currentDate.getMonth()-1); generateCalendar(currentDate)});
nextBtn.addEventListener('click',()=>{currentDate.setMonth(currentDate.getMonth()+1); generateCalendar(currentDate)});
generateCalendar(currentDate);
