// timer.js

const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const set_time = document.getElementById("set_time");
const list = document.getElementById("list");
let time = [];
let pause = false;

// script.js

const updateTimersDisplay = () => {
  const timerHTML =
    time.length === 0
      ? "<h3>No Timer Available</h3>"
      : time
          .map((timer, index) => {
            const hour = Math.floor(timer.remaining / 3600);
            const minute = Math.floor((timer.remaining % 3600) / 60);
            const second = timer.remaining % 60;
            const isTimeUp = timer.remaining <= 0;

            if (isTimeUp) {
              setTimeout(() => {
                time.splice(index, 1);
                updateTimersDisplay();
              }, 5000); 
            }

            return `
              <div class="time-body ${isTimeUp ? "time-up" : ""}" id="timer">
                <h3>${isTimeUp ? "Time is Up" : "Time Left"}</h3>
                <div class="time-input">
                  <div class="time">
                    <h1>${hour.toString().padStart(2, "0")}</h1>
                    :
                    <h1>${minute.toString().padStart(2, "0")}</h1>
                    :
                    <h1>${second.toString().padStart(2, "0")}</h1>
                  </div>
                  ${
                    !isTimeUp
                      ? `
                    <button onclick="deleteTimer(${index})">Delete</button>
                    <button onclick="StopTimer(${index})">Stop</button>
                  `
                      : ""
                  }
                </div>
              </div>
            `;
          })
          .join("");

  list.innerHTML = timerHTML;
};

const startTimer = (index) => {
  if (time[index].timerId) {
    clearInterval(time[index].timerId);
  }

  const timerId = setInterval(() => {
    time[index].remaining--;

    if (time[index].remaining <= 0) {
      clearInterval(timerId);

      updateTimersDisplay();

      const audioElement = document.getElementById("timerAudio");
      audioElement.src = "./mixkit-video-game-bomb-alert-2803.wav";
      audioElement.play();
    } else {
      updateTimersDisplay(); // Update the timer display every second
    }
  }, 1000);

  time[index].timerId = timerId;
};

const setTime = () => {
  const Hour = () => {
    if (hour.value === "") {
      return 0;
    } else {
      return parseInt(hour.value) * 3600;
    }
  };

  const Minute = () => {
    if (minute.value === "") {
      return 0;
    } else {
      return parseInt(minute.value) * 60;
    }
  };

  const Second = () => {
    if (second.value === "") {
      alert("Please enter the second value");
      return 0;
    } else {
      return parseInt(second.value);
    }
  };

  let totalSeconds = Hour() + Minute() + Second();
  if (totalSeconds <= 0) {
    alert("Please enter a valid time greater than zero.");
    return;
  } else {
    time.push({ remaining: totalSeconds, timerId: null });
    const index = time.length - 1;
    startTimer(index);
    updateTimersDisplay();
    hour.value = "";
    minute.value = "";
    second.value = "";
    updateTimersDisplay();
  }
};

const deleteTimer = (index) => {
  clearInterval(time[index].timerId);
  time.splice(index, 1);
  updateTimersDisplay();
};

const StopTimer = (index) => {
  clearInterval(time[index].timerId);
  time[index].timerId = null;
  updateTimersDisplay();
  pause = true;

  // if (pause) {
  // }
};

document.getElementById("set_time").addEventListener("click", () => setTime());