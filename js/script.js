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
const popupContainer = document.getElementById("popup-div");
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

//Svårt att förstå först med fetch och async / await. Denna är inte helt skriven själv utan tagit hjälp av google med mera och skriven under ett par dagar.
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

      dt.style.opacity = "0";
      dd.style.opacity = "0";

      utbildningarDl.appendChild(dt);
      utbildningarDl.appendChild(dd);

      if (index === 0) {
        const span = document.createElement("span");
        span.textContent = "Aktiv";
        dt.appendChild(span);
      }

      setTimeout(() => {
        dt.classList.add("listOpacity");
        dd.classList.add("listOpacity");
      }, (cvjson.UTBILDNING.length - index - 1) * 800);
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

      dt.style.opacity = "0";
      dd.style.opacity = "0";

      arbeteDl.appendChild(dt);
      arbeteDl.appendChild(dd);

      setTimeout(() => {
        dt.classList.add("listOpacity");
        dd.classList.add("listOpacity");
      }, (cvjson.ARBETSLIVSERFARENHET.length - index - 1) * 800);
    });
  }
}

async function getData() {
  const res = await fetch("cvjson.json");
  const data = await res.json();

  return data;
}

const forwardBtn = document.getElementById("arrow-forward");
const backBtn = document.getElementById("arrow-back");
const project = document.querySelectorAll(".project-select");
const dot = document.querySelectorAll(".dot");
let slidecounter = 1; //Kunde börjat från 0 och sedan lagt till localstorage från index sidan och uppdaterad counter efter "readmore" click på det projekt man trycker på.

if (window.location.href.includes("portfolio.html")) {
  activeProject();
  function activeProject() {
    project.forEach((e) => e.classList.remove("showproject"));
    project[slidecounter].classList.add("showproject");
    setTimeout(() => {
      project.forEach((e) => e.classList.remove("opacityApply"));
      project[slidecounter].classList.add("opacityApply");
    }, 200);
    dot.forEach((e) => e.classList.remove("activedot"));
    dot[slidecounter].classList.add("activedot");
  }

  forwardBtn.addEventListener("click", () => {
    slidecounter++;
    if (slidecounter >= project.length) {
      slidecounter = 0;
    }
    activeProject();
  });

  backBtn.addEventListener("click", () => {
    slidecounter--;
    if (slidecounter < 0) {
      slidecounter = project.length - 1;
    }
    activeProject();
  });
}
