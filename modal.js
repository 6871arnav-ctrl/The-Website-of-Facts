import { escapeHTML, safeURL } from "./utils.js";

export function createModal(dialog, content, closeButton) {
  const close = () => dialog.close();
  closeButton.addEventListener("click", close);
  dialog.addEventListener("click", event => {
    if (event.target === dialog) close();
  });
  return fact => {
    content.innerHTML = renderFact(fact);
    dialog.showModal();
  };
}

function renderFact(fact) {
  const sources = (fact.sources || []).map(source => {
    const url = safeURL(source.url);
    return url ? `<li><a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.title || url)}</a></li>` : "";
  }).join("");

  return `<article class="dialog-inner">
    <div class="dialog-category">${escapeHTML(fact.category)}${fact.topic ? ` · ${escapeHTML(fact.topic)}` : ""}</div>
    <h2 id="dialogTitle">${escapeHTML(fact.title)}</h2>
    <p class="dialog-summary">${escapeHTML(fact.summary)}</p>
    ${fact.whySurprising ? `<section class="dialog-block"><h3>Why it's surprising</h3><p>${escapeHTML(fact.whySurprising)}</p></section>` : ""}
    <section class="dialog-block"><h3>The explanation</h3><p>${escapeHTML(fact.explanation)}</p></section>
    ${fact.deepDive ? `<section class="dialog-block"><h3>Go deeper</h3><p>${escapeHTML(fact.deepDive)}</p></section>` : ""}
    ${sources ? `<section class="dialog-block"><h3>Sources</h3><ul class="dialog-source-list">${sources}</ul></section>` : ""}
  </article>`;
}
