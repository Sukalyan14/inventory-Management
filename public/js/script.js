//Calendar
const date_dropdown = document.querySelectorAll('[dropdown-zone]');
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

//Calendar Rendar
const renderCalendar = (date_month_year, date_day) => {
  date.setDate(1); //Date Starts from zero so it needs to be set to 1
  // console.log(date_month_year)
  // console.log(date_day)
  date_day.innerHTML = '';
  date_month_year.innerText = '';

  const lastDay = new Date( //Current Month
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date( //Remaining days for prev month
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();


  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date( //Upcoming days for next month
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  date_month_year.innerText = `${months[date.getMonth()]} ${date.getFullYear()}`;
  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    // days += `<div class="prev-date"><span class="hover">${prevLastDay - x + 1}</span></div>`;
    days += `<span class="prev-date">${prevLastDay - x + 1}</span>`;
  }

  // for (let i = 1; i <= lastDay; i++) {
  //   if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
  //     //   days += `<div class="today"><span class="hover">${i}</span></div>`;
  //     // days += `<span class="today date-button">${i}</span>`;
  //   } else {
  //     //   days += `<div><span class="hover">${i}</span></div>`;
  //     days += `<span class="date-button">${i}</span>`;
  //   }
  // }

  for (let i = 1; i <= lastDay; i++) {
    days += `<span class="date-button">${i}</span>`;
  }

  for (let j = 1; j <= nextDays; j++) {
    // days += `<div class="next-date"><span class="hover">${j}</span></div>`;
    days += `<span class="next-date">${j}</span>`;
  }
  // days_section.forEach(day => {
  //   day.innerHTML = days;
  // })
  date_day.innerHTML = days;
};

//Calendar Dropdown
date_dropdown.forEach(d => {
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

      // month = e.target.nextElementSibling.children.item(0).children.item(1).children.item(0);
      month = e.target.nextElementSibling.children[0].children[1].children[0]; //Sending where specific month has to be changed
      day = e.target.nextElementSibling.children[2]
      // day = e.target.nextElementSibling.children.item(2);
      
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
      
      // month = e.target.parentElement.nextElementSibling.children.item(0).children.item(1).children.item(0);
      month = e.target.parentElement.nextElementSibling.children[0].children[1].children[0]
      day = e.target.parentElement.nextElementSibling.children[2]
      
      // date.setMonth(date.getMonth());
      // console.log(date)
      renderCalendar(month , day);
    }
    // calendar.classList.toggle('disappear');
    // || e.target.closest('[dropdown-zone]')

  // Do Not Use This for date select beacause this one is only triggered when the dropdown is clicked , as such date selecting function stops working after changing calendar

    // const date_button = document.querySelectorAll(".date-button").forEach(d => {
    //   d.addEventListener("click" , (e) => {
    //     e.preventDefault();
    //     console.log(e.target)
    //     // console.log(e.target)
    //     let month_year = e.target.closest(".calendar").children[0].children[1].children[0].innerText.split(" ")
    //     let selected_Date = e.target.innerText;
    //     let selected_month_number = months.indexOf(month_year[0]) + 1; //Getting Month No.
    //     let selected_year = month_year[1]
    //     // console.log(e.target.closest('.date-line').children.item(0).children.item(0).innerText)
    //     e.target.closest('.date-line').children[0].children[0].innerText = `${selected_Date}/${selected_month_number}/${selected_year}`;

    //     e.target.closest('.calendar').classList.add('disappear')
    //   })
    // })
  })
})

//Calendar date Select
days_section.forEach(date => {
  date.addEventListener('click' , (e)=> {
      e.preventDefault();
      // console.log(e.target)
      const date_button = e.target.matches(".date-button")
      // const d  = e.target.classList.contains('next-date')
    // console.log(c)
      // if (!date_button || e.target.classList.contains('prev-date') || e.target.classList.contains('next-date')) {
      if(!date_button || e.target.className.includes('prev-date') || e.target.className.includes('next-date')){
        //Checking if date in present active calendar is shown and prevent all display bug
        // console.log(1)
        return;
      } else{
        // console.log(2)
        
        let month_year = e.target.closest(".calendar").children[0].children[1].children[0].innerText.split(" ")
        let selected_Date = e.target.innerText;
        let selected_month_number = months.indexOf(month_year[0]) + 1; //Getting Month No.
        let selected_year = month_year[1]
        
        // console.log(e.target.closest('.date-line').children.item(0).children.item(0).innerText)

        e.target.closest('.date-line').children[0].children[0].innerText = `${selected_Date}/${selected_month_number}/${selected_year}`;
      }
    e.target.closest('.calendar').classList.add('disappear')
  })
})

