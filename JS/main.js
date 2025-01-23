"use strict";

/**
 * Add event on multiple elements
 */
const addEventOnElement = function (elements, eventType, callback) {
  elements.forEach((element) => {
    element.addEventListener(eventType, callback);
  });
};

/**
 * Navbar Toggle for mobile
 */
const navbar = document.querySelector("[data-navbar]");
const navbarToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const overlay = document.querySelector("[data-overlay]");
const contactBtn = document.querySelector("[data-contact]");
const navbarList = document.querySelector(".nav-links");
console.log(contactBtn);
const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navbarToggleBtn.classList.toggle("active");
  overlay.classList.toggle("active");
  contactBtn.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};
addEventOnElement(
  [navbarToggleBtn, overlay, navbarList, contactBtn],
  "click",
  toggleNavbar
);

/**
 * Services carousel movement
 */
const services = Array.from(document.querySelectorAll("[data-service]"));
const carousel = document.querySelector(".carousel");
const nextBtn = document.querySelector("#next-serv");
const previousBtn = document.querySelector("#pre-serv");
const length = services.length;
const imgSilder = document.querySelectorAll(".imge-container img");
let conte = 1;

// Create pagination (ul and li elements)
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

// Set up auto-rotation with an interval
let intervalId = setInterval(() => {
  if (conte >= length) {
    conte = 1;
  } else {
    conte++;
  }
  check();
}, 5000);

//  Stop auto-rotation
function stopAutoRotation() {
  clearInterval(intervalId);
}
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
  const rotation = -(conte - 1) * 90;
  carousel.style.transform = `rotate(${rotation}deg)`;
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

// Attach button event listeners
nextBtn.addEventListener("click", () => {
  next();
  stopAutoRotation();
});
previousBtn.addEventListener("click", () => {
  prev();
  stopAutoRotation();
});

// Initialize the carousel
check();

// Select All filter buttons and filterable card
const filterButtons = document.querySelectorAll(".btn-holder button");
const portfolioImages = document.querySelectorAll(".imgs-holder .port-card");

// Define the filterPortfolio function
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

// Add click Event Listener to each filter button
filterButtons.forEach((button) =>
  button.addEventListener("click", FitlerPortfolio)
);

// !-- The price Table section
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
