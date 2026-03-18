const CIRC = 2 * Math.PI * 108;

let settings = { focus:25, short:5, long:15 };
let mode = "focus";

let total = settings.focus * 60;
let time = total;
let running = false;
let timer;
let sessions = 0;

function updateDisplay(){
  let m = String(Math.floor(time/60)).padStart(2,'0');
  let s = String(time%60).padStart(2,'0');
  document.getElementById("timeDisplay").textContent = `${m}:${s}`;
}

function updateRing(){
  let offset = CIRC * (1 - time/total);
  document.getElementById("ringProg").style.strokeDashoffset = offset;
}

function toggleTimer(){
  running ? pauseTimer() : startTimer();
}

function startTimer(){
  running = true;
  document.getElementById("startBtn").textContent="Pause";
  timer = setInterval(()=>{
    if(time<=0){
      complete();
      return;
    }
    time--;
    updateDisplay();
    updateRing();
  },1000);
}

function pauseTimer(){
  running=false;
  document.getElementById("startBtn").textContent="Start";
  clearInterval(timer);
}

function resetTimer(){
  pauseTimer();
  time = settings[mode]*60;
  total = time;
  updateDisplay();
  updateRing();
}

function setMode(m){
  pauseTimer();
  mode = m;
  total = settings[m]*60;
  time = total;

  document.querySelectorAll(".mode-tab").forEach(b=>b.classList.remove("active"));
  document.querySelector(`[data-mode="${m}"]`).classList.add("active");

  updateDisplay();
  updateRing();
}

function complete(){
  pauseTimer();
  showFlash("✨ Session Done!");

  if(mode==="focus"){
    sessions++;
    nextMode = sessions % 4 === 0 ? "long" : "short";
  } else {
    nextMode = "focus";
  }

  setTimeout(()=>setMode(nextMode),1500);
}

function skipPhase(){
  complete();
}

function showFlash(msg){
  let el=document.getElementById("flash");
  el.textContent=msg;
  el.classList.add("show");
  setTimeout(()=>el.classList.remove("show"),2000);
}

updateDisplay();
updateRing();