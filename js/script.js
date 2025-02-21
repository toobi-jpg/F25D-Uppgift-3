function hamburgerMenu() {
  const menu = document.querySelector(".hamburger-menu");
  menu.classList.toggle("show");
}

const themeSwitch = document.getElementById("theme-switch");

let savedTheme = localStorage.getItem("mode");
if (savedTheme) {
  document.body.classList.add(savedTheme);
} else {
  document.body.classList.add("lightmode");
}
updateIcons();

themeSwitch.addEventListener("click", () => {
  if (document.body.classList.contains("lightmode")) {
    document.body.classList.remove("lightmode");
    document.body.classList.add("darkmode");
    localStorage.setItem("mode", "darkmode");
  } else {
    document.body.classList.remove("darkmode");
    document.body.classList.add("lightmode");
    localStorage.setItem("mode", "lightmode");
  }
  updateIcons();
});

let obsText = document.getElementById("obs-text");
themeSwitch.addEventListener("mouseover", () => {
  if (window.innerWidth >= 1000) {
    obsText.style.display = "block";
  }
});

themeSwitch.addEventListener("mouseout", () => {
  if (window.innerWidth >= 1000) {
    obsText.style.display = "none";
  }
});

function updateIcons() {
  const moonIcon = document.querySelector("#theme-switch svg:first-child");
  const sunIcon = document.querySelector("#theme-switch svg:last-child");

  if (document.body.classList.contains("darkmode")) {
    moonIcon.style.display = "none";
    sunIcon.style.display = "block";
  } else {
    moonIcon.style.display = "block";
    sunIcon.style.display = "none";
  }
}

const navLink = document.querySelectorAll(".nav_link");
const windowPathnmae = window.location.pathname;

navLink.forEach((navLink) => {
  if (navLink.href.includes(windowPathnmae)) {
    navLink.classList.add("active");
  }
});

const sendEmail = document.querySelector(".sendbutton");
const functionMsg = document.getElementById("function-msg");
if (sendEmail && functionMsg) {
  sendEmail.addEventListener("click", () => {
    functionMsg.textContent = "Denna funktion är avaktiverad.";
  });
}
const contactText = document.querySelector(".left-container");
if (contactText) {
  window.onload = function () {
    if (contactText) {
      contactText.classList.add("show");
    }
  };
}

const cvbtn = document.getElementById("cvbtn");
const popup = document.getElementById("popup-div-background");
const closePopup = document.getElementById("close-popup");
if (cvbtn) {
  cvbtn.addEventListener("click", () => {
    popupData();
    popup.style.display = "block";
  });
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });
}

async function popupData() {
  const cvjson = await getData();

  const utbildningarDl = document.getElementById("Utbildningar-list");
  const arbeteDl = document.getElementById("Arbete-list");

  utbildningarDl.innerHTML = "";
  arbeteDl.innerHTML = "";

  if (cvjson.UTBILDNING) {
    cvjson.UTBILDNING.forEach((item, index) => {
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");

      dt.textContent = `${item.skola}`;
      dd.textContent = `${item.program} (${item.år})`;

      dt.id = `utbildning-text-${index}`;
      dd.id = `utbildning-text-${index}`;

      utbildningarDl.appendChild(dt);
      utbildningarDl.appendChild(dd);

      if (index === 0) {
        const span = document.createElement("span");
        span.textContent = "Aktiv";
        dt.appendChild(span);
      }
    });
  }

  if (cvjson.ARBETSLIVSERFARENHET) {
    cvjson.ARBETSLIVSERFARENHET.forEach((job, index) => {
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");

      dt.textContent = `${job.titel}`;
      dd.textContent = `${job.företag} (${job.år})`;

      dt.id = `arbete-text-${index}`;
      dd.id = `arbete-text-${index}`;

      arbeteDl.appendChild(dt);
      arbeteDl.appendChild(dd);

      if (index === 0) {
        const span = document.createElement("span");
        span.textContent = "Aktiv";
        dt.appendChild(span);
      }
    });
  }
}

async function getData() {
  const res = await fetch("cvjson.json");
  const data = await res.json();

  return data;
}
