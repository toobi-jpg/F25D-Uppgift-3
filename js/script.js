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

  const utbildningarUl = document.getElementById("Utbildningar-list");
  const arbeteUl = document.getElementById("Arbete-list");

  utbildningarUl.innerHTML = "";
  arbeteUl.innerHTML = "";

  if (cvjson.UTBILDNING) {
    cvjson.UTBILDNING.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.skola} - ${item.program} (${item.år})`;
      utbildningarUl.appendChild(li);
    });
  }

  if (cvjson.ARBETSLIVSERFARENHET) {
    cvjson.ARBETSLIVSERFARENHET.forEach((job) => {
      const li = document.createElement("li");
      li.textContent = `${job.titel} - ${job.företag} (${job.år})`;
      arbeteUl.appendChild(li);
    });
  }
}

async function getData() {
  const res = await fetch("cvjson.json");
  const data = await res.json();

  return data;
}
