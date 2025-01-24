// Function to set the selected language and save it in localStorage
function setLanguage(languageCode) {
  // Update the displayed current language in the button
  const currentLangBtn = document.getElementById("current-lang");
  const langText = document.querySelector(
    `[data-lang="${languageCode}"]`
  ).textContent;
  currentLangBtn.textContent = langText;

  // Save the selected language to localStorage
  localStorage.setItem("selectedLanguage", languageCode);

  // Update page content based on the language
  updatePageLanguage(languageCode);
}

// Function to update the content dynamically (example logic)
function updatePageLanguage(languageCode) {
  const headings = {
    en: "Welcome to Morphi Design!",
    ar: "مرحبًا بكم في مورفي ديزاين!",
    fr: "Bienvenue chez Morphi Design!",
    es: "¡Bienvenido a Morphi Design!",
  };

  // Update the content of an example heading
  const mainHeading = document.querySelector("h1");
  mainHeading.textContent = headings[languageCode] || headings.en;
}

// Event listeners for each language option
document.querySelectorAll(".lang-option").forEach((option) => {
  option.addEventListener("click", (event) => {
    const selectedLang = event.target.getAttribute("data-lang");
    setLanguage(selectedLang);
  });
});

// Set the default or saved language on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedLanguage = localStorage.getItem("selectedLanguage") || "en"; // Default to English
  setLanguage(savedLanguage);
});
