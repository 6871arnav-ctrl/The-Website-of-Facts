import { loadJSON, validateLibrary } from "./facts.js";
import { attachSearch } from "./search.js";
import { chooseRandom } from "./discover.js";
import { createModal } from "./modal.js";
import { escapeHTML } from "./utils.js";
import { setupKeyboardSearch } from "./navigation.js";

const state = { facts: [], filtered: [], categories: [] };

const els = {
  factCount: document.getElementById("factCount"),
  factGrid: document.getElementById("factGrid"),
  emptyState: document.getElementById("emptyState"),
  categoryGrid: document.getElementById("categoryGrid"),
  searchInput: document.getElementById("searchInput"),
  searchStatus: document.getElementById("searchStatus"),
  dialog: document.getElementById("factDialog"),
  dialogContent: document.getElementById("dialogContent"),
  dialogClose: document.getElementById("dialogClose"),
  toast: document.getElementById("toast")
};

function categoryLabel(id) {
  return state.categories.find(c => c.id === id)?.name || id || "Uncategorized";
}

function renderFacts(facts) {
  state.filtered = facts;
  els.factGrid.innerHTML = "";
  els.emptyState.hidden = facts.length !== 0;
  if (!facts.length) {
    els.searchStatus.textContent = state.facts.length
      ? "No facts match your search."
      : "The library is ready for its first facts.";
    return;
  }
  els.searchStatus.textContent = state.search
    ? `${facts.length} result${facts.length === 1 ? "" : "s"}`
    : `${facts.length} fact${facts.length === 1 ? "" : "s"} in the current library`;

  facts.forEach((fact, index) => {
    const card = document.createElement("article");
    card.className = "fact-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open fact: ${fact.title}`);
    card.innerHTML = `
      <div class="fact-card-top">
        <span class="fact-category">${escapeHTML(categoryLabel(fact.category))}</span>
        <span class="fact-number">#${String(index + 1).padStart(3, "0")}</span>
      </div>
      <h3>${escapeHTML(fact.title)}</h3>
      <p>${escapeHTML(fact.summary)}</p>
      <div class="fact-card-bottom">
        <div class="fact-tags">${(fact.tags || []).slice(0, 2).map(t => `<span class="fact-tag">${escapeHTML(t)}</span>`).join("")}</div>
        <span class="fact-arrow" aria-hidden="true">↗</span>
      </div>`;
    const open = () => openFact(fact);
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
    els.factGrid.appendChild(card);
  });
}

function renderCategories() {
  els.categoryGrid.innerHTML = state.categories.map((category, index) => {
    const count = state.facts.filter(f => f.category === category.id).length;
    return `<a class="category-card" href="#explore" data-category="${escapeHTML(category.id)}">
      <div class="category-index">0${index + 1}</div>
      <h3>${escapeHTML(category.name)}</h3>
      <p>${escapeHTML(category.description)}</p>
      <span class="category-count">${count} fact${count === 1 ? "" : "s"}</span>
    </a>`;
  }).join("");

  els.categoryGrid.querySelectorAll("[data-category]").forEach(card => {
    card.addEventListener("click", () => {
      const category = card.dataset.category;
      els.searchInput.value = "";
      state.search = "";
      renderFacts(state.facts.filter(f => f.category === category));
    });
  });
}

let openFact = () => {};
function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => els.toast.classList.remove("show"), 2200);
}

function surprise() {
  const fact = chooseRandom(state.facts);
  if (!fact) {
    showToast("The library is empty — your first rabbit hole is waiting to be added.");
    document.querySelector("#explore").scrollIntoView({ behavior: "smooth" });
    return;
  }
  openFact(fact);
}

async function init() {
  try {
    const [library, categories] = await Promise.all([
      loadJSON("data/facts.json"),
      loadJSON("data/categories.json")
    ]);
    validateLibrary(library);
    state.facts = library.facts;
    state.categories = categories.categories || [];
    els.factCount.textContent = state.facts.length;
    renderCategories();
    renderFacts(state.facts);
    openFact = createModal(els.dialog, els.dialogContent, els.dialogClose);
    attachSearch(els.searchInput, state.facts, facts => {
      state.search = els.searchInput.value.trim();
      renderFacts(facts);
    });
    setupKeyboardSearch(els.searchInput);
    document.getElementById("randomNav").addEventListener("click", surprise);
    document.getElementById("randomHero").addEventListener("click", surprise);
    document.getElementById("randomExplore").addEventListener("click", surprise);
  } catch (error) {
    console.error(error);
    els.factGrid.innerHTML = "";
    els.emptyState.hidden = false;
    els.emptyState.querySelector("h3").textContent = "TWoF couldn't load its library.";
    els.emptyState.querySelector("p").textContent = "Check that facts.json and categories.json are present and valid.";
  }
}
init();