//Rendendring prev month dates
document.querySelectorAll(".prev").forEach(prev => {
  prev.addEventListener("click", (e) => {
    e.preventDefault();
    date.setMonth(date.getMonth() - 1);

    month = e.target.nextElementSibling.children.item(0);

    day = e.target.parentElement.nextElementSibling.nextElementSibling;

    renderCalendar(month, day);
  });
})

//Rendering Next Month Dates
document.querySelectorAll(".next").forEach(next => {
    next.addEventListener("click", (e) => {
      e.preventDefault();
      date.setMonth(date.getMonth() + 1);

      month = e.target.previousElementSibling.children.item(0);

      day = e.target.parentElement.nextElementSibling.nextElementSibling;
      
      renderCalendar(month , day);
  });
})
// calendar End

//Progress Bar
// const progress = document.querySelector("#progress");
// const circles = document.querySelectorAll(".circle");
// const actives = document.querySelectorAll(".active")

// function previousElementSibling(element , m){
//   const prevSibling = [];
//   while(m > 0){
//     let prev = element.previousElementSibling;
//     prevSibling.push(prev)
//     m--;
//     element = prev
//   }
//   return prevSibling
// }

// function nextElementSibling(element , m ){
//   const nextSibling = [];
//     while(element){
//     let next = element.nextElementSibling;
//     nextSibling.push(next)
//     element = next
//   }
//   console.log(nextSibling)
//   return nextSibling
// }

// circles.forEach((circle , index) => {
//   circle.addEventListener("click" , (e) => {
//     e.preventDefault();
//     const actives = document.querySelectorAll(".active")

    
//     // Putting  a limit to progress width
//     let progress_length = ((index+1)/(circles.length-1))*100;
        
//     if(index === 0){
//       circle.classList.add('active')
//       // circle.classList.remove('incomplete')
//       circle.innerHTML = `<i class="fa-regular fa-circle-check"></i>`
//       progress.style.width = ((index+1)/(circles.length - 1))*100 + "%";
//       circle.nextElementSibling.classList.add("in-progress")

//     } else {
//       let m = index

//       const allPrevSiblingElement = previousElementSibling(circle , m)
//       const allNextSiblingElement = nextElementSibling(circle , m)
      
//       for( let elem of allPrevSiblingElement){
//         if(!elem.classList.contains("incomplete") && !elem.classList.contains("in-progress")) {
//           circle.classList.add('active')
//           circle.classList.remove('incomplete')
//           circle.classList.remove("in-progress")
//           circle.innerHTML = `<i class="fa-regular fa-circle-check"></i>`

//           if(progress_length <= 100) {  //Limiting Length
//             progress.style.width = ((index+1)/(circles.length - 1))*100 + "%";
//             // circle.nextElementSibling.classList.add("in-progress")
//           }
//         }
//         else return
//       }
//     }
    
//   })
// })

//Fetch Request
const getData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data)
    return data;
  } catch (err) {
    console.log(err);
  }
}

const postData = async (url, payload) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: payload
    })
    const data = await res.json();
    return data
  } catch (err) {
    console.log(err)
  }
}
//PO Form
//Outside Form
const date_left = document.querySelector('#date-left span')
const date_right = document.querySelector('#date-right span')
const check_box_area = document.querySelector("#checkbox-area")
const upload = document.querySelector("#hiddenInput")
const form = document.querySelector("#po-form")

let selected_radio;

function error_message(element, message, flag) {
  if (flag == 1) {
    element.innerText = message
    element.style.visibility = 'visible'
  } else {
    element.style.visibility = 'hidden'
  }
}

function checkdates() {

  if (date_left.innerText === 'Select Date...') {
    // console.log(1)
    error_message(date_left.nextElementSibling.nextElementSibling, "Pls Select the date", 1)
    return false
  } else if (date_right.innerText === 'Select Date...') {
    // console.log(2)
    error_message(date_right.nextElementSibling.nextElementSibling, "Pls Select the date", 1)
    return false
  } else {
    // console.log(3)
    let date_checker_2 = checkdates_2(date_left.innerText, date_right.innerText)
    if (date_checker_2) {
      error_message(date_left.nextElementSibling.nextElementSibling, " ", 0)
      error_message(date_right.nextElementSibling.nextElementSibling, " ", 0)
      return true
    } else {
      return false
    }
  }


}

