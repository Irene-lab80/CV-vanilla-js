const body = document.body;

const title = document.querySelector("h1");
const searchInput = document.querySelector(
  'input[placeholder="Поиск по навыкам"]',
);
const skills = document.querySelector("#skills");
const nav = document.querySelector("#skills-nav");
const skillItems = Array.from(skills.children);
const filterBtns = Array.from(nav.querySelectorAll(".filter-btn"));
let searchValue = "";
let selectedFilter = "all";

const themeButton = document.querySelector("#theme");

if (themeButton) {
  themeButton.addEventListener("click", () => {
    let theme = document.documentElement.dataset.theme || "dark";

    console.log("themeButton clicked", document.documentElement.dataset.theme);
    if (theme === "dark") {
      theme = "light";
    } else {
      theme = "dark";
    }
    document.documentElement.dataset.theme = theme;
  });
}

const emptyMessage = document.createElement("li");
emptyMessage.textContent = "Ничего не найдено";
emptyMessage.hidden = true;
skills.appendChild(emptyMessage);

const renderSkills = () => {
  filterBtns.forEach((btn) => {
    btn.classList.toggle(
      "filter-btn_active",
      btn.dataset.filter === selectedFilter,
    );
  });

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
  searchValue = e.target.value.trim().toLowerCase();
  renderSkills();
});

renderSkills();
