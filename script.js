const body = document.body;
const title = document.querySelector("h1");
const searchInput = document.querySelector(
  'input[placeholder="Поиск по навыкам"]',
);
const skills = document.querySelector("#skills");
const nav = document.querySelector("#skills-nav");
const skillItems = Array.from(skills.children);
const filterBtns = Array.from(nav.children);
let searchValue = "";
let selectedFilter = "all";
const emptyMessage = document.createElement("li");
emptyMessage.textContent = "Ничего не найдено";
emptyMessage.hidden = true;
skills.appendChild(emptyMessage);

const renderSkills = () => {
  skillItems.forEach((skill) => {
    const skillText = skill.textContent.trim().toLowerCase();
    const matchesSearch = skillText.includes(searchValue);
    const matchesFilter =
      selectedFilter === "all" || skill.dataset.filter === selectedFilter;

    skill.hidden = !matchesSearch || !matchesFilter;
  });

  emptyMessage.hidden = skillItems.some((skill) => !skill.hidden);
};

nav.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  selectedFilter = e.target.dataset.filter;
  filterBtns.forEach((btn) => {
    btn.classList.remove("filter-btn_active");
  });
  e.target.classList.add("filter-btn_active");
  renderSkills();
});

searchInput.addEventListener("input", (e) => {
  searchValue = e.target.value.trim().toLowerCase();
  renderSkills();
});

renderSkills();

console.log("body", body);
console.log("title", title);
console.log("searchInput", searchInput);
console.log("skills", skills);
console.log("nav", nav);
console.log("skillItems", skillItems);
