import translations from "../JS/translations.js";
("use strict");

// !-- Navbar Toggle for mobile ----------------------------------------

// *Add event on multiple elements
const addEventOnElement = function (elements, eventType, callback) {
  elements.forEach((element) => {
    element.addEventListener(eventType, callback);
  });
};
// *Calls all elements
const navbar = document.querySelector("[data-navbar]");
const navbarToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const overlay = document.querySelector("[data-overlay]");
const contactBtn = document.querySelector("[data-contact]");
const navbarList = document.querySelector(".nav-links");
const toggleNavbar = function () {
  if (window.innerWidth < 800) {
    navbar.classList.toggle("active");
    navbarToggleBtn.classList.toggle("active");
    overlay.classList.toggle("active");
    contactBtn.classList.toggle("active");
    document.body.classList.toggle("nav-active");
  }
};
// *Calls the function
addEventOnElement(
  [navbarToggleBtn, overlay, navbarList, contactBtn],
  "click",
  toggleNavbar
);

// !-- Services carousel movement ----------------------------------------

// *Calls all elements
const services = Array.from(document.querySelectorAll("[data-service]"));
const carousel = document.querySelector(".carousel");
const nextBtn = document.querySelector("#next-serv");
const previousBtn = document.querySelector("#pre-serv");
const length = services.length;
const imgSilder = document.querySelectorAll(".imge-container img");
let conte = 1;

// *Create pagination (ul and li elements)
const ul = document.createElement("ul");
ul.setAttribute("id", "ul-id");
nextBtn.before(ul);
for (let i = 1; i <= length; i++) {
  const li = document.createElement("li");
  li.setAttribute("data-index", i);
  li.classList.add("point");
  if (conte === i) {
    li.classList.add("active");
  }
  ul.appendChild(li);
}
const liElements = document.querySelectorAll("#ul-id li");
liElements.forEach((li) => {
  li.addEventListener("click", () => {
    conte = +li.dataset.index;
    stopAutoRotation();
    check();
  });
});

// *Set up auto-rotation with an interval
let intervalId = setInterval(() => {
  if (conte >= length) {
    conte = 1;
  } else {
    conte++;
  }
  check();
}, 5000);

//  *Stop auto-rotation
function stopAutoRotation() {
  clearInterval(intervalId);
}

// *All the functions
function check() {
  // Update service slides
  services.forEach((service, index) => {
    service.classList.toggle("active", index + 1 === conte);
  });
  // Update imgs slides
  imgSilder.forEach((img, index) => {
    img.classList.toggle("active", index + 1 === conte);
  });

  // Update pagination points
  liElements.forEach((li) => {
    li.classList.toggle("active", +li.dataset.index === conte);
  });

  // Rotate carousel
  rotate();

  // Update button states
  btnCheck();
}
function rotate() {
  if (document.documentElement.getAttribute("lang") === "ar") {
    const rotation = (conte - 1) * 90;
    carousel.style.transform = `rotate(${rotation}deg)`;
  } else {
    const rotation = -(conte - 1) * 90;
    carousel.style.transform = `rotate(${rotation}deg)`;
  }
}
function btnCheck() {
  nextBtn.style.cursor = conte === length ? "not-allowed" : "pointer";
  nextBtn.style.opacity = conte === length ? "0.4" : "1";

  previousBtn.style.cursor = conte === 1 ? "not-allowed" : "pointer";
  previousBtn.style.opacity = conte === 1 ? "0.4" : "1";
}
function next() {
  if (conte < length) {
    conte++;
    check();
  }
}
function prev() {
  if (conte > 1) {
    conte--;
    check();
  }
}

// *Attach button event listeners
nextBtn.addEventListener("click", () => {
  next();
  stopAutoRotation();
});
previousBtn.addEventListener("click", () => {
  prev();
  stopAutoRotation();
});

// *Initialize the carousel
check();

// !-- Portfolio fillter ----------------------------------------

// *Select All fillter buttons and fillterable card
const filterButtons = document.querySelectorAll(".btn-holder button");
const portfolioImages = document.querySelectorAll(".imgs-holder .port-card");

// *Define the filterPortfolio function
const FitlerPortfolio = (e) => {
  document
    .querySelector(".btn-holder .btn-third.active")
    .classList.remove("active");

  e.target.classList.add("active");
  // Iterate over each filterable card
  portfolioImages.forEach((img) => {
    img.classList.add("hiden");
    // check if the img match the selected filter or "all" is selected
    if (
      img.dataset.name === e.target.dataset.name ||
      e.target.dataset.name === "all"
    ) {
      img.classList.remove("hiden");
    }
  });
};

// *Add click Event Listener to each filter button
filterButtons.forEach((button) =>
  button.addEventListener("click", FitlerPortfolio)
);

// !Swepper functions ---------------------------------

