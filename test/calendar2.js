const date_part = document.querySelector('#date');
const calendar = document.querySelector('.calendar');


date_part.addEventListener('click', (e)=> {
    e.preventDefault();
    calendar.classList.toggle('disappear');
})

calendar.addEventListener('click' , (e)=> {
    e.preventDefault();
    if(e.target.closest('.days')){
        
        date_part.children.item(0).innerText = `${e.target.innerText}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
})
//Calendar Rendar
const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

// console.log(lastDay)
// console.log(prevLastDay)

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h2").innerText = `${months[date.getMonth()]} ${date.getFullYear()}`;

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    // days += `<div class="prev-date"><span class="hover">${prevLastDay - x + 1}</span></div>`;
    days += `<span class="prev-date">${prevLastDay - x + 1}</span>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
    //   days += `<div class="today"><span class="hover">${i}</span></div>`;
    days += `<span class="today">${i}</span>`;
    } else {
    //   days += `<div><span class="hover">${i}</span></div>`;
    days += `<span>${i}</span>`;
    }
  }
  
  for (let j = 1; j <= nextDays; j++) {
    // days += `<div class="next-date"><span class="hover">${j}</span></div>`;
    days += `<span class="next-date">${j}</span>`;
  }
  monthDays.innerHTML = days;
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
//   console.log(date.getMonth())
});
// console.log(date.getFullYear())
renderCalendar();