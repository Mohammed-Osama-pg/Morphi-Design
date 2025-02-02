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