const portWrapper = document.querySelector(".wrapper");
const imgsHolderSwepper = document.querySelector(".imgs-holder");
const portArrowBtnSwepper = document.querySelectorAll(".wrapper ion-icon");
let firstCardWidth = imgsHolderSwepper.querySelector(".port-card").offsetWidth;
let isDragging = false,
  startX,
  startScrollleft,
  timeoutId;
portArrowBtnSwepper.forEach((btn) => {
  btn.addEventListener("click", () => {
    imgsHolderSwepper.scrollLeft +=
      btn.id === "left-arrow" ? -firstCardWidth : firstCardWidth;
  });
});
const dragStart = (e) => {
  isDragging = true;
  imgsHolderSwepper.classList.add("dragging");
  // Records the intial cursor and scroll positono of the img_holder
  startX = e.pageX;
  startScrollleft = imgsHolderSwepper.scrollLeft;
};
const dragStop = () => {
  isDragging = false;
  imgsHolderSwepper.classList.remove("dragging");
};
const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return form here
  // update the scrooll position of the carouel based on the cursor movment
  imgsHolderSwepper.scrollLeft = startScrollleft - (e.pageX - startX);
};
imgsHolderSwepper.addEventListener("mousedown", dragStart);
imgsHolderSwepper.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

// !-- The price Table section ----------------------------------
function showPricing(service) {
  document
    .querySelectorAll(".pricing-container")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById(service).classList.add("active");
  document
    .querySelectorAll(".nav-buttons button")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById(service + "-btn").classList.add("active");
}

// !-- Preload functions ----------------------------------
// call all animation element
let preLoade = document.querySelector(".pre-loade");
let allAnimation = document.querySelectorAll(".animation");
// *Create pre-load fuction
window.addEventListener("load", () => {
  preLoade.classList.add("fade-out");
  allAnimation.forEach(function (ele) {
    if (window.innerWidth < 768) {
      const navbar = document.querySelector(".header .navbar");
      const CTA = document.querySelector(".header .cta");
      navbar.classList.remove("animation");
      CTA.classList.remove("animation");
      allAnimation = document.querySelectorAll(".animation");
      ele.style.animationPlayState = "running";
    } else {
      ele.style.animationPlayState = "running";
    }
  });
});

// !-- Language selector ----------------------------------------

// *Languages that require RTL direction
const rtlLanguages = ["ar"];
const portArrowBtn = document.querySelectorAll(".wrapper ion-icon");

// *Function to set the selected language and update the site
function setLanguage(languageCode) {
  // Update displayed current language
  const currentLangBtn = document.getElementById("current-lang");
  const langText = document.querySelector(
    `[data-lang="${languageCode}"]`
  ).textContent;
  currentLangBtn.textContent = langText;

  // Save selected language to localStorage
  localStorage.setItem("selectedLanguage", languageCode);

  // Update text content on the site
  updateSiteText(languageCode);

  // Update site direction
  updateSiteDirection(languageCode);
}

// *Function to update text content dynamically
function updateSiteText(languageCode) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const i18n = element.getAttribute("data-i18n");
    element.textContent =
      translations[languageCode][i18n] || translations.en[i18n];
  });
  //  for Protfolio button
  document
    .querySelectorAll(".portfolio .btn-holder button[data-name]")
    .forEach((ele) => {
      const i18n = ele.getAttribute("data-name");
      ele.textContent =
        translations[languageCode][i18n] || translations.en[i18n];
    });
}

// *Function to update site direction (LTR/RTL)
function updateSiteDirection(languageCode) {
  const isRTL = rtlLanguages.includes(languageCode);
  const socialMediaText = document.querySelector(".contact .info .social");
  const lableText = document.querySelector(".contact .info .lable");
  document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", isRTL ? "ar" : "en");
  document.documentElement.style.setProperty(
    "--heading-font",
    isRTL ? "DINNext" : "bauhaus"
  );
  portArrowBtn.forEach((btn) => {
    btn.classList.remove("flip-rtl");
  });
  if (document.documentElement.getAttribute("lang") === "ar") {
    carousel.classList.add("arabic");
    socialMediaText.classList.add("arabic");
    lableText.classList.add("arabic");
  } else {
    carousel.classList.remove("arabic");
    socialMediaText.classList.remove("arabic");
    lableText.classList.remove("arabic");
  }
  check();
}

// *Event listeners for language options
document.querySelectorAll(".lang-option").forEach((option) => {
  option.addEventListener("click", (event) => {
    const selectedLang = event.target.getAttribute("data-lang");
    setLanguage(selectedLang);
  });
});

// *Set the default or saved language on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("selectedLanguage") || "en"; // Default to English
  setLanguage(savedLanguage);
});

// !-- Scroll Animation ----------------------------------------

// *Select all sections
const allscroallAnimationElements = document.querySelectorAll(
  ".scroallAnimationShowUp"
);

window.onscroll = function () {
  allscroallAnimationElements.forEach((ele) => {
    if (
      window.scrollY >=
      ele.offsetTop + ele.offsetHeight - window.innerHeight
    ) {
      ele.classList.add("active");
    } else {
      ele.classList.remove("active");
    }
  });
};
