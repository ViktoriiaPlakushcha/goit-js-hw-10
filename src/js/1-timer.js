import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button");
const timerFace = document.querySelectorAll(".value");

startBtn.disabled = true;
let userSelectedDate = null;
let isActive = false;
let intervalId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0].getTime() < Date.now()) {
        startBtn.disabled = true;
        return iziToast.error({
          
          message: 'Please choose a date in the future',
          class: 'alert',
          icon: 'ico-error',
          iconColor: 'white',
          position: 'topRight',
          backgroundColor: 'red',
          messageColor: 'white',
          maxWidth: '500px',
      });
      } else {
        userSelectedDate = selectedDates[0].getTime();
        startBtn.disabled = false;
      };
    },
  };
const flatPk = flatpickr(datePicker, options);
  
startBtn.addEventListener("click", handleClick);

function handleClick() {
  startBtn.disabled = true;
  datePicker.disabled = true;
  if (isActive) {
    return;
  }
  isActive = true;
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = userSelectedDate - currentTime;
    
    if (deltaTime <= 0) {
      clearInterval(intervalId);
      isActive = false;
      startBtn.disabled = false;
      datePicker.disabled = false;
      updateTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const time = convertMs(deltaTime);
    updateTime(time);
    
  },
    1000);
};

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
};
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
};
function updateTime({ days, hours, minutes, seconds }) {
  timerFace[0].textContent = `${addLeadingZero(days)}`;
  timerFace[1].textContent = `${addLeadingZero(hours)}`;
  timerFace[2].textContent = `${addLeadingZero(minutes)}`;
  timerFace[3].textContent = `${addLeadingZero(seconds)}`;
};
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
