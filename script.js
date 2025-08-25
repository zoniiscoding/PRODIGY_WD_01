let startTime, updatedTime, difference = 0, tInterval;
let running = false;
let lapCounter = 1;
let lapTimes = [];

const display = document.getElementById("display");
const status = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const clearLapsBtn = document.getElementById("clearLapsBtn");
const saveTxtBtn = document.getElementById("saveTxtBtn");
const saveCsvBtn = document.getElementById("saveCsvBtn");
const darkModeBtn = document.getElementById("darkModeBtn");
const laps = document.getElementById("laps");
const stats = document.getElementById("stats");

function startTimer() {
  if (!running) {
    startTime = new Date().getTime() - difference;
    tInterval = setInterval(updateDisplay, 10);
    running = true;
    status.innerHTML = "⏵ Running";
    startBtn.innerText = "⏸ Pause";
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
    clearLapsBtn.disabled = false;
    saveTxtBtn.disabled = false;
    saveCsvBtn.disabled = false;
  } else {
    pauseTimer();
  }
}

function pauseTimer() {
  clearInterval(tInterval);
  running = false;
  status.innerHTML = "⏸ Paused";
  startBtn.innerText = "▶ Resume";
}

function resetTimer() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  display.innerHTML = "00:00:00:000";
  status.innerHTML = "⏹ Stopped";
  startBtn.innerText = "▶ Start";
  laps.innerHTML = "";
  lapCounter = 1;
  lapTimes = [];
  stats.innerHTML

