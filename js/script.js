var logStart = performance.now();
const version = "0.1";
const time = document.querySelector("#time");
const dateEl = document.querySelector("#date");
const date = new Date();
const format = getFormat();
let hours = (param) => {
  let t = param || date.getHours();
  if (format.time == "12") {
    t = t > 12 ? t - 12 : t;
  } else if (format.time == "24") {
    t = t < 10 ? "0" + t : t;
  } else {
    setFormat("24");
  }
  return t;
};
let minutes = (param) => {
  let t = param || date.getMinutes();
  if (t < 10) t = "0" + t;
  return t;
};
let seconds = (param) => {
  let t = param || date.getSeconds();
  if (t < 10) t = "0" + t;
  return t;
};
let miliseconds = () => date.getMilliseconds();
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
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
let day = () => {
  return days[date.getDay() - 1];
};
var dd = String(date.getDate()).padStart(2, "0");
var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = date.getFullYear();
var yy = yyyy.toString().slice(-2);

let currDate;
let currTime;

//

setInterval(() => {
  date.setSeconds(date.getSeconds() + 1);
  currTime = format.timeDivider
    .replace(/hh/g, hours())
    .replace(/mm/g, minutes())
    .replace(/ss/g, seconds())
    .replace(/M/g, hours > 12 ? "AM" : "PM");
  currDate = format.date
    .replace(/dd/g, dd)
    .replace(/mm/g, mm)
    .replace(/yyyy/g, yyyy)
    .replace(/yy/g, yy)
    .replace(/DAY/g, day);
  if (format.showMeridiem) {
    format.timeDivider = "M hh:mm:ss";
    format.showMeridiem = false;
  }
  if (format.showDay) {
    format.date = "DAY dd/mm/yyyy";
    format.showDay = false;
  }
}, 1000);

const draw = () => {
  intervalID = setInterval(() => {
    if (currDate || currTime) {
      time.innerText = currTime;
      dateEl.innerText = currDate;
    } else {
      time.innerText = `v${version}`;
    }
  }, 200);
};

//

function getFormat() {
  if (!localStorage.getItem("SimpleDigitalClock_FORMAT")) {
    localStorage.setItem(
      "SimpleDigitalClock_FORMAT",
      JSON.stringify({
        time: "12",
        date: "dd/mm/yyyy",
        timeDivider: "hh:mm:ss",
      })
    );
  }

  return JSON.parse(localStorage.getItem("SimpleDigitalClock_FORMAT"));
}

function setFormat({
  formatDate = "dd/mm/yyyy",
  formatTimeDivider = "hh:mm:ss",
  formatTime = "12",
  showDay = false,
}) {
  format.time = formatTime;
  format.date = formatDate;
  format.timeDivider = formatTimeDivider;
  format.showDay = showDay;
}

function setFontSize(date = 1, time = 4) {
  document.querySelector("#date").style.fontSize = date + "rem";
  document.querySelector("#time").style.fontSize = time + "rem";
}

function resetFontSize() {
  setFontSize();
}

function setBackground(bg = "transparent") {
  // document.querySelector('body').style.background = bg;
  // document.querySelector('body').style.background = `linear-gradient(to bottom right, ${bgGradient[0]}, ${bgGradient[1]});`;
  document.body.style.background = bg;
}

function setColor(color) {
  document.querySelectorAll(".date-time").forEach((el) => {
    el.style.color = color;
  });
}

function stop() {
  clearInterval(intervalID);
}

function start() {
  draw();
}

setFontSize(2, 8);
start();
setTimeout(() => {
  console.clear();
  var logStop = performance.now();
  console.log(`Content Loaded (${((logStop - logStart) / 1000).toFixed(1)}s)`);
  console.log(
    `Simple Digital Clock v${version}🕒\nBuilt With ❤️ By Kevin\nhttps://github.com/kevinnvm`
  );
}, 1500);
