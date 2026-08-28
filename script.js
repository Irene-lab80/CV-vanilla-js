const searchInput = document.querySelector("#search-input");
const skills = document.querySelector("#skills");
const nav = document.querySelector("#skills-nav");
const themeButton = document.querySelector("#theme");
const themeButtonIcon = document.querySelector(".theme-btn-icon");

let searchValue = "";
let selectedFilter = "all";

const emptyMessage = document.createElement("li");
emptyMessage.textContent = "Ничего не найдено";
emptyMessage.hidden = true;
skills.appendChild(emptyMessage);

const toggleButtonicon = (theme) => {
  themeButtonIcon.setAttribute(
    "fill",
    theme === "light" ? "#454b73  " : "#fefefe",
  );
};
const initTheme = () => {
  const themeFromLocalStorage = localStorage.getItem("theme");
  if (themeFromLocalStorage) {
    document.documentElement.dataset.theme = themeFromLocalStorage;
    toggleButtonicon(themeFromLocalStorage);
  }
};
initTheme();

const toggleTheme = () => {
  if (document.documentElement.dataset.theme === "light") {
    document.documentElement.dataset.theme = "dark";
  } else {
    document.documentElement.dataset.theme = "light";
  }

  localStorage.setItem("theme", document.documentElement.dataset.theme);
  toggleButtonicon(document.documentElement.dataset.theme);
};

themeButton.addEventListener("click", () => {
  toggleTheme();
});

const renderSkills = () => {
  const filterBtns = Array.from(nav.querySelectorAll(".filter-btn"));

  filterBtns.forEach((btn) => {
    btn.classList.toggle(
      "filter-btn_active",
      btn.dataset.filter === selectedFilter,
    );
  });

  const skillItems = Array.from(skills.children);

  skillItems.forEach((skill) => {
    const skillText = skill.textContent.trim().toLowerCase();
    const matchesSearch = skillText.includes(searchValue);
    const matchesFilter =
      selectedFilter === "all" || skill.dataset.filter === selectedFilter;

    skill.hidden = !matchesSearch || !matchesFilter;
  });

  const noSkillsFound = skillItems.every((skill) => skill.hidden);

  emptyMessage.hidden = !noSkillsFound;
};

nav.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  selectedFilter = e.target.dataset.filter;
  renderSkills();
});

searchInput.addEventListener("input", (e) => {
  const value = e.target.value;
  searchValue = value.trim().toLowerCase();
  renderSkills();
});

renderSkills();
