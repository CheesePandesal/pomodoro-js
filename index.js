// let timer;
// let minutes = 25;
// let seconds = 0;
// let isRunning = false;
console.log("hi");
let isPomodoro = true;
console.log(isPomodoro);
// // start the timer
let iterationCount = 0;
// function startTimer() {
//   if (!isRunning) {
//     timer = setInterval(updateTimer, 1000);
//     isRunning = true;
//   }
// }

// function pauseTimer() {
//   clearInterval(timer);
//   isRunning = false;
// }

// function resetTimer() {
//   clearInterval(timer);
//   isRunning = false;
//   minutes = 25;
//   seconds = 0;
//   updateTimerDisplay();
// }

// function updateTimer() {
//   if (minutes === 0 && seconds === 0) {
//     pauseTimer();
//     // Perform any action when the timer ends
//     alert("Time's up!");
//     return;
//   }

//   if (seconds === 0) {
//     minutes--;
//     seconds = 59;
//   } else {
//     seconds--;
//   }

//   updateTimerDisplay();
// }

// function updateTimerDisplay() {
//   const timerDisplay = document.querySelector(".timer");
//   timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
// }

// document.getElementById("start").addEventListener("click", startTimer);
// document.getElementById("pause").addEventListener("click", pauseTimer);
// document.getElementById("reset").addEventListener("click", resetTimer);

let timer;
let minutes = 25;
let shortBreakMinutes = 5;
let longBreakMinutes = 15;
let seconds = 0;
let isStart = true;
let isRunning = false;
const spanDisplay = document.querySelector(".start-pause-text");

function handleClick() {
  clickAudio.play();
  if (isStart) {
    spanDisplay.textContent = "PAUSE";
    startTimer();
    isStart = !isStart;
  } else {
    spanDisplay.textContent = "START";
    pauseTimer();
    isStart = !isStart;
  }
}
function startTimer() {
  if (!isRunning) {
    timer = setInterval(updateTimer, 1000);
    isRunning = true;
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;

}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isStart = !isStart
  //   minutes = 25;
  spanDisplay.textContent = "START";
  seconds = 0;
 
  updateTimerDisplay();
}

function updateTimer() {
  if (minutes === 0 && seconds === 0) {
    pauseTimer();
    // Perform any action when the timer ends
    clockRingAudio.play();
    changeOptionAfterTimerIsUp()
    return;
  }

  if (seconds === 0) {
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }

  updateTimerDisplay();
}

function changeOptionAfterTimerIsUp() {
    console.log("this is inside the changeOptionAfterTimerIsUp function");
    console.log("This is the iteraction count" + iterationCount)
  while (true) {
    if (iterationCount < 4) {
      if (iterationCount % 2 === 0) {
        console.log("this is inside that will switch to short break")
        switchShortBreak();
        
      } else {
        console.log("this is inside that will switch to pomodoro")
        switchPomodoro();
        
      }
    } else if (iterationCount === 4) {
      switchLongBreak();
      
    } else {
      iterationCount = 1;
      continue;
    }
   
    resetTimer()
    iterationCount++;
    return
  }
}

function updateTimerDisplay() {
  let titleDescription = document.title.substring(6);
  document.title = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")} ${titleDescription}`;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function changeOption(option) {
  isStart = !isStart
  if (option == "pomodoro") {
    switchPomodoro();
  } else if (option == "short-break") {
    switchShortBreak();
  } else {
    switchLongBreak();
  }
  resetTimer();
}

function switchPomodoro() {
  minutes = 25;
  btn.style.left = "6px";
  document.title = "25:00 - Time to Focus!";
  pomodoroOption.classList.add("chosen");
  shortBreakOption.classList.remove("chosen");
  longBreakOption.classList.remove("chosen");
}
function switchShortBreak() {
  minutes = 5;
  btn.style.left = "154px";
  document.title = "05:00 - Time for a break!";
  shortBreakOption.classList.add("chosen");
  pomodoroOption.classList.remove("chosen");
  longBreakOption.classList.remove("chosen");
}

function switchLongBreak() {
  minutes = 15;
  btn.style.left = "305px";
  document.title = "15:00 - Time for a break!";
  longBreakOption.classList.add("chosen");
  shortBreakOption.classList.remove("chosen");
  pomodoroOption.classList.remove("chosen");
}

const btn = document.getElementById("btn");
const clickAudio = document.getElementById("buttonClick");
const clockRingAudio = document.getElementById("clockRing");
const pomodoroOption = document.getElementById("pomodoro-option");
const shortBreakOption = document.getElementById("short-break-option");
const longBreakOption = document.getElementById("long-break-option");
const timerDisplay = document.querySelector(".timer");
document.getElementById("start-pause").addEventListener("click", handleClick);
document.getElementById("reset").addEventListener("click", resetTimer);
pomodoroOption.addEventListener("click", () => {
  changeOption("pomodoro");
});
shortBreakOption.addEventListener("click", () => {
  changeOption("short-break");
});
longBreakOption.addEventListener("click", () => {
  changeOption("long-break");
});