function checkdates_2(left, right) {
  let dateParts = {
    left: left.split("/"),
    right: right.split("/")
  } //Default dateObjec Format is YY/MM/DD

  const x = new Date(+dateParts.left[2], dateParts.left[1] - 1, +dateParts.left[0]);
  const y = new Date(+dateParts.right[2], dateParts.right[1] - 1, +dateParts.right[0]);
  // console.log(x, y)
  if (x > y) {
    // console.log(4)
    date_error_message(date_left.nextElementSibling.nextElementSibling, "Issue Date is after Due date", 1)
    date_error_message(date_right.nextElementSibling.nextElementSibling, "Due Date is before Due date", 1)
    return false
  } else {
    return true
  }
}

function check_order_type(radio) {
  // console.log(check_box_area.nextElementSibling)
  if (typeof radio === "undefined") {
    // console.log(10)
    error_message(check_box_area.nextElementSibling, "Please Select Order Type", 1)
    // alert('Select Order Type')
    return false
  }
  error_message(check_box_area.nextElementSibling, " ", 0)
  return true
}

//Checkboxes
check_box_area.addEventListener("click" , (e) => {
  // e.preventDefault();
  e.stopPropagation();
  let arr = [];
  // if (e.target.closest(".quote") || e.target.closest(".Online") || e.target.closest(".local") || e.target.closest(".Intl")) {
  // console.log(e.target)
  if(e.target.matches("label")){
    // console.log(e.target.parentElement.className);
    let string = e.target.className
    arr = string.match(/\w+/g)  //Checkiong for gaps between string and picking each word
    // e.preventDefault()
  } else if (e.target.closest("label")){
    let string = e.target.parentElement.className
    arr = string.match(/\w+/g)
  }
  // console.log(arr[3])
  selected_radio = arr[3]
})

//Inside Form
upload.addEventListener("change", (e) => {
  // console.log(hiddenInput.files)
  e.preventDefault();
  const fileNameList = Array.from(upload.files).map(function (file) {
    return file.name;
  });
  const span_message = e.target.parentElement.children.item(2)
  if (fileNameList.length > 0) {
    span_message.innerText = fileNameList;
    span_message.parentElement.style.backgroundColor = `#58D68D`;
  } else {
    span_message.innerText = `Add File`
    span_message.parentElement.style.backgroundColor = `#2196F3`;
  }
})

// let url = "http://localhost:3000/patient-register";
form.addEventListener("submit" , (e) => {
  e.preventDefault();
  
  const formdata = new FormData(form)

  let date_checker = checkdates();
  let order_type_checker = check_order_type(selected_radio)

  if(date_checker && order_type_checker){
    formdata.append('issue_date', date_left.innerText)
    formdata.append('due_date', date_right.innerText)
    formdata.append('type', selected_radio)
    formdata.append("PO_File" , upload.files[0])

    postData("http://localhost:3000/purchase-order", formdata).then(data => console.log(data)) //Returns a promise so it needs to be resolve if used with async await
    // postData(url , formdata)
    // result.then(data => {    
    //   console.log(data)
    // })
  }
  
})

//Form Tggler
const form_in = document.querySelector("#form-in");
const form_out = document.querySelector("#form-out");
const form_wrapper = document.querySelector("#form-wrapper");

form_out.addEventListener("click" , (e) => {
  e.preventDefault();
  // form_wrapper.style.top = "-50%";
  form_wrapper.classList.toggle("wrapper-appear")
})

form_in.addEventListener("click", (e) => {
  e.preventDefault();
  // form_wrapper.style.top = "50%";
  form_wrapper.classList.toggle("wrapper-appear")
})


//Table
const table_body = document.querySelector("#table-body")
// console.log(table_body.previousElementSibling.children[0].children.length)
const table_header_row_length = table_body.previousElementSibling.children[0].children.length;

table_body.replaceChildren();
//class name for delete-tablo-row
const delete_icon_class = "fa-solid fa-xmark delete-row";

function table_render(data){
  // console.log(data[0])
  let td , tr;
  tr = document.createElement('tr')
  for( let i in data){
    let row_data = Object.values(data[i])
    // console.log(row_data)
    let row = table_body.insertRow(i)

    for(let x = 0 ; x < table_header_row_length ; x++){
      // console.log(x)
      if(x === 11){
        const icon = document.createElement('i')
        icon.classList.add('fa-solid' , 'fa-xmark' , 'delete-row')
        const final_cell = row.insertCell(x)
        final_cell.appendChild(icon)
      } else {
        row.insertCell(x).innerText = row_data[x]
      }
      
    }
  }
  // tr.appendChild
  // table_body.append(tr)
  
  // table_body.appendChild(table_row)
}

getData("http://localhost:3000/table-info").then(data => table_render(data))


// console.log(res)
// window.addEventListener('load' , (e) => {
//   e.preventDefault();
//   console.log(5)
//   // getData("http://localhost:3000/table-info").then(data => console.log(data))
// })

