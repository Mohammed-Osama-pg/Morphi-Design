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
