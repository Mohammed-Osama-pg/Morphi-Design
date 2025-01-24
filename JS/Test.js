// Translation object for all site text
const translations = {
  en: {
    heading: "Welcome to Morphi Design!",
    subheading: "Transforming your vision into reality.",
    description: "We provide the best design solutions tailored to your needs.",
  },
  ar: {
    heading: "مرحبًا بكم في مورفي ديزاين!",
    subheading: "نحول رؤيتك إلى واقع.",
    description: "نقدم أفضل حلول التصميم التي تناسب احتياجاتك.",
  },
  fr: {
    heading: "Bienvenue chez Morphi Design!",
    subheading: "Transformez votre vision en réalité.",
    description:
      "Nous proposons les meilleures solutions de conception adaptées à vos besoins.",
  },
  es: {
    heading: "¡Bienvenido a Morphi Design!",
    subheading: "Transformamos tu visión en realidad.",
    description:
      "Ofrecemos las mejores soluciones de diseño adaptadas a tus necesidades.",
  },
};

// Languages that require RTL direction
const rtlLanguages = ["ar"];

// Function to set the selected language and update the site
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

// Function to update text content dynamically
function updateSiteText(languageCode) {
  document.querySelectorAll("[data-key]").forEach((element) => {
    const key = element.getAttribute("data-key");
    element.textContent =
      translations[languageCode][key] || translations.en[key];
  });
}

// Function to update site direction (LTR/RTL)
function updateSiteDirection(languageCode) {
  const isRTL = rtlLanguages.includes(languageCode);
  document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
}

// Event listeners for language options
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
