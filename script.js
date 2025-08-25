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
  stats.innerHTML = "";
  [pauseBtn, resetBtn, lapBtn, clearLapsBtn, saveTxtBtn, saveCsvBtn].forEach(btn => btn.disabled = true);
}

function updateDisplay() {
  updatedTime = new Date().getTime() - startTime;
  difference = updatedTime;

  let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((difference / (1000 * 60)) % 60);
  let seconds = Math.floor((difference / 1000) % 60);
  let milliseconds = Math.floor((difference % 1000));

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = milliseconds.toString().padStart(3, "0");

  display.innerHTML = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
  if (running) {
    let lapTime = difference;
    lapTimes.push(lapTime);

    let li = document.createElement("li");
    li.classList.add("normal");
    li.innerText = `Lap ${lapCounter}: ${display.innerHTML}`;
    laps.appendChild(li);

    lapCounter++;
    highlightLaps();
    updateStats();
  }
}

function highlightLaps() {
  let fastest = Math.min(...lapTimes);
  let slowest = Math.max(...lapTimes);

  [...laps.children].forEach((li, index) => {
    li.className = "normal";
    if (lapTimes[index] === fastest) {
      li.classList.add("fastest");
      li.innerText = `Lap ${index+1}: ${formatTime(lapTimes[index])} 🏆 Fastest`;
    } else if (lapTimes[index] === slowest) {
      li.classList.add("slowest");
      li.innerText = `Lap ${index+1}: ${formatTime(lapTimes[index])} 🐢 Slowest`;
    } else {
      li.innerText = `Lap ${index+1}: ${formatTime(lapTimes[index])}`;
    }
  });
}

function formatTime(ms) {
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let seconds = Math.floor((ms / 1000) % 60);
  let milliseconds = Math.floor((ms % 1000));

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = milliseconds.toString().padStart(3, "0");

  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function clearLaps() {
  laps.innerHTML = "";
  lapTimes = [];
  lapCounter = 1;
  stats.innerHTML = "";
}

function updateStats() {
  if (lapTimes.length > 0) {
    let total = lapTimes[lapTimes.length-1];
    let avg = lapTimes.reduce((a,b)=>a+b,0) / lapTimes.length;
    stats.innerHTML = `⏱ Total: ${formatTime(total)} | 📊 Avg Lap: ${formatTime(avg)}`;
  }
}

function saveFile(type) {
  if (lapTimes.length === 0) return;

  let content = "";
  if (type === "txt") {
    content = lapTimes.map((t,i)=>`Lap ${i+1}: ${formatTime(t)}`).join("\n");
  } else if (type === "csv") {
    content = "Lap,Time\n" + lapTimes.map((t,i)=>`${i+1},${formatTime(t)}`).join("\n");
  }

  const blob = new Blob([content], {type: "text/plain"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `stopwatch.${type}`;
  link.click();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  darkModeBtn.innerText = document.body.classList.contains("dark") ? "☀️ Light" : "🌙 Dark";
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") { e.preventDefault(); startTimer(); }
  if (e.key.toLowerCase() === "l") { recordLap(); }
  if (e.key.toLowerCase() === "r") { resetTimer(); }
});

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
clearLapsBtn.addEventListener("click", clearLaps);
saveTxtBtn.addEventListener("click", () => saveFile("txt"));
saveCsvBtn.addEventListener("click", () => saveFile("csv"));
darkModeBtn.addEventListener("click", toggleDarkMode);


