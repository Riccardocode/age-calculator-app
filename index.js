const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

const days = document.getElementById("days");
const months = document.getElementById("months");
const years = document.getElementById("years");

const labelDay = document.getElementById("id-label-day");
const labelMonth = document.getElementById("id-label-month");
const labelYear = document.getElementById("id-label-year");

const textAlertDay = document.getElementById("id-text-alert-day");
const textAlertMonth = document.getElementById("id-text-alert-month");
const textAlertYear = document.getElementById("id-text-alert-year");


setDayAlert = (text) => {
  textAlertDay.textContent = text;
  labelDay.classList.add("text-alert");
  day.classList.add("input-box-alert");
  
};
setMonthAlert = (text) =>{
    textAlertMonth.textContent = text;
    labelMonth.classList.add("text-alert");
    month.classList.add("input-box-alert");
 
}
setYearAlert = (text) =>{
    textAlertYear.textContent = text;
    labelYear.classList.add("text-alert");
    year.classList.add("input-box-alert");
    
}

const validation = (currentYear) => {
let validated = true;
  if (day.value === "") {
    setDayAlert("This field is required");
    validated = false;
  }
  if (month.value === "") {
    setMonthAlert("This field is required");
    validated = false;
  }
  if (year.value === "") {
   setYearAlert("This field is required");
   validated = false;
  }
  if (validated) {
    let d = parseInt(day.value);
    let m = parseInt(month.value);
    let y = parseInt(year.value);
    if (d & m & y) {
      if ((d < 0) | (d > 31)) {
        setDayAlert("Must be a valid day");
        validated = false;
      }

      // if(day.value <32 | day.value >28){
      //     let m = month.value;
      //     if (m = )
      //     textAlertDay.textContent = "Must be a valid day";
      //     labelDay.classList.add("text-alert");
      //     day.classList.add("input-box-alert");
      // }

      if ((m < 0) | (m > 12)) {
       setMonthAlert("Must be a valid month");
       validated = false;
      } else {
        console.log(m);
        if (
          (((m === 11) | (m === 4) | (m === 6) | (m === 9)) & (d > 30)) |
          ((m === 2) & (d > 28))
        ) {
            setDayAlert("Must be a valid day");
            validated = false;
        }
      }

      if (year.value > currentYear) {
        setYearAlert("Must be in the past");
        validated = false;
        
      }

      return validated;
    } else {
      if (!d) {
        setDayAlert("Only numbers allowed")
      }
      if (!m) {
        setMonthAlert("Only numbers allowed");
      }
      if (!y) {
        setYearAlert("Only numbers allowed")
      }
    }
  }
  return validated;
};

resetInput = () => {
  textAlertDay.textContent = "";
  labelDay.classList.remove("text-alert");
  day.classList.remove("input-box-alert");

  textAlertMonth.textContent = "";
  labelMonth.classList.remove("text-alert");
  month.classList.remove("input-box-alert");

  textAlertYear.textContent = "";
  labelYear.classList.remove("text-alert");
  year.classList.remove("input-box-alert");
};

const calculateAge = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  if (validation(currentYear)) {
    let yearsDiff = currentYear - year.value;
    let monthsDiff = currentMonth - month.value;
    if (monthsDiff < 0) {
      yearsDiff--;
      monthsDiff += 12;
    }

    let daysDiff = currentDay - day.value;
    if (daysDiff < 0) {
      monthsDiff--;
      const daysInPreviousMonth = new Date(
        currentYear,
        currentMonth - 1,
        0
      ).getDate();
      daysDiff += daysInPreviousMonth;
    }

    if ((monthsDiff < 0) | (yearsDiff < 0)) {
      setYearAlert("Must be in the past");
    } else {
      years.textContent = yearsDiff;
      months.textContent = monthsDiff;
      days.textContent = daysDiff;
      resetInput();
    }
  }
};
