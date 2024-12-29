"use strict";
/**
 * add event on mutilple elements
 */

const addEventOnElement = function (element, eventType, callback) {
  for (let i = 0, len = element.length; i < len; i++) {
    element[i].addEventListener(eventType, callback);
  }
};

/**
 * Navbar Toggle for mobile
 */
const navbar = document.querySelector("[data-navbar]");
const navbarToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const overlay = document.querySelector("[data-overlay]");
const contectBtn = document.querySelector("[data-contact]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navbarToggleBtn.classList.toggle("active");
  overlay.classList.toggle("active");
  contectBtn.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};
addEventOnElement([navbarToggleBtn, overlay], "click", toggleNavbar);
/**
 * services carousel movement
 */
// ? call elements
let services = Array.from(document.querySelectorAll("[data-service]"));
const servPoints = document.querySelectorAll("[data-index]");
const nextBtn = document.querySelector("#next-serv");
const previousBtn = document.querySelector("#pre-serv");
// create numbers data
let conte = 1;
let length = services.length;
// create auto ul
let ul = document.createElement("ul");
ul.setAttribute("id", "ul-id");
nextBtn.before(ul);
// create li elements
for (let i = 1; i < length + 1; i++) {
  let li = document.createElement("li");
  li.setAttribute("data-index", i);
  li.classList.add("point");
  if (conte === i) {
    li.classList = "point active";
  }
  ul.appendChild(li);
}
let liElement = document.querySelectorAll("#ul-id li");
check();
console.log(liElement);
//Button Event
nextBtn.onclick = next;
previousBtn.onclick = prev;
liElement.forEach((li) => {
  li.addEventListener("click", () => {
    conte = +li.dataset.index;
    check();
  });
});

// Create Function :
function check() {
  services.forEach((serv) => {
    if (serv.className == "active") {
      serv.className = "service-slide";
    } else {
      serv.className = "service-slide active";
    }
  });
  liElement.forEach((li) => {
    li.classList = "point";
    if (li.dataset.index == conte) {
      li.classList = "point active";
    }
  });
  services[conte - 1].classList = "service-slide active";
  btnCheck();
}

function btnCheck() {
  if (conte === length) {
    nextBtn.style.cursor = "not-allowed";
    nextBtn.style.opacity = ".4";
  } else {
    nextBtn.style.cursor = "pointer";
    nextBtn.style.opacity = "1";
  }
  if (conte === 1) {
    previousBtn.style.cursor = "not-allowed";
    previousBtn.style.opacity = ".4";
  } else {
    previousBtn.style.cursor = "pointer";
    previousBtn.style.opacity = "1";
  }
}
function next() {
  if (conte < length) {
    conte++;
  }
  console.log(conte);
  check();
}
function prev() {
  if (1 < conte) {
    conte--;
  }
  console.log(conte);
  check();
}
