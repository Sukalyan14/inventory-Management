//Calendar
const date_parts = document.querySelectorAll('[dropdown-zone]');
const days_section = document.querySelectorAll('.days');
const prev_months = document.querySelectorAll('.prev');
const next_months = document.querySelectorAll('.next')
const month_tag = document.querySelectorAll(".date h2")

let month , day , count = 0;

const date = new Date();

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

//Calendar Dropdown
date_parts.forEach(d => {
  
  d.addEventListener('click', (e)=> {
    e.preventDefault();
    // date.setMonth(date.getMonth());
    const current = new Date();
    const current_month = current.getMonth();
    const current_year = current.getFullYear();
    
    date.setMonth(current_month);
    date.setFullYear(current_year);
    // console.log(e.target)
    // console.log(e.target.parentElement.nextElementSibling)
    if(e.target.matches('[dropdown-zone]') ){

      month = e.target.nextElementSibling.children.item(0).children.item(1).children.item(0);

      day = e.target.nextElementSibling.children.item(2);
      
        

      e.target.nextElementSibling.classList.toggle('disappear')
      
      // console.log(current_month)
      // date.setMonth(date.getMonth());
      renderCalendar(month , day);
      
    }

    else if(e.target.parentElement.matches('[dropdown-zone]')){
      // console.log(2)
      e.target.parentElement.nextElementSibling.classList.toggle('disappear');
      // console.log(e.target.parentElement.nextElementSibling.children.item(0).children.item(1).children.item(0))
      // console.log(e.target.parentElement.nextElementSibling.children.item(2))
      
      month = e.target.parentElement.nextElementSibling.children.item(0).children.item(1).children.item(0);

      day = e.target.parentElement.nextElementSibling.children.item(2)
      
      // date.setMonth(date.getMonth());
      console.log(date)
      renderCalendar(month , day);
    }
    // calendar.classList.toggle('disappear');
    // || e.target.closest('[dropdown-zone]')
  })
})

//Calendar date Select
days_section.forEach(date => {
  date.addEventListener('click' , (e)=> {
      e.preventDefault();
      // console.log(e.target.closest('.calendar'))
      // console.log(e.target.closest('.date-line').children.item(0).children.item(0))
      const date_button = e.target.matches(".date-button")
      if(!date_button){
        console.log(1)
      } else{
        console.log(2)
        
        let month_year = e.target.closest(".calendar").children.item(0).children.item(1).children.item(0).innerText.split(" ")
        let selected_Date = e.target.innerText;
        let selected_month_number = months.indexOf(month_year[0]) + 1; 
        let selected_year = month_year[1]
        
        // console.log(e.target.closest('.date-line').children.item(0).children.item(0).innerText)

        e.target.closest('.date-line').children.item(0).children.item(0).innerText = `${selected_Date}/${selected_month_number}/${selected_year}`;
      }
    e.target.closest('.calendar').classList.add('disappear')
  })
})

//Calendar Rendar

const renderCalendar = (date_month_year , date_day) => {
  date.setDate(1); //Date Starts from zero so it needs to be set to 1
  // console.log(date_month_year)
  // console.log(date_day)
  date_day.innerHTML = '';
  date_month_year.innerText = '';
  
  const lastDay = new Date(  //Current Month
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(    //Remaining days for prev month
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();


  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(   //Upcoming days for next month
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  
  // document.querySelectorAll(".date h2").forEach(i => {
    // i.innerText = `${months[date.getMonth()]} ${date.getFullYear()}`; 
  // })
  date_month_year.innerText = `${months[date.getMonth()]} ${date.getFullYear()}`;
  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    // days += `<div class="prev-date"><span class="hover">${prevLastDay - x + 1}</span></div>`;
    days += `<span class="prev-date date-button">${prevLastDay - x + 1}</span>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
    //   days += `<div class="today"><span class="hover">${i}</span></div>`;
    days += `<span class="today date-button">${i}</span>`;
    } else {
    //   days += `<div><span class="hover">${i}</span></div>`;
    days += `<span class="date-button">${i}</span>`;
    }
  }
  
  for (let j = 1; j <= nextDays; j++) {
    // days += `<div class="next-date"><span class="hover">${j}</span></div>`;
    days += `<span class="next-date date-button">${j}</span>`;
  }
  // days_section.forEach(day => {
  //   day.innerHTML = days;
  // })
  date_day.innerHTML = days;
};

document.querySelectorAll(".prev").forEach(prev => {
    prev.addEventListener("click", (e) => {
      e.preventDefault();
      date.setMonth(date.getMonth() - 1);

      month = e.target.nextElementSibling.children.item(0);

      day = e.target.parentElement.nextElementSibling.nextElementSibling;
      
      renderCalendar(month , day);
  });
})


document.querySelectorAll(".next").forEach(next => {
    next.addEventListener("click", (e) => {
      e.preventDefault();
      date.setMonth(date.getMonth() + 1);

      month = e.target.previousElementSibling.children.item(0);

      day = e.target.parentElement.nextElementSibling.nextElementSibling;
      
      renderCalendar(month , day);
  });
})

//Progress Bar
const progress = document.querySelector("#progress");
const circles = document.querySelectorAll(".circle");

let currentActive = 1; 

// const update = () => {

//   const actives = document.querySelectorAll(".active");

//   progress.style.width = ((actives.length - 1)/(circles.length - 1))*100 + "%";
// }

circles.forEach((circle , index) => {
  circle.addEventListener("click" , (e) => {
    e.preventDefault();
    // console.log(e.target.parentElement.matches('.circle'))
    circle.classList.add('active')
    circle.innerHTML = `<i class="fa-regular fa-circle-check"></i>`
    
    // console.log(e.target.previousElementSibling.classList.contains("acitve"))
  })
})