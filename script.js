let time = 1500; // 25 minutes
let timer;
let isRunning = false;

function updateDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  document.getElementById("timer").innerText =
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;
  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(timer);
      alert("Time's up!");
      isRunning = false;
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  time = 1500;
  isRunning = false;
  updateDisplay();
}

function setMode(mode) {
  clearInterval(timer);
  isRunning = false;

  if (mode === "pomodoro") {
    time = 1500;
  } else {
    time = 300;
  }

  updateDisplay();
}

// Initialize
updateDisplay();