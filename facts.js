import { normalize } from "./utils.js";

export async function loadJSON(path) {
  const response = await fetch(path, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Could not load ${path} (${response.status})`);
  return response.json();
}

export function validateLibrary(payload) {
  if (!payload || typeof payload !== "object" || !Array.isArray(payload.facts)) {
    throw new Error("facts.json must contain a top-level 'facts' array.");
  }
  const seen = new Set();
  const errors = [];
  payload.facts.forEach((fact, index) => {
    if (!fact || typeof fact !== "object") errors.push(`Fact ${index + 1} is not an object.`);
    if (!fact.id) errors.push(`Fact ${index + 1} is missing id.`);
    if (fact.id && seen.has(fact.id)) errors.push(`Duplicate fact id: ${fact.id}`);
    if (fact.id) seen.add(fact.id);
    for (const field of ["title", "category", "summary", "explanation"]) {
      if (!fact[field]) errors.push(`Fact ${fact.id || index + 1} is missing ${field}.`);
    }
    if (fact.sources && !Array.isArray(fact.sources)) errors.push(`Fact ${fact.id || index + 1}: sources must be an array.`);
  });
  if (errors.length) throw new Error(errors.join(" "));
  return payload;
}

export function searchFacts(facts, query) {
  const q = normalize(query);
  if (!q) return facts;
  return facts.filter(fact => {
    const haystack = [
      fact.title, fact.category, fact.topic, fact.summary, fact.whySurprising,
      fact.explanation, fact.deepDive, ...(fact.tags || [])
    ].map(normalize).join(" ");
    return haystack.includes(q);
  });
}

export function randomFact(facts, excludeId = "") {
  if (!facts.length) return null;
  const choices = facts.length > 1 ? facts.filter(f => f.id !== excludeId) : facts;
  return choices[Math.floor(Math.random() * choices.length)];
}
